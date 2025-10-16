function getBaseURL() {
  const renderURL = "https://job-application-portal-backend-07uw.onrender.com";
  return window.location.hostname.includes("localhost")
    ? "http://localhost:5500"
    : renderURL;
}

function saveAuthData(token, role) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
}

function getAuthToken() {
  return localStorage.getItem("token");
}

function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

function handleGoogleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const role = params.get("role");

  if (token && role) {
    saveAuthData(token, role);
    window.history.replaceState({}, document.title, "user.html");
    window.location.href = "user.html";
  }
}

async function authFetch(url, options = {}) {
  const token = getAuthToken();
  options.headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
  const res = await fetch(url, options);
  return res.json();
}


document.getElementById("forgotPasswordBtn").addEventListener("click", async () => {
  const email = prompt("Enter your registered email:");
  if (!email) return;

  const baseURL = getBaseURL();
  try {
    const res = await fetch(`${baseURL}/api/users/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong.");
      return;
    }

    // Show the reset section
    const resetSection = document.getElementById("resetSection");
    resetSection.style.display = "block";

    // Fill the token input
    const tokenInput = document.getElementById("copyableToken");
    tokenInput.value = data.token;

    alert("Token generated! You can copy it or go directly to the reset page.");
  } catch (err) {
    console.error("Forgot Password Error:", err);
    alert(`Server error: ${err.message}`);
  }
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const tokenInput = document.getElementById("copyableToken");
  try {
    await navigator.clipboard.writeText(tokenInput.value);
    alert("Token copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy token:", err);
    alert("Could not copy token. Please copy manually.");
  }
});
