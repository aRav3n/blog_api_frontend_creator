import { useState } from "react";

function App({ user, loggedIn }) {
  const [writeNewPost, setWriteNewPost] = useState(true);

  if (loggedIn) {
    return (
      <div>
        <h1>You're logged in!</h1>
      </div>
    );
  }
  return <></>;
}

export default App;
