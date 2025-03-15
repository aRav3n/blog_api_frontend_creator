import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Login from "./Login";

const apiUrl = import.meta.env.VITE_API_ADDRESS;

async function getJsonData() {
  const url = apiUrl;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  return (
    <>
      {user ? <MainPage /> : <Login setUser={setUser} setJwt={setJwt} apiUrl={apiUrl} />}
      <Footer />
    </>
  );
}

export default App;
