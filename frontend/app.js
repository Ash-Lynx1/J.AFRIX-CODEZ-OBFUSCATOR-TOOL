// frontend/app.js

const inputCode = document.getElementById("inputCode");
const outputCode = document.getElementById("outputCode");
const obfuscateBtn = document.getElementById("obfuscateBtn");
const copyBtn = document.getElementById("copyBtn");

// Handle obfuscate button click
obfuscateBtn.addEventListener("click", async () => {
  const code = inputCode.value.trim();
  if (!code) {
    alert("Please enter some JavaScript code to obfuscate.");
    return;
  }
  
  obfuscateBtn.disabled = true;
  obfuscateBtn.textContent = "Obfuscating...";
  
  try {
    const response = await fetch("/api/obfuscate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      alert(data.error || "Obfuscation failed.");
      return;
    }
    
    outputCode.value = data.data.obfuscated;
  } catch (err) {
    console.error("Error:", err);
    alert("Server error. Try again later.");
  } finally {
    obfuscateBtn.disabled = false;
    obfuscateBtn.textContent = "Obfuscate Code";
  }
});

// Copy output to clipboard
copyBtn.addEventListener("click", () => {
  if (!outputCode.value) {
    alert("Nothing to copy!");
    return;
  }
  outputCode.select();
  outputCode.setSelectionRange(0, 99999); // For mobile
  document.execCommand("copy");
  alert("Obfuscated code copied to clipboard!");
});