// backend/server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { obfuscateCode } from "./obfuscate.js";
import { validateCodeInput, successResponse, errorResponse } from "./utils.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Path fix for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: errorResponse("Too many requests, please try again later.", 429),
});
app.use("/api/", limiter);

// API: Obfuscate code
app.post("/api/obfuscate", (req, res) => {
  try {
    const { code } = req.body;
    
    const validation = validateCodeInput(code);
    if (!validation.valid) {
      return res.status(400).json(errorResponse(validation.error, 400));
    }
    
    const result = obfuscateCode(code);
    return res.json(successResponse({ obfuscated: result }));
  } catch (err) {
    console.error("Obfuscation Error:", err);
    return res.status(500).json(errorResponse("Server error during obfuscation.", 500));
  }
});

// API: Health check
app.get("/api/health", (req, res) => {
  res.json(successResponse({ status: "ok" }));
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Jay.Codez Obfuscator running on port ${PORT}`);
});