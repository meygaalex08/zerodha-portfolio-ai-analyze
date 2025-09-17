import { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

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

  const { totalInvested, totalCurVal, totalPnl, totalReturn } =
    calculateSummary(headers, rows);

  return (
    <div className="app">
      <Header />

      {!fileName || uploading ? (
        <UploadSection uploading={uploading} handleFileUpload={handleFileUpload} />
      ) : (
        <div className="container">
          <p className="file-info">
            <strong>Loaded file:</strong> {fileName}
            <button className="btn secondary small" onClick={handleReupload}>
              Upload Different File
            </button>
          </p>

          <Dashboard
            invested={totalInvested}
            curVal={totalCurVal}
            pnl={totalPnl}
            returnPct={totalReturn}
            formatINR={formatINR}
          />

          <PortfolioTable headers={headers} rows={rows} />

          <div className="actions">
            <button
              className={`btn primary large ${loading ? "loading" : ""}`}
              onClick={getAIInsights}
              disabled={loading}
            >
              {loading ? "Generating Insights..." : "Get AI Insights"}
            </button>
          </div>

          {insights.startsWith("AI Error") && (
            <div className="error">
              <strong>AI Error:</strong> {insights}
            </div>
          )}

          <AIInsightsDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            loading={loading}
            insights={insights}
          />
        </div>
      )}
    </div>
  );
}
