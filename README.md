Zerodha Portfolio AI Analyzer

A modern web application to upload, analyze, and get AI-powered insights for your Zerodha (or similar) portfolio CSV or Excel file.

Features

Upload your Zerodha portfolio CSV or Excel file
Instantly view a dashboard with investment, value, P&L, and returns
See all portfolio holdings in a clean, filterable table
Get detailed, actionable insights and recommendations using Gemini AI (1.5 Flash)
Re-upload or switch files at any time
Tech Stack

Frontend: React with Material-UI
Backend: Node.js/Express (Gemini API proxy)
CSV/Excel Parsing: xlsx
AI Engine: Google Gemini 1.5 Flash

Getting Started

Clone the repository and install dependencies:
git clone https://github.com/yourusername/zerodha-portfolio-ai.git
cd zerodha-portfolio-ai
npm install
Set up your Gemini API key:
Obtain your API key from Google AI Studio: https://makersuite.google.com/app/apikey
In the root directory, create a .env file:
GEMINI_API_KEY=your-gemini-api-key
Make sure .env is listed in .gitignore.
Start the backend server:
node server.js
Start the React frontend (in another terminal):
npm start
