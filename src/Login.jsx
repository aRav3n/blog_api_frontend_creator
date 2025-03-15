import { useState, useEffect } from "react";

function Login({ setUser, setJwt, apiUrl }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      const dataToSubmit = { email, password };
      const url = `${apiUrl}/user`;

      await fetch(url, {});
    } catch (error) {}
  };

  return (
    <div>
      <h1>Log in here</h1>
      <form action="/user" method="get">
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            onChange={setEmail}
            value={email}
          />
          email
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            onChange={setPassword}
            value={password}
          />
          password
        </label>
        <button type="button" onClick={handleClick}>
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
