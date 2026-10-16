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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      setMessage(data.message || "If that email is registered, a reset link will be sent.");
    } catch (err) {
      setError(err instanceof TypeError
        ? "Unable to reach the server. Check your connection and try again."
        : err.message || "Unable to send request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h2>Forgot Password</h2>
      <p>Enter your registered email to request a reset link.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Registered email"
          required
        />
        <button disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
