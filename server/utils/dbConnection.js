import mysql from "mysql";
import { Client } from "ssh2";
import { sshConfig } from "../config/sshConfig.js";
import { dbConfig } from "../config/dbConfig.js";

export async function connectToDatabase() {
  const sshClient = new Client();

  const sshTunnelConfig = {
    srcHost: "127.0.0.1", // Localhost
    srcPort: 3306, // MySQL default port
    dstHost: dbConfig.host, // RDS endpoint
    dstPort: 3306, // RDS MySQL port
  };

  return new Promise((resolve, reject) => {
    sshClient
      .on("ready", () => {
        sshClient.forwardOut(
          sshTunnelConfig.srcHost,
          sshTunnelConfig.srcPort,
          sshTunnelConfig.dstHost,
          sshTunnelConfig.dstPort,
          (err, stream) => {
            if (err) {
              sshClient.end();
              reject(new Error("SSH Tunnel creation failed"));
            }

            // Use connection pool without calling `.connect()`
            const pool = mysql.createPool({
              ...dbConfig,
              stream,
              connectionLimit: 10,
              connectTimeout: 20000, // Set to a higher value
              acquireTimeout: 20000, // Set to a higher value
            });

            console.log("Connected to RDS through SSH tunnel");
            resolve({ pool, sshClient });
          }
        );
      })
      .connect(sshConfig);
  });
}
