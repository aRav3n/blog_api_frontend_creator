import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";

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

  useEffect(() => {
    const jsonData = (async () => {
      getJsonData();
    })();
  }, [user]);

  const CreatePost = () => {
    return <></>;
  };
  const Header = () => {
    return <></>;
  };
  const Login = () => {
    return <></>;
  };

  return (
    <>
      <Header />
      {user ? <CreatePost /> : <Login />}
      <Footer />
    </>
  );
}

export default App;
