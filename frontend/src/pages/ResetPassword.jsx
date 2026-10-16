import { useState } from "react";

const API = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api")
  .replace(/\/$/, "")
  .replace(/\/api$/, "");

async function readResponse(response) {
  const body = await response.text();
  if (!body) return {};

  try {
    return JSON.parse(body);
  } catch {
    return { message: "The server returned an unreadable response. Please try again." };
  }
}

export default function ResetPassword() {
  const token = new URLSearchParams(
    window.location.search
  ).get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Reset link is missing.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        }
      );

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Reset failed");
      }

      setMessage("Password updated. You can now log in.");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof TypeError
        ? "Unable to reach the server. Check your connection and try again."
        : err.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password (minimum 12 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={12}
          maxLength={72}
          required
          autoComplete="new-password"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          minLength={12}
          maxLength={72}
          required
          autoComplete="new-password"
        />

        <button disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>

      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
