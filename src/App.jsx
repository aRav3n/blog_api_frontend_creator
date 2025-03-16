import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import MainPage from "./MainPage";
import Signup from "./Signup";

const apiUrl = import.meta.env.VITE_API_ADDRESS;

async function getJsonResponse(urlExtension, method, bodyObject) {
  const url = `${apiUrl}${urlExtension}`;
  const body = JSON.stringify(bodyObject);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error sending data:", error);
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  function getStoredUser() {
    let storedUserJson = localStorage.getItem("user");
    let storedToken = localStorage.getItem("token");

    if (storedUserJson === "undefined") storedUserJson = null;
    if (storedToken === "undefined") storedToken = null;

    if (storedToken && storedUserJson) {
      const storedUser = JSON.parse(storedUserJson);
      return { storedToken, storedUser };
    }
    return false;
  }

  function logIn(newToken, newUser) {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setLoggedIn(true);
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setLoggedIn(false);
  }

  useEffect(() => {
    if (!user && !token) {
      const userInStorage = getStoredUser();
      if (userInStorage) {
        const storageToken = userInStorage.storedToken;
        const storageUser = userInStorage.storedUser;
        logIn(storageToken, storageUser);
      }
    }
  });

  return (
    <>
      <Header
        user={user}
        loggedIn={loggedIn}
        logOut={logOut}
        signUp={signUp}
        setSignUp={setSignUp}
      />
      <MainPage user={user} loggedIn={loggedIn} />
      <Login
        setUser={setUser}
        setToken={setToken}
        logIn={logIn}
        loggedIn={loggedIn}
        signUp={signUp}
        getJsonResponse={getJsonResponse}
      />
      <Signup
        signUp={signUp}
        setSignUp={setSignUp}
        getJsonResponse={getJsonResponse}
      />
      <Footer />
    </>
  );
}

export default App;
