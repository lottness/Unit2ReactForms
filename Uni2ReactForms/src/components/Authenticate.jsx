import { useState } from "react";
import PropTypes from "prop-types";

export default function Authenticate({ token, setToken, setUser }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setUser(result.data.username);
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <>
      <h2>Authenticate</h2>
      {successMessage !== null ? <p>{successMessage}</p> : <></>}
      {error !== null ? <p>{error}</p> : <></>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </>
  );
}

Authenticate.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
};
