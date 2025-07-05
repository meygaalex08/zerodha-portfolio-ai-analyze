require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/analyze", async (req, res) => {
  try {
    const { headers, rows } = req.body;
    const prompt = `
You are an expert Indian investment advisor. Analyze this Zerodha user's stock portfolio in depth, using advanced portfolio analytics but explained simply.

For each section below, provide detailed, portfolio-specific analysis—avoid generic statements. Reference actual numbers and stocks from the user's data.

**Respond in these sections (use clear titles):**

1. Portfolio Summary (Current profit/loss in ₹, return %, major drivers)
2. Advanced Performance Analysis
    - Identify overexposure, diversification by sector/stock/market cap
    - Comment on volatility, correlation (if possible), and drawdowns
    - List top contributors to gains & losses with exact ₹/%
3. Personalized Suggestions (Concrete steps to improve, referencing user holdings)
4. Key Risks & Warning Signs (E.g. concentration, sector risk, illiquidity, etc. Give numbers)
5. Considering current market conditions, do you recommend me to sell any stock and replace with any other stock and provide specific stock recommendations for diversification

Use **tables or bullet lists** for clarity. Make it actionable and easy for a non-expert to follow, using simple language but with real numbers. Do NOT give generic advice.
Headers: ${JSON.stringify(headers)}
Rows: ${JSON.stringify(rows)}

Your answer should be clear, concise, and actionable.
`;

    // Use latest Gemini model and SDK method
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"}); // Or "gemini-1.5-pro" if you have access
    const result = await model.generateContent(prompt);

      const insight = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No insight generated.";
      console.log("INSIGHTS", insight)
    res.json({ insights: insight });
    

  } catch (err) {
    res.status(500).json({ insights: "Gemini Error: " + err.message });
  }
});

app.listen(5050, () => console.log("Server running on 5050"));
