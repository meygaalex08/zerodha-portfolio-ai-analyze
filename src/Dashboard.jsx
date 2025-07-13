import { Paper, Grid, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUpOutlined';
import AssessmentIcon from '@mui/icons-material/AssessmentOutlined';
import PercentIcon from '@mui/icons-material/PercentOutlined';
import SummaryCard from "./SummaryCard";
import { formatINR } from "../src/utils/portfolioHelpers";

export default function Dashboard({ invested, curVal, pnl, returnPct }) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 5, mb: 5, background: "linear-gradient(110deg, #f6f8fa 70%, #ebeafd 100%)" }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 4, color: "#2b213a", letterSpacing: "0.5px" }}>
        Portfolio Analysis Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard icon={<AccountBalanceWalletIcon />} label="Total Investment" value={formatINR(invested)} color="#3439b5" gradient="linear-gradient(90deg,#f1f5fc 0,#e9e7fa 100%)" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard icon={<TrendingUpIcon />} label="Current Value" value={formatINR(curVal)} color="#0277bd" gradient="linear-gradient(90deg, #f5eefa 0,#e6eeff 100%)" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard icon={<AssessmentIcon />} label="Total P&L" value={formatINR(pnl)} color={pnl > 0 ? "#229e5b" : "#d32f2f"} gradient="linear-gradient(90deg, #fcf6e6 0,#fdebe7 100%)" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard icon={<PercentIcon />} label="Total Return" value={`${returnPct.toFixed(2)}%`} color="#20c997" gradient="linear-gradient(90deg,#e4fff2 0,#eafaf6 100%)" />
        </Grid>
      </Grid>
    </Paper>
  );
}
