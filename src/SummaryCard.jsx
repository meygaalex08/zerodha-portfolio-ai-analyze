import { Paper, Avatar, Typography } from "@mui/material";

export default function SummaryCard({ icon, label, value, color, gradient }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        background: gradient,
        boxShadow: "0 2px 16px 0 #e0e0f4b0",
        textAlign: "center",
      }}
    >
      <Avatar sx={{ bgcolor: "#fff", color, mx: "auto", mb: 1 }}>
        {icon}
      </Avatar>
      <Typography fontWeight={500} sx={{ color, mb: 1 }}>
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={700} sx={{ color: "#1a3a5a", letterSpacing: "0.5px" }}>
        {value}
      </Typography>
    </Paper>
  );
}
