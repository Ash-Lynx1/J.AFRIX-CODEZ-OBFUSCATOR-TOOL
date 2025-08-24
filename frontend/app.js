// Handles frontend interaction with obfuscation API
document.addEventListener("DOMContentLoaded", () => {
  const inputCode = document.getElementById("inputCode");
  const outputCode = document.getElementById("outputCode");
  const obfuscateBtn = document.getElementById("obfuscateBtn");
  const copyBtn = document.getElementById("copyBtn");
  
  obfuscateBtn.addEventListener("click", async () => {
    const code = inputCode.value.trim();
    if (!code) return alert("Please enter JS code!");
    
    try {
      const response = await fetch("/api/obfuscate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      if (data.error) return alert("Error: " + data.error);
      
      outputCode.value = data.obfuscatedCode;
    } catch (err) {
      console.error(err);
      alert("Error during obfuscation.");
    }
  });
  
  copyBtn.addEventListener("click", () => {
    if (!outputCode.value) return;
    outputCode.select();
    document.execCommand("copy");
    alert("Obfuscated code copied!");
  });
});