import { useState } from "react";
import WritePost from "./WritePost";
import EditPosts from "./EditPosts";

function App({ getJsonResponse }) {
  const [writePost, setWritePost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function ActionSelectionButtons() {
    if (!writePost && !editPost) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setWritePost(true);
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
    if (writePost) {
      return (
        <WritePost
          getJsonResponse={getJsonResponse}
          setWritePost={setWritePost}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
      );
    } else if (editPost) {
      return (
        <EditPosts
          getJsonResponse={getJsonResponse}
          setEditPost={setEditPost}
          setWritePost={setWritePost}
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
