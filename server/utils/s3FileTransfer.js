// Import AWS SDK and the S3 config
// import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({region: 'ap-southeast-2'});

dotenv.config(); // Load variables from .env


export const uploadFileToS3 = async (fileName, fileContent, mimeType) => {

    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `uploads/${fileName}`,
        Body: fileContent,
        ContentType: mimeType,
        ServerSideEncryption: 'AES256',
    }

      try {
        const command = new PutObjectCommand(s3Params);
        const result = await s3.send(command); // send the command using the `send` method
        console.log('File uploaded successfully:', result);

        const url = `uploads/${fileName}`

        return url;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
}

export const downloadFileFromS3 = async (fileName) => {

    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
    }

      try {
        const command = new GetObjectCommand(s3Params);
        const data = await s3.send(command); // send the command using the `send` method
        console.log('File uploaded successfully:', data);
        return data;
      } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
      }
}

export const deleteFileFromS3 = async (fileName) => {
  const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName, // The file you want to delete
  }

  try {
      const command = new DeleteObjectCommand(s3Params);  // Create the command to delete the object
      const result = await s3.send(command);  // Send the command using the `send` method
      console.log('File deleted successfully:', result);  // You can log the result for confirmation
      return result;  // Return the result (if needed)
  } catch (error) {
      console.error('Error deleting file:', error);  // Handle errors
      throw error;
  }
}

