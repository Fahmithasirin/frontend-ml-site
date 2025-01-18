import React, { useState } from "react";
import FileUpload from "./fileupload";
import DataPreview from "./datapreview";
import { useNavigate } from "react-router-dom";
import "./previewpage.css";

function PreviewPage() {
  const [filename, setFilename] = useState(null);
  const navigate = useNavigate();

  const handleUploadSuccess = (filename) => {
    setFilename(filename);
  };

  const handleCancelSuccess = () => {
    setFilename(null);
  };

  const handleCleanData = () => {
    if (filename) {
      navigate(`/cleaning/${filename}`);
    }
  };

  return (
    <div className="preview-page" style={{ background: "url('/assets/previewpage/bg1.png') no-repeat right ", backgroundSize: "contain", backgroundColor: "#03001B"  }} >
      <div className="preview-header" style={{ background: "url('/assets/previewpage/bg2.png') no-repeat center ", backgroundSize: "30% 110%", marginTop: "5px" }} >
      <img src="/assets/homepage/Logo.png" alt="AlgoStudio Logo" className="logo" />
        PREVIEW THE DATA
      </div>
      <div className="preview-content">
        <div className="left-box">
          {filename ? (
            <DataPreview filename={filename} />
          ) : (<>
            <div className="empty-message" >
              Please upload a file to preview the data.
              <img src="/assets/previewpage/empty.png" alt="Empty" backgroundSize="contain" width="50%" height="50%"  />
            </div>
            </>
          )}
        </div>
        <div className="right-box" >
          <FileUpload onUploadSuccess={handleUploadSuccess} onCancelSuccess={handleCancelSuccess} />
          {filename && (
            <button className="clean-data-button" onClick={handleCleanData}>
              Clean Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
