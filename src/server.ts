import express, { Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { networkInterfaces } from 'os';

// Import the requestMiddleware (assuming it's also converted to TypeScript)
import requestMiddleware from './requestMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIRECTORY = process.env.UPLOAD_DIRECTORY || 'uploads';
const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 1024 * 1024 * 50; // 50MB default

const indexPath = path.join(__dirname, 'static', 'index.html');

// Ensure upload directory exists
try {
	fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true });
	console.log(`Using upload directory: ${UPLOAD_DIRECTORY}`);
} catch (error) {
	console.error('Error creating upload directory:', (error as Error).message);
	process.exit(1);
}

// Configure multer storage
const storage: StorageEngine = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
		console.log('Destination called for file:', file.originalname);
		cb(null, UPLOAD_DIRECTORY);
	},
	filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
		console.log('Filename called for file:', file.originalname);
		const uniquePrefix = uuidv4();
		cb(null, `${uniquePrefix}-${file.originalname}`);
	},
});
const uploadDir = path.join(__dirname, 'uploads');

const upload = multer({
	storage: storage,
	limits: {
		fileSize: Number(MAX_FILE_SIZE),
	},
}).array('files');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('static'));

app.get('/', requestMiddleware, (req: Request, res: Response) => {
	res.sendFile(indexPath);
});

app.post('/upload', requestMiddleware, (req: Request, res: Response) => {
	// Ensure the uploads directory exists before processing the request
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}

	upload(req, res, (err: any) => {
		if (err instanceof multer.MulterError) {
			console.error('Multer error:', err);
			return res.status(400).json({ error: 'File upload error', details: err.message });
		} else if (err) {
			console.error('Unknown error:', err);
			return res.status(500).json({ error: 'Unknown error', details: err.message });
		}

		if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
			return res.status(400).json({ error: 'No files were uploaded.' });
		}

		const uploadedFiles = (req.files as Express.Multer.File[]).map((file) => ({
			originalname: file.originalname,
			filename: file.filename,
			size: file.size,
		}));

		res.json({ message: 'Files uploaded successfully', files: uploadedFiles });
	});
});

// Get list of uploaded files
app.get('/files', requestMiddleware, (req: Request, res: Response) => {
	fs.readdir(UPLOAD_DIRECTORY, (err, files) => {
		if (err) {
			return res.status(500).send('Error reading upload directory');
		}
		res.json(files);
	});
});

// Delete a file
app.delete('/files/:filename', requestMiddleware, (req: Request, res: Response) => {
	const filename = req.params.filename;
	const filepath = path.join(UPLOAD_DIRECTORY, filename);

	fs.unlink(filepath, (err) => {
		if (err) {
			return res.status(500).send('Error deleting file');
		}
		res.send('File deleted successfully');
	});
});

// Get server IP addresses
function getServerAddresses(): string[] {
	const interfaces = networkInterfaces();
	const addresses: string[] = [];

	Object.values(interfaces).forEach((iface) => {
		iface?.forEach((details) => {
			if (details.family === 'IPv4' && !details.internal) {
				addresses.push(details.address);
			}
		});
	});

	return addresses;
}

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log('Server is accessible at:');
	getServerAddresses().forEach((address) => {
		console.log(`http://${address}:${PORT}`);
	});
});
