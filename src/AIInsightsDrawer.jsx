import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIInsightsDrawer({ open, onClose, loading, insights }) {
  return (
    <div className={`drawer ${open ? "open" : ""}`}>
      <div className="drawer-header">
        <h2>Portfolio AI Insights</h2>
        <button className="drawer-close" onClick={onClose}>×</button>
      </div>

      <div className="drawer-content">
        {loading && <div className="spinner">Loading...</div>}

        {!loading && insights && (
          <div className="insights-box">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {insights}
            </ReactMarkdown>
          </div>
        )}

        {!loading && !insights && (
          <p className="placeholder">
            Click <strong>Get AI Insights</strong> to see portfolio analysis here.
          </p>
        )}
      </div>
    </div>
  );
}
