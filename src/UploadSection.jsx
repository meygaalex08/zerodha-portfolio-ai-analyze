export default function UploadSection({ uploading, handleFileUpload }) {
  return (
    <div className="upload-section">
      <div className="upload-card">
        <div className="upload-icon">📂</div>
        <h2 className="upload-title">Upload Your Portfolio File</h2>
        <p className="upload-text">
          Drag and drop or browse to select your Zerodha portfolio <b>CSV or Excel file</b>.
          <br />
        </p>

        {uploading ? (
          <div className="upload-spinner">Loading...</div>
        ) : (
          <label className="upload-btn">
            <input
              accept=".csv,.xlsx"
              id="upload-portfolio"
              type="file"
              onChange={handleFileUpload}
              hidden
            />
            Upload File
          </label>
        )}
      </div>
    </div>
  );
}
