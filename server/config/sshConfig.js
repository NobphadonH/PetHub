import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

export const sshConfig = {
  host: process.env.EC2_DB_PRIVATE_IP,
  port: 22,
  username: 'ec2-user',
  privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH)
};