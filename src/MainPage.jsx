import { useState } from "react";
import WritePost from "./WritePost";

function App({ user, getJsonResponse }) {
  const [writeNewPost, setWriteNewPost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        <WritePost
          getJsonResponse={getJsonResponse}
          setWriteNewPost={setWriteNewPost}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
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
