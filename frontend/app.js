// frontend/app.js
// Fully working JS for obfuscation frontend

document.addEventListener("DOMContentLoaded", () => {
  const inputCode = document.getElementById("inputCode");
  const outputCode = document.getElementById("outputCode");
  const obfuscateBtn = document.getElementById("obfuscateBtn");
  const copyBtn = document.getElementById("copyBtn");
  
  obfuscateBtn.addEventListener("click", async () => {
    const code = inputCode.value.trim();
    if (!code) {
      alert("Please enter some JavaScript code!");
      return;
    }
    
    try {
      const response = await fetch("/api/obfuscate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      if (data.error) {
        alert("Error: " + data.error);
        return;
      }
      
      outputCode.value = data.obfuscatedCode;
    } catch (err) {
      console.error(err);
      alert("An error occurred while obfuscating code.");
    }
  });
  
  copyBtn.addEventListener("click", () => {
    if (!outputCode.value) return;
    outputCode.select();
    document.execCommand("copy");
    alert("Obfuscated code copied to clipboard!");
  });
});