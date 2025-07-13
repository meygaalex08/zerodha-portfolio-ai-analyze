import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function PortfolioTable({ headers, rows }) {
  return (
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
  );
}
