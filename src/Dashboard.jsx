import SummaryCard from "./SummaryCard";
import { formatINR } from "../src/utils/portfolioHelpers";

export default function Dashboard({ invested, curVal, pnl, returnPct }) {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Portfolio Analysis Dashboard</h2>

      <div className="dashboard-grid">
        <SummaryCard
          icon="💰"
          label="Total Investment"
          value={formatINR(invested)}
          color="#3439b5"
          gradient="linear-gradient(90deg,#f1f5fc 0,#e9e7fa 100%)"
        />
        <SummaryCard
          icon="📈"
          label="Current Value"
          value={formatINR(curVal)}
          color="#0277bd"
          gradient="linear-gradient(90deg, #f5eefa 0,#e6eeff 100%)"
        />
        <SummaryCard
          icon="📊"
          label="Total P&L"
          value={formatINR(pnl)}
          color={pnl > 0 ? "#229e5b" : "#d32f2f"}
          gradient="linear-gradient(90deg, #fcf6e6 0,#fdebe7 100%)"
        />
        <SummaryCard
          icon="％"
          label="Total Return"
          value={`${returnPct.toFixed(2)}%`}
          color="#20c997"
          gradient="linear-gradient(90deg,#e4fff2 0,#eafaf6 100%)"
        />
      </div>
    </div>
  );
}
