import { useState, useEffect } from "react";

function App({
  setUser,
  setToken,
  logIn,
  loggedIn,
  apiUrl,
  signUp,
  getJsonResponse,
}) {
  const [email, setEmail] = useState("a@ryan.com");
  const [password, setPassword] = useState("123456");

  async function handleClick() {
    const urlExtension = "user/login";
    const bodyObject = { email, password };
    const method = "POST";

    const result = await getJsonResponse(urlExtension, method, bodyObject);
    if (result.token && result.userObject) {
      setToken();
      setUser();
      logIn(result.token, result.userObject);
    }
  }

  function handleChange(e, setFunction) {
    const newValue = e.target.value;
    setFunction(newValue);
  }

  return (
    <div>
      <h1>Log in here</h1>
      <form>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              handleChange(e, setEmail);
            }}
            value={email}
          />
          email
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              handleChange(e, setPassword);
            }}
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

export default App;
