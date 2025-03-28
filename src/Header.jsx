import { useEffect } from "react";

function App({
  user,
  logOut,
  pageToDisplay,
  displaySignupPage,
  displayLoginPage,
  deleteAccount,
}) {
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

  function SignedInButtons() {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            deleteAccount();
            logOut();
          }}
        >
          Delete Account
        </button>
        <button type="button" onClick={logOut}>
          Log Out
        </button>
      </>
    );
  }

  function LoginButton() {
    return (
      <button type="button" onClick={displayLoginPage}>
        Log In
      </button>
    );
  }

  function SignUpButton() {
    return (
      <button type="button" onClick={displaySignupPage}>
        Sign Up
      </button>
    );
  }

  function Button() {
    if (pageToDisplay === "signup") {
      return <LoginButton />;
    } else if (pageToDisplay === "login") {
      return <SignUpButton />;
    }
    return <SignedInButtons />;
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
