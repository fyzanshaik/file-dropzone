# 🚀 File-Dropzone: Simple File Upload Web Application

Welcome to File-Dropzone, a straightforward and efficient file upload web application built with Node.js and Express! This application allows you to upload files effortlessly and manage them on your server. Whether you're a developer, student, or professional, you'll find File-Dropzone to be a handy tool for managing your files. 📁

## Features

- **📁 Upload Files**: Easily upload multiple files at once.
- **📋 File Management**: Manage uploaded files on your server.
- **🔒 Secure**: Ensure the security of your files with a server-side storage approach.
- **🌐 Cross-Platform**: Access the upload functionality from any device with a web browser.

## Installing Node.js
Windows:
1. Open a web browser and go to the official Node.js website: Node.js Downloads.
2. Download the Windows Installer (.msi) package corresponding to your system 
   architecture (32-bit or 64-bit).
3. Once the download is complete, double-click on the downloaded file to start the 
   installation process.
4. Follow the on-screen instructions in the installation wizard. You can leave the       
    default options selected in most cases.
5. After the installation is complete, open Command Prompt (CMD) or PowerShell and type 
   the following command to verify that Node.js and npm (Node Package Manager) are 
   installed:
```
node -v
npm -v
```
If Node.js and npm are installed correctly, you will see their respective versions printed in the terminal.

Linux (Ubuntu/Debian):
1. Open a terminal window.
2. Update the package index and install the required dependencies by running the following commands:
```
sudo apt update
sudo apt install curl
```
3. Use curl to download the Node.js installation script:
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```
4. Install Node.js and npm by running:
```
sudo apt install -y nodejs
```
5. After the installation is complete, verify that Node.js and npm are installed by typing the following commands in the terminal:
```
node -v
npm -v
```
If Node.js and npm are installed correctly, you will see their respective versions printed in the terminal.

## Getting Started

To get started with File-Dropzone, follow these steps:

### Prerequisites

Ensure that you have Node.js and npm installed on your machine. You can download Node.js from [here](https://nodejs.org/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/file-dropzone.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd file-dropzone
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory, or use the existing file present in your project. Add the following variables:
   ```bash
   PORT=3000
   UPLOAD_DIRECTORY="/path/to/your/upload/directory"
   ```
   Replace `/path/to/your/upload/directory` with the directory path where you want to store uploaded files. For example:
   ```bash
   UPLOAD_DIRECTORY="/home/fyzanshaik/Documents/MyUploads"
   ```
   Ensure the path is enclosed in double quotes.

5. **Start the server:**
   ```bash
   npm start
   ```

6. **Access the application:**

   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

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
4. In your web browser, navigate to `http://your-ip-address:3000/` (replace `your-ip-address` with the IP address you noted earlier).
   ```bash
   e.g., http://192.168.0.1:3000/
   ```
5. You should now be able to access File-Dropzone from any device on the same network.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

Feel free to explore the features of File-Dropzone and customize it according to your needs. Happy file uploading! 🚀

---
