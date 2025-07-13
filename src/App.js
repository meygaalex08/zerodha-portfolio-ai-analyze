import { useState } from "react";
import * as XLSX from "xlsx";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import InsightsIcon from '@mui/icons-material/AutoGraphRounded';

import Header from "./Header";
import UploadSection from "./UploadSection";
import Dashboard from "./Dashboard";
import PortfolioTable from "./PortfolioTable";
import AIInsightsDrawer from "./AIInsightsDrawer";

import { calculateSummary, formatINR } from "./utils/portfolioHelpers";


export default function App() {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setInsights("");
    setDrawerOpen(false);
    setUploading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (data.length > 1) {
        setHeaders(data[0]);
        setRows(data.slice(1));
      }
      setUploading(false);
    };
    reader.readAsBinaryString(file);
  };

  const handleReupload = () => {
    setHeaders([]);
    setRows([]);
    setFileName("");
    setInsights("");
    setDrawerOpen(false);
    setUploading(false);
  };

  const getAIInsights = async () => {
    setLoading(true);
    setInsights("");
    setDrawerOpen(true);
    try {
      const response = await fetch("http://localhost:5050/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headers, rows }),
      });
      const data = await response.json();
      setInsights(data.insights);
    } catch (err) {
      setInsights("AI Error: " + err.message);
    }
    setLoading(false);
  };

  const { totalInvested, totalCurVal, totalPnl, totalReturn } = calculateSummary(headers, rows);

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <Header />

      {!fileName || uploading ? (
        <UploadSection uploading={uploading} handleFileUpload={handleFileUpload} />
      ) : (
        <Box sx={{ maxWidth: 1100, mx: "auto", pt: 5, px: 2 }}>
          <Typography sx={{ mb: 2, color: "text.secondary" }}>
            <strong>Loaded file:</strong> {fileName}
            <Button onClick={handleReupload} sx={{ ml: 2 }} color="secondary" size="small">
              Upload Different File
            </Button>
          </Typography>

          <Dashboard
            invested={totalInvested}
            curVal={totalCurVal}
            pnl={totalPnl}
            returnPct={totalReturn}
            formatINR={formatINR}
          />

          <PortfolioTable headers={headers} rows={rows} />

          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ bgcolor: "#9d4edd" }}
              endIcon={<InsightsIcon />}
              onClick={getAIInsights}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={22} sx={{ mr: 1 }} />Generating Insights...
                </>
              ) : (
                "Get AI Insights"
              )}
            </Button>
          </Box>

          <AIInsightsDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            loading={loading}
            insights={insights}
          />
        </Box>
      )}
    </Box>
  );
}
