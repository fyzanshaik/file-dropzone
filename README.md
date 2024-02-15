# 🚀 File-Dropzone: Simple File Upload Web Application

Welcome to File-Dropzone, a straightforward and efficient file upload web application built with Node.js and Express! This application allows you to upload files effortlessly and manage them on your server. Whether you're a developer, student, or professional, you'll find File-Dropzone to be a handy tool for managing your files. 📁

## Features

- **📁 Upload Files**: Easily upload multiple files at once.
- **📋 File Management**: Manage uploaded files on your server.
- **🔒 Secure**: Ensure the security of your files with a server-side storage approach.
- **🌐 Cross-Platform**: Access the upload functionality from any device with a web browser.

## Getting Started

To get started with File-Dropzone, follow these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/file-dropzone.git
```
2. Navigate to the project directory:
```
cd file-dropzone
```
3. Install dependencies:
```
npm install
```
4. Create a `.env` file in the root directory or use the existing file present in your project. Add the following variables:
```
PORT=3000
UPLOAD_DIRECTORY=/path/to/your/upload/directory
```
Replace `/path/to/your/upload/directory` with the directory path where you want to store uploaded files.
Eg : UPLOAD_DIRECTORY="/home/fyzanshaik/Documents/MyUploads" (Make sure it's inside double quotes)

6. Start the server:
```
npm start
```
6. Open your web browser and go to http://localhost:3000 to access the application.

## Usage

### Uploading Files

1. Click on the "Choose Files" button.
2. Select one or multiple files from your device.
3. Click on the "Upload" button to upload the selected files.

### Managing Files

- Uploaded files will be stored in the specified directory on your server.
- You can further manage these files directly on your server as per your requirements.

## Accessing from Any Device

To access File-Dropzone from any device on the same network:

1. Ensure that your device is connected to the same network as the server running File-Dropzone.
2. Find your IP address by running `ifconfig` on Linux or `ipconfig` on Windows.
3. Note down the IP address associated with your Wi-Fi connection.
4. In your web browser, navigate to `https://your-ip-address:3000/` (replace `your-ip-address` with the IP address you noted earlier).
   eg : https://192.168.0.1:3000/
6. You should now be able to access File-Dropzone from any device on the same network.
## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

Feel free to explore the features of File-Dropzone and customize it according to your needs. Happy file uploading! 🚀
