// backend/utils.js

// Validate if code input is safe and non-empty
export function validateCodeInput(code) {
  if (!code || typeof code !== "string" || code.trim().length === 0) {
    return { valid: false, error: "Invalid input. Provide non-empty JavaScript code." };
  }
  return { valid: true };
}

// Standard API success response
export function successResponse(data) {
  return {
    success: true,
    timestamp: new Date().toISOString(),
    data,
  };
}

// Standard API error response
export function errorResponse(message, status = 400) {
  return {
    success: false,
    timestamp: new Date().toISOString(),
    error: message,
    status,
  };
}

// Sanitize minimal user inputs (basic trim + length check)
export function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "").trim();
}