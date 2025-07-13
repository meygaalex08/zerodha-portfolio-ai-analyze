import {
  Box, Paper, Typography, Button, CircularProgress
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFileOutlined';

export default function UploadSection({ uploading, handleFileUpload }) {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          px: 6,
          py: 7,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 370,
          maxWidth: 420,
          background: "#fff",
        }}
      >
        <UploadFileIcon sx={{ fontSize: 56, mb: 2, color: "#5a189a" }} />
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Upload Your Portfolio File
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
          Drag and drop or browse to select your Zerodha portfolio <b>CSV or Excel file</b>.<br />
          Instantly view a dashboard and get AI investment insights!
        </Typography>
        {uploading ? (
          <CircularProgress sx={{ mt: 2, mb: 2 }} />
        ) : (
          <label htmlFor="upload-portfolio">
            <input
              accept=".csv,.xlsx"
              style={{ display: "none" }}
              id="upload-portfolio"
              type="file"
              onChange={handleFileUpload}
            />
            <Button
              variant="contained"
              size="large"
              component="span"
              startIcon={<UploadFileIcon />}
              sx={{ bgcolor: "#5a189a" }}
            >
              Upload File
            </Button>
          </label>
        )}
      </Paper>
    </Box>
  );
}
