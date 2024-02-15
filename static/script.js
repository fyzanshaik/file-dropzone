document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    var files = event.target.files;

    let totalFileSize = 0;
    for (var i = 0; i < files.length; i++) {
      totalFileSize += files[i].size;
    }
    console.log("Total file size: " + totalFileSize + " bytes");

    const totalFileSizeMB = totalFileSize * (1 / 1000000);
    if (totalFileSizeMB < 1) {
      let totalFileSizeKB = totalFileSize * (1 / 1000);
      document.getElementById("fileSize").innerHTML = totalFileSizeKB + " KB";
    } else {
      document.getElementById("fileSize").innerHTML = totalFileSizeMB + " MB";
    }
  });

document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData();
    var files = document.getElementById("fileInput").files;
    console.log(files);
    let totalFileSize = 0;
    for (var i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
      totalFileSize += files[i].size;
    }

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Files uploaded successfully!");
        } else {
          throw new Error("Error uploading files. Please try again.");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });
