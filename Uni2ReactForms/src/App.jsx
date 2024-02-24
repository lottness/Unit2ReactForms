import { useState } from "react";
import "./App.css";
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  return (
    <>
      {user === "" ? <></> : <h1>Hello {user}</h1>}
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} setUser={setUser} />
    </>
  );
}

export default App;
