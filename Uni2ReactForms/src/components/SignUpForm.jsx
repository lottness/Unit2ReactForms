import { useState } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Validation states
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    // Resetting previous errors
    setError(null);
    setUsernameError("");
    setPasswordError("");

    // Validation
    let hasError = false;
    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      setToken(result.token);
    } catch (e) {
      console.log(e);
      setError(e.message || "An error occurred");
    }
  }

  return (
    <>
      <h2>Sign up</h2>
      {error !== null ? <p>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
