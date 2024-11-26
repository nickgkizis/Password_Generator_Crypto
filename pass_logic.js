document.addEventListener("DOMContentLoaded", () => {
  const lengthSlider = document.getElementById("lengthSlider");
  const lengthValue = document.getElementById("lengthValue");
  const generateBtn = document.getElementById("generateBtn");
  const reshuffleBtn = document.getElementById("reshuffleBtn");
  const copyBtn = document.getElementById("copyBtn");
  const passwordOutput = document.getElementById("passwordOutput");
  const includeUppercase = document.getElementById("uppercase");
  const includeDigits = document.getElementById("digits");
  const includeSpecial = document.getElementById("special");

  let currentPassword = "";

  // Update slider value display
  lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
  });

  // Generate a random password
  generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthSlider.value);
    const useUppercase = includeUppercase.checked;
    const useDigits = includeDigits.checked;
    const useSpecial = includeSpecial.checked;

    currentPassword = generatePassword(
      length,
      useUppercase,
      useDigits,
      useSpecial
    );
    passwordOutput.textContent = currentPassword;
  });

  // Copy the password to the clipboard
  copyBtn.addEventListener("click", () => {
    if (!currentPassword) {
      passwordOutput.textContent = "Generate a password first!";
      return;
    }
    navigator.clipboard
      .writeText(currentPassword)
      .then(() => {
        passwordOutput.textContent = "Password copied to clipboard!";
      })
      .catch(() => {
        passwordOutput.textContent = "Failed to copy password.";
      });
  });

  // Password generator function using crypto.getRandomValues()
  function generatePassword(length, useUppercase, useDigits, useSpecial) {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const special = "!@#$%^&*?";

    let allChars = lower;
    if (useUppercase) allChars += upper;
    if (useDigits) allChars += digits;
    if (useSpecial) allChars += special;

    if (!allChars) return "Select at least one character type!";

    let password = "";
    const allCharsArray = allChars.split("");
    const randomValues = new Uint32Array(length);

    // Get cryptographically secure random values
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % allCharsArray.length;
      password += allCharsArray[randomIndex];
    }

    return password;
  }
});
