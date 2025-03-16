import { useEffect } from "react";

function App({ user, loggedIn, logOut, signUp, setSignUp }) {
  let displayName;
  if (user) {
    if (user.name) {
      displayName = user.name;
    } else {
      displayName = user.username;
    }
  } else {
    displayName = "Anonymous User";
  }

  function Button() {
    if (loggedIn) {
      return (
        <button
          type="button"
          onClick={() => {
            logOut();
          }}
        >
          Log Out
        </button>
      );
    } else if (signUp) {
      return (
        <button
          type="button"
          onClick={() => {
            setSignUp(false);
          }}
        >
          Log In
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => {
          setSignUp(true);
        }}
      >
        Sign Up
      </button>
    );
  }

  return (
    <header>
      <div>{displayName}</div>
      <div>
        <Button />
      </div>
    </header>
  );
}

export default App;
