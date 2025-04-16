// DOM Elements
const fileInput = document.getElementById('fileInput');
const selectedFilesContainer = document.getElementById('selectedFiles');
const fileSizeElement = document.getElementById('fileSize');
const uploadForm = document.getElementById('uploadForm');
const progressBar = document.querySelector('.progress');
const dropzone = document.getElementById('dropzone');
const toast = document.getElementById('toast');

// File input change handler
fileInput.addEventListener('change', function (event) {
	const files = event.target.files;
	let fileList = '';
	let totalFileSize = 0;

	for (let i = 0; i < files.length; i++) {
		totalFileSize += files[i].size;
		fileList += `<p>${files[i].name} <span>${formatFileSize(files[i].size)}</span></p>`;
	}

	selectedFilesContainer.innerHTML = fileList;
	fileSizeElement.textContent = formatFileSize(totalFileSize);
});

// Format file size to human-readable format
function formatFileSize(bytes) {
	if (bytes < 1024) {
		return bytes + ' B';
	} else if (bytes < 1024 * 1024) {
		return (bytes / 1024).toFixed(2) + ' KB';
	} else if (bytes < 1024 * 1024 * 1024) {
		return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
	} else {
		return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
	}
}

// Form submission
uploadForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const formData = new FormData();
	const files = document.getElementById('fileInput').files;

	if (files.length === 0) {
		alert('Please select at least one file to upload.');
		return;
	}

	for (let i = 0; i < files.length; i++) {
		formData.append('files', files[i]);
	}

	progressBar.style.width = '0%';

	// Animate progress bar during upload
	let width = 0;
	const interval = setInterval(() => {
		if (width >= 70) {
			clearInterval(interval);
		} else {
			width += Math.random() * 5;
			progressBar.style.width = width + '%';
		}
	}, 100);

	fetch('/upload', {
		method: 'POST',
		body: formData,
	})
		.then((response) => {
			if (response.ok) {
				// Complete the progress bar animation
				progressBar.style.width = '100%';

				// Show success toast
				toast.classList.add('show');
				setTimeout(() => {
					toast.classList.remove('show');
				}, 3000);

				// Reset form after a delay
				setTimeout(() => {
					selectedFilesContainer.innerHTML = '';
					fileSizeElement.textContent = '0 MB';
					fileInput.value = '';
					progressBar.style.width = '0%';
				}, 2000);
			} else {
				throw new Error('Error uploading files. Please try again.');
			}
		})
		.catch((error) => {
			clearInterval(interval);
			progressBar.style.width = '0%';
			alert(error.message);
		});
});

// Drag and drop functionality
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
	dropzone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
}

['dragenter', 'dragover'].forEach((eventName) => {
	dropzone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach((eventName) => {
	dropzone.addEventListener(eventName, unhighlight, false);
});

function highlight() {
	dropzone.classList.add('active');
}

function unhighlight() {
	dropzone.classList.remove('active');
}

dropzone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
	const dt = e.dataTransfer;
	const files = dt.files;
	fileInput.files = files;

	// Trigger the change event
	const event = new Event('change');
	fileInput.dispatchEvent(event);
}
