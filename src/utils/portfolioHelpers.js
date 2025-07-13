

export function formatINR(number) {
    return number?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }) ?? "-";
  }
  
  export function calculateSummary(headers, rows) {
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
  