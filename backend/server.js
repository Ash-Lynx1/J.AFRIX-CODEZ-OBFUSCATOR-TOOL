import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { obfuscateJS } from "./obfuscate.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: "10mb" }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// API endpoint for obfuscation
app.post("/api/obfuscate", (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });
    
    const obfuscatedCode = obfuscateJS(code);
    res.json({ obfuscatedCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Obfuscation failed" });
  }
});

// Fallback route for frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));