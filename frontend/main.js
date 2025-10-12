// Detect whether running locally or on Render
function getBaseURL() {
  // Change this to your Render URL after deployment
  return window.location.hostname.includes("localhost")
    ? "http://localhost:5500"
    : "https://job-application-portal-backend-07uw.onrender.com";
}

// Save token + role in localStorage
function saveAuthData(token, role) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
}

function getAuthToken() {
  return localStorage.getItem("token");
}
// Clear stored token
function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}
// Detect whether running locally or on Render
function getBaseURL() {
  // Use your local backend or deployed Render backend
  const renderURL = "https://job-application-portal-backend-07uw.onrender.com";
  return window.location.hostname.includes("localhost")
    ? "http://localhost:5500"
    : renderURL;
}

// Save token + role in localStorage
function saveAuthData(token, role) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
}

function getAuthToken() {
  return localStorage.getItem("token");
}

// Clear stored token
function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

// Handle Google OAuth redirect (backend should redirect to frontend with ?token=&role=)
function handleGoogleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const role = params.get("role");

  if (token && role) {
    saveAuthData(token, role);

    // Remove query parameters from URL without reloading
    const cleanURL = window.location.href.split("?")[0];
    window.history.replaceState({}, document.title, cleanURL);

    // Redirect to user page
    window.location.href = "user.html";
  }
}

// Example: Wrapper to fetch with JWT
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

// Handle Google OAuth redirect (backend should redirect to frontend with ?token=&role=)
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

document.getElementById("forgotPasswordBtn").addEventListener("click", async () => {
  const email = prompt("Enter your registered email:");
  if (!email) return;

  const res = await fetch("/api/users/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  alert(data.message + (data.token ? `\nYour reset token: ${data.token}` : ""));
});
