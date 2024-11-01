import mysql from 'mysql';
import { Client } from 'ssh2';
import { sshConfig } from '../config/sshConfig.js';
import { dbConfig } from '../config/dbConfig.js';

export async function connectToDatabase() {
    const sshClient = new Client();
  
    const sshTunnelConfig = {
      srcHost: '127.0.0.1',  // Localhost
      srcPort: 3306,         // MySQL default port
      dstHost: dbConfig.host, // RDS endpoint
      dstPort: 3306          // RDS MySQL port
    };
  
    return new Promise((resolve, reject) => {
      sshClient.on('ready', () => {
        sshClient.forwardOut(
          sshTunnelConfig.srcHost,
          sshTunnelConfig.srcPort,
          sshTunnelConfig.dstHost,
          sshTunnelConfig.dstPort,
          (err, stream) => {
            if (err) {
              sshClient.end();
              reject(new Error('SSH Tunnel creation failed'));
            }
  
            const connection = mysql.createConnection({
              ...dbConfig,
              stream
            });
  
            connection.connect(error => {
              if (error) {
                reject(error);
              } else {
                console.log('Connected to RDS through SSH tunnel');
                resolve({ connection, sshClient });
              }
            });
          }
        );
      }).connect(sshConfig);
    });
  }