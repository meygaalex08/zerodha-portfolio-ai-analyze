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
        {loading && <div className="spinner">Loading Insights...</div>}

        {!loading && insights && (
          <div className="insights-box">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {insights}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
