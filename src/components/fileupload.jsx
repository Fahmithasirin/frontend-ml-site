import React, { useState } from "react";
import axios from "axios";

function FileUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);

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
        onUploadSuccess(response.data.filename); // Pass the filename to parent
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("File upload failed.");
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;
