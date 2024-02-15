const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const requestMiddleware = require("./requestMiddleware");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIRECTORY = process.env.UPLOAD_DIRECTORY || "uploads";

const indexPath = path.join(__dirname, "static", "index.html");

try {
  if (!fs.existsSync(UPLOAD_DIRECTORY)) {
    fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true });
    console.log(`Created upload directory: ${UPLOAD_DIRECTORY}`);
  } else {
    console.log(`Using existing upload directory: ${UPLOAD_DIRECTORY}`);
  }
} catch (error) {
  console.error("Error creating upload directory:", error.message);
}

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIRECTORY);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: myStorage });

app.use(express.json());

app.get("/", requestMiddleware, (req, res) => {
  res.sendFile(indexPath);
});

app.post("/upload", requestMiddleware, upload.array("files[]"), (req, res) => {
  res.send("File uploaded successfully");
});

app.use(express.static("static"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} Crtl+click here`);
});
