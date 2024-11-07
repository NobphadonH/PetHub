// Import AWS SDK and the S3 config
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

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
        const result = await s3.upload(s3Params).promise();
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
        const data = await s3.getObject(s3Params).promise();
        console.log('File uploaded successfully:', result.Location);
        return data;
      } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
      }
}



