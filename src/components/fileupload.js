import React, { useState } from "react";
import axios from "axios";

function FileUpload({ onUploadSuccess, onCancelSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://127.0.0.1:5000/upload", formData)
      .then((response) => {
        console.log("Upload successful:", response.data);
        alert(response.data.message);
        setUploadedFilename(response.data.filename);
        onUploadSuccess(response.data.filename); // Pass the filename to parent
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("File upload failed.");
      });
  };

  const handleCancel = () => {
    if (!uploadedFilename) {
      alert("No file to cancel.");
      return;
    }

    axios
      .delete(`http://127.0.0.1:5000/cancel/${uploadedFilename}`)
      .then((response) => {
        console.log("File deletion successful:", response.data);
        alert(response.data.message);
        setUploadedFilename(null);
        setSelectedFile(null); // Reset the selected file
        onCancelSuccess(); // Notify parent of cancellation

        // Reset the file input element
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = "";
        }
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        alert("File deletion failed.");
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      <button onClick={handleCancel} disabled={!uploadedFilename}>Cancel</button>
    </div>
  );
}

export default FileUpload;
