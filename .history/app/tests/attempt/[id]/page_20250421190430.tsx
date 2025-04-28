const refreshToken = async () => {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("auth_token", data.token);
    return data.token;
  }
  throw new Error("Failed to refresh token");
};

if (response.status === 401) {
  try {
    const newToken = await refreshToken();
    setAuthState((prev) => ({ ...prev, token: newToken }));
    return validateAuth(); // Retry with new token
  } catch {
    throw new Error("Unauthorized: Invalid or expired token");
  }
}