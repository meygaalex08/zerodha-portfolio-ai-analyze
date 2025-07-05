import { useState } from "react";
import * as XLSX from "xlsx";
import {
  AppBar, Toolbar, Typography, Button, Box, Paper, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Drawer, CircularProgress, Avatar
} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFileOutlined';
import InsightsIcon from '@mui/icons-material/AutoGraphRounded';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUpOutlined';
import AssessmentIcon from '@mui/icons-material/AssessmentOutlined';
import PercentIcon from '@mui/icons-material/PercentOutlined';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ---------- Helpers ----------
function formatINR(number) {
  return number?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }) ?? "-";
}
function calculateSummary(headers, rows) {
  const investedIdx = headers.findIndex(h => /Invested/i.test(h));
  const curValIdx = headers.findIndex(h => /Cur\.? ?val/i.test(h));
  const pnlIdx = headers.findIndex(h => /P&L/i.test(h));
  let totalInvested = 0, totalCurVal = 0, totalPnl = 0;
  rows.forEach(row => {
    totalInvested += Number(row[investedIdx]) || 0;
    totalCurVal  += Number(row[curValIdx]) || 0;
    totalPnl     += Number(row[pnlIdx]) || 0;
  });
  const totalReturn = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  return { totalInvested, totalCurVal, totalPnl, totalReturn };
}

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
    setUploading(true); // show loader
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
      setUploading(false); // hide loader
    };
    reader.readAsBinaryString(file);
  };

  function handleReupload() {
    setHeaders([]);
    setRows([]);
    setFileName("");
    setInsights("");
    setDrawerOpen(false);
    setUploading(false);
  }

  async function getAIInsights() {
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
  }

  const { totalInvested, totalCurVal, totalPnl, totalReturn } = calculateSummary(headers, rows);

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <AppBar position="static" elevation={1} sx={{ bgcolor: "#5a189a" }}>
        <Toolbar>
          <InsightsIcon sx={{ mr: 1, color: "#fff" }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Zerodha Portfolio AI
          </Typography>
        </Toolbar>
      </AppBar>

      {(!fileName || uploading) ? (
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
      ) : (
        // Main Dashboard Section after upload
        <Box sx={{ maxWidth: 1100, mx: "auto", pt: 5, px: 2 }}>
          <Typography sx={{ mb: 2, color: "text.secondary" }}>
            <strong>Loaded file:</strong> {fileName}
            <Button onClick={handleReupload} sx={{ ml: 2 }} color="secondary" size="small">
              Upload Different File
            </Button>
          </Typography>

          {/* Dashboard */}
          <Paper elevation={3} sx={{
            p: 3, borderRadius: 5, mb: 5,
            background: "linear-gradient(110deg, #f6f8fa 70%, #ebeafd 100%)"
          }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: "#2b213a", letterSpacing: "0.5px" }}>
              Portfolio Analysis Dashboard
            </Typography>
            <Grid container spacing={4}>
              {/* Total Investment */}
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "linear-gradient(90deg,#f1f5fc 0,#e9e7fa 100%)",
                    boxShadow: "0 2px 16px 0 #e0e0f4b0",
                    textAlign: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: "#e0e7ff", color: "#3439b5", mx: "auto", mb: 1 }}>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                  <Typography fontWeight={500} sx={{ color: "#3439b5", mb: 1 }}>
                    Total Investment
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#262846", letterSpacing: "0.5px" }}>
                    {formatINR(totalInvested)}
                  </Typography>
                </Paper>
              </Grid>
              {/* Current Value */}
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #f5eefa 0,#e6eeff 100%)",
                    boxShadow: "0 2px 16px 0 #e0e0f480",
                    textAlign: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: "#e0f2fe", color: "#0277bd", mx: "auto", mb: 1 }}>
                    <TrendingUpIcon />
                  </Avatar>
                  <Typography fontWeight={500} sx={{ color: "#0277bd", mb: 1 }}>
                    Current Value
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#1a3a5a", letterSpacing: "0.5px" }}>
                    {formatINR(totalCurVal)}
                  </Typography>
                </Paper>
              </Grid>
              {/* Total P&L */}
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #fcf6e6 0,#fdebe7 100%)",
                    boxShadow: "0 2px 16px 0 #e0e0f460",
                    textAlign: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: "#ffe0e0", color: "#d32f2f", mx: "auto", mb: 1 }}>
                    <AssessmentIcon />
                  </Avatar>
                  <Typography fontWeight={500} sx={{ color: "#d32f2f", mb: 1 }}>
                    Total P&amp;L
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      color: totalPnl > 0 ? "#229e5b" : "#d32f2f",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {formatINR(totalPnl)}
                  </Typography>
                </Paper>
              </Grid>
              {/* Total Return */}
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "linear-gradient(90deg,#e4fff2 0,#eafaf6 100%)",
                    boxShadow: "0 2px 16px 0 #e0f4e0c0",
                    textAlign: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: "#e0faef", color: "#20c997", mx: "auto", mb: 1 }}>
                    <PercentIcon />
                  </Avatar>
                  <Typography fontWeight={500} sx={{ color: "#20c997", mb: 1 }}>
                    Total Return
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#189a61", letterSpacing: "0.5px" }}>
                    {totalReturn.toFixed(2)}%
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Table */}
          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3, overflow: "hidden" }}>
            <TableContainer>
              <Table size="small" sx={{ bgcolor: "#fff" }}>
                <TableHead sx={{ bgcolor: "#f7f9fc" }}>
                  <TableRow>
                    {headers.map((header, idx) => (
                      <TableCell key={idx} sx={{ fontWeight: 700 }}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i} hover sx={{ bgcolor: i % 2 ? "#f5f8fc" : "#fff" }}>
                      {row.map((cell, j) => (
                        <TableCell key={j}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {/* AI Insights Button */}
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
              {loading ? <><CircularProgress size={22} sx={{ mr: 1 }} />Generating Insights...</> : "Get AI Insights"}
            </Button>
          </Box>
          {/* AI Drawer */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
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
        </Box>
      )}
    </Box>
  );
}
