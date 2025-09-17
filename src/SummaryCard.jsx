export default function SummaryCard({ icon, label, value, color, gradient }) {
  return (
    <div
      className="summary-card"
      style={{ background: gradient }}
    >
      <div
        className="summary-card-icon"
        style={{ color }}
      >
        {icon}
      </div>
      <div className="summary-card-label" style={{ color }}>
        {label}
      </div>
      <div className="summary-card-value">{value}</div>
    </div>
  );
}
