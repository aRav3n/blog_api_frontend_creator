import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import MainPage from "./MainPage";
import Signup from "./Signup";

const apiUrl = import.meta.env.VITE_API_ADDRESS;

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [pageToDisplay, setPageToDisplay] = useState("login");
  const pages = {
    main: <MainPage user={user} getJsonResponse={getJsonResponse} />,
    login: (
      <Login
        setUser={setUser}
        setToken={setToken}
        logIn={logIn}
        getJsonResponse={getJsonResponse}
      />
    ),
    signup: <Signup getJsonResponse={getJsonResponse} />,
  };

  async function getJsonResponse(urlExtension, method, bodyObject) {
    const url = `${apiUrl}${urlExtension}`;
    const body = JSON.stringify(bodyObject);
    const fetchObject = {
      method,
    };
    if (method !== "GET") {
      fetchObject.body = body;
    }
    if (token) {
      fetchObject.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      fetchObject.headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      const response = await fetch(url, fetchObject);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("error sending data:", error);
    }
  }

  async function wakeUpBackend() {
    const bodyObject = null;
    const urlExtension = "user";
    const method = "GET";

    await getJsonResponse(urlExtension, method, bodyObject);
  }

  useEffect(() => {
    (async () => {
      await wakeUpBackend();
    })();
  }, []);

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
    setPageToDisplay("main");
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setPageToDisplay("login");
  }

  function displayLoginPage() {
    setPageToDisplay("login");
  }

  function displaySignupPage() {
    setPageToDisplay("signup");
  }

  async function deleteAccount() {
    const urlExtension = "";
    const method = "DELETE";
    const bodyObject = {};
    await getJsonResponse(urlExtension, method, bodyObject);
    setPageToDisplay("signup");
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
        logOut={logOut}
        pageToDisplay={pageToDisplay}
        displaySignupPage={displaySignupPage}
        displayLoginPage={displayLoginPage}
      />
      {pages[pageToDisplay]}
      <Footer />
    </>
  );
}

export default App;
