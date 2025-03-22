import { useEffect, useState } from "react";

function App({
  getJsonResponse,
  writePost,
  setWritePost,
  title,
  setTitle,
  content,
  setContent,
  postToEdit,
  setPostToEdit,
}) {
  function cancelEdit() {
    setTitle("");
    setContent("");
    if (postToEdit) {
      setPostToEdit(null);
    }
    setWritePost(false);
  }

  async function finishWritingPost(urlExtension, method, bodyObject) {
    const response = await getJsonResponse(urlExtension, method, bodyObject);
    console.log({ response });
    cancelEdit();
  }

  async function saveDraft() {
    const urlExtension = postToEdit ? `post/${postToEdit.id}` : "post";
    const method = postToEdit ? "PUT" : "POST";
    const bodyObject = {
      title,
      content,
      published: false,
    };

    await finishWritingPost(urlExtension, method, bodyObject);
  }

  async function publishPost() {
    const urlExtension = postToEdit ? `post/${postToEdit.id}` : "post";
    const method = postToEdit ? "PUT" : "POST";
    const bodyObject = {
      title,
      content,
      published: true,
    };

    await finishWritingPost(urlExtension, method, bodyObject);
  }

  const key = postToEdit ? postToEdit.id : "new";

  if (writePost) {
    return (
      <>
        <form id="postEdit">
          <label htmlFor="title">
            <input
              key={`${key}-title`}
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            Title
          </label>
          <label htmlFor="content">
            <textarea
              key={`${key}-content`}
              name="content"
              id="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            Post content
          </label>
          <fieldset>
            <legend>Choose an option</legend>
            <button type="button" onClick={saveDraft}>
              Save as draft
            </button>
            <button type="button" onClick={publishPost}>
              Publish post
            </button>
            <button type="button" onClick={cancelEdit}>
              Exit without saving
            </button>
          </fieldset>
        </form>
      </>
    );
  }
  return <></>;
}

export default App;
