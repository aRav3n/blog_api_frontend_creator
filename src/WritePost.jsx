import { useState } from "react";

function App({
  getJsonResponse,
  setWriteNewPost,
  title,
  setTitle,
  content,
  setContent,
}) {
  async function saveDraft() {
    const urlExtension = "post";
    const method = "POST";
    const bodyObject = {
      title,
      content,
      published: false,
    };

    await getJsonResponse(urlExtension, method, bodyObject);
    setWriteNewPost(false);
  }

  async function publishPost() {
    const urlExtension = "post";
    const method = "POST";
    const bodyObject = {
      title,
      content,
      published: true,
    };

    await getJsonResponse(urlExtension, method, bodyObject);
    setWriteNewPost(false);
  }

  function cancelEdit() {
    setTitle("");
    setContent("");
    setWriteNewPost(false);
  }

  return (
    <>
      <form id="postEdit">
        <label htmlFor="title">
          <input
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

export default App;
