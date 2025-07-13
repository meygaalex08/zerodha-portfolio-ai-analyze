import { AppBar, Toolbar, Typography } from "@mui/material";
import InsightsIcon from '@mui/icons-material/AutoGraphRounded';

export default function Header() {
  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: "#5a189a" }}>
      <Toolbar>
        <InsightsIcon sx={{ mr: 1, color: "#fff" }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Zerodha Portfolio AI
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
