import { useState } from "react";

function App({ user }) {
  const [writeNewPost, setWriteNewPost] = useState(true);

    return (
      <div>
        <h1>You're logged in!</h1>
      </div>
    );
}

export default App;
