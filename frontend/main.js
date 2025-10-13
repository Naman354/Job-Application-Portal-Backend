function getBaseURL() {
  return window.location.hostname.includes("localhost")
    ? "http://localhost:5500"
    : "https://job-application-portal-backend-07uw.onrender.com";
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

    const cleanURL = window.location.href.split("?")[0];
    window.history.replaceState({}, document.title, cleanURL);

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
