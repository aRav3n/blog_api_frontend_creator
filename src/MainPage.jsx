import { useState, useEffect } from "react";
import WritePost from "./WritePost";
import EditPosts from "./EditPosts";

function App({ getJsonResponse }) {
  const [writePost, setWritePost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    }
  }, [postToEdit]);

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

  return (
    <div>
      <ActionSelectionButtons />
      <WritePost
        getJsonResponse={getJsonResponse}
        writePost={writePost}
        setWritePost={setWritePost}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        postToEdit={postToEdit}
        setPostToEdit={setPostToEdit}
      />
      <EditPosts
        getJsonResponse={getJsonResponse}
        editPost={editPost}
        setEditPost={setEditPost}
        setWritePost={setWritePost}
        setPostToEdit={setPostToEdit}
      />
    </div>
  );
}

export default App;
