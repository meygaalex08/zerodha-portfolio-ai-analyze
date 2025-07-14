# Zerodha Portfolio AI Analyzer

A modern web application to **upload, analyze, and receive AI-powered insights** for your Zerodha (or similar) stock portfolio using a CSV or Excel file.
<img width="3008" height="1558" alt="image" src="https://github.com/user-attachments/assets/46b435f1-1c31-436a-b938-3f8277daebfb" />

---

## Features

- **Easy Upload:** Upload your Zerodha portfolio CSV or Excel file.
- **Instant Dashboard:** Instantly view a dashboard with investment, current value, P&L, and return percentages.
- **Clean Table View:** See all portfolio holdings in a clean, filterable table.
- **AI Insights:** Get actionable AI-generated analysis and investment suggestions (powered by Gemini AI 1.5 Flash).
- **Flexible:** Re-upload or switch files at any time.

---

## Tech Stack

- **Frontend:** React.js (with Material-UI)
- **Backend:** Node.js & Express (serves as Gemini API proxy)
- **AI Engine:** Google Gemini 1.5 Flash API

---

## Getting Started

### 1. **Clone the Repository**

```sh
git clone https://github.com/meygaalex08/zerodha-portfolio-ai-analyze.git
cd zerodha-portfolio-ai-analyze
npm install
Set up your Gemini API key: Obtain your API key from Google AI Studio: https://makersuite.google.com/app/apikey

In the root directory, create a .env file:
GEMINI_API_KEY=your-gemini-api-key


Start the backend server:
node server.js
Start the React frontend (in another terminal):
npm start
```
