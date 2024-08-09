document.getElementById('fileInput').addEventListener('change', function (event) {
	const files = event.target.files;
	let fileList = '';
	let totalFileSize = 0;

	for (let i = 0; i < files.length; i++) {
		totalFileSize += files[i].size;
		fileList += `<p>${files[i].name} (${(files[i].size / 1024).toFixed(2)} KB)</p>`;
	}

	document.getElementById('selectedFiles').innerHTML = fileList;
	document.getElementById('fileSize').textContent = (totalFileSize / 1000000).toFixed(2) + ' MB';
});

document.getElementById('uploadForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const formData = new FormData();
	const files = document.getElementById('fileInput').files;

	for (let i = 0; i < files.length; i++) {
		formData.append('files', files[i]); // Change 'files[]' to 'files'
	}

	const progressBar = document.querySelector('.progress');
	progressBar.style.width = '0%';

	fetch('/upload', {
		method: 'POST',
		body: formData,
	})
		.then((response) => {
			if (response.ok) {
				progressBar.style.width = '100%';
				alert('Files uploaded successfully!');
			} else {
				throw new Error('Error uploading files. Please try again.');
			}
		})
		.catch((error) => {
			alert(error.message);
		});
});
