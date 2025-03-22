import { useEffect, useState } from "react";

function App({
  getJsonResponse,
  editPost,
  setEditPost,
  setWritePost,
  setPostToEdit,
}) {
  const [postsArray, setPostsArray] = useState([]);

  async function getMyPosts() {
    const urlExtension = "post";
    const method = "GET";
    const myPosts = await getJsonResponse(urlExtension, method);
    setPostsArray(myPosts);
  }

  function DivForPost({ post }) {
    const contentPreview = `${post.content.substring(0, 30)}...`;
    const title = post.title;

    function editThisPost() {
      setPostToEdit(post);
      setWritePost(true);
      setEditPost(false);
    }

    return (
      <>
        <h2>{title}</h2>
        <p>{contentPreview}</p>
        <button type="button" onClick={editThisPost}>
          Edit post
        </button>
      </>
    );
  }

  useEffect(() => {
    if (editPost) {
      getMyPosts();
    }
  }, [editPost]);

  function returnToMainPage() {
    setEditPost(false);
    setWritePost(false);
  }

  if (editPost) {
    return (
      <div className="myPosts">
        <button type="button" onClick={returnToMainPage}>
          Cancel
        </button>
        {postsArray.map((post) => {
          const id = post.id;
          return (
            <div key={id}>
              <DivForPost post={post} />
            </div>
          );
        })}
      </div>
    );
  }
  return <></>;
}

export default App;
