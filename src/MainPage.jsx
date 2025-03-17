import { useState } from "react";
import WriteNewPost from "./WriteNewPost";

function App({ user, getJsonResponse }) {
  const [writeNewPost, setWriteNewPost] = useState(false);
  const [editPost, setEditPost] = useState(false);

  function ActionSelectionButtons() {
    if (!writeNewPost && !editPost) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setWriteNewPost(true);
            }}
          >
            Write a new post
          </button>
          <button
            type="button"
            onClick={() => {
              setEditPost(true);
            }}
          >
            Edit a post
          </button>
        </>
      );
    }
    return <></>;
  }

  function AuthorPage() {
    if (writeNewPost) {
      return (
        <WriteNewPost
          getJsonResponse={getJsonResponse}
          setWriteNewPost={setWriteNewPost}
        />
      );
    }
    return <></>;
  }

  return (
    <div>
      <ActionSelectionButtons />
      <AuthorPage />
    </div>
  );
}

export default App;
