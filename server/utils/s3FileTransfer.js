// Import AWS SDK and the S3 config
// import AWS from 'aws-sdk';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
const s3 = new S3Client({region: 'ap-southeast-2'});

const s3Params = {
    Bucket: 'YOUR_BUCKET_NAME',
    ContentType: 'image/jpeg', // or any default type you prefer
    ServerSideEncryption: 'AES256',
}

export const uploadFileToS3 = async (fileName, fileContent, mimeType) => {

    const s3Params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: `uploads/${fileName}`,
        Body: fileContent,
        ContentType: mimeType,
        ServerSideEncryption: 'AES256',
    }

      try {
        const command = new PutObjectCommand(s3Params);
        const result = await s3.send(command); // send the command using the `send` method
        console.log('File uploaded successfully:', result.Location);
        return result.Location.substring(result.Location.indexOf('uploads/'));
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
}

export const downloadFileFromS3 = async (fileName) => {

    const s3Params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: fileName,
    }

      try {
        const command = new GetObjectCommand(s3Params);
        const data = await s3.send(command); // send the command using the `send` method
        console.log('File uploaded successfully:', result.Location);
        return data;
      } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
      }
}



