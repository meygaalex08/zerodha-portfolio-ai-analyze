import { Box, CircularProgress, Drawer, Paper, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIInsightsDrawer({ open, onClose, loading, insights }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 470, p: 3, bgcolor: "#faf6ff", borderTopLeftRadius: 16, borderBottomLeftRadius: 16 },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#5a189a", fontWeight: 700 }}>
          Portfolio AI Insights
        </Typography>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {!loading && insights && (
          <Paper elevation={2} sx={{ p: 3, bgcolor: "#f4f0fa", maxHeight: 650, overflow: "auto" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {insights}
            </ReactMarkdown>
          </Paper>
        )}
        {!loading && !insights && (
          <Typography color="text.secondary">
            Click "Get AI Insights" to see portfolio analysis here.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
