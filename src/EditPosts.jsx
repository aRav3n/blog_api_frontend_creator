import { useEffect, useState } from "react";

function App({
  getJsonResponse,
  setEditPost,
  setWritePost,
  title,
  setTitle,
  content,
  setContent,
}) {
  async function getMyPosts() {
    const urlExtension = "post";
    const method = "GET";
    const myPosts = await getJsonResponse(urlExtension, method);
    console.log(myPosts);
  }

  useEffect(() => {
    getMyPosts()
  }, [])

  return <></>;
}

export default App;
