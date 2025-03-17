import { useState } from "react";

function App({ signUp, setSignUp, getJsonResponse }) {
  const blankUserObject = {
    email: "",
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    creatorPassword: "",
  };
  const [formData, setFormData] = useState(blankUserObject);

  function updateFormData(field, e) {
    const newValue = e.target.value;
    const newObject = { ...formData };
    newObject[field] = newValue;
    setFormData(newObject);
  }

  async function submitData() {
    console.log(formData);

    const method = "POST";
    const urlExtension = "user/signup";

    const result = await getJsonResponse(urlExtension, method, formData);
    console.log({ result });
    // setSignUp(false);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              updateFormData("name", e);
            }}
          />
          Name
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => {
              updateFormData("email", e);
            }}
          />
          Email
        </label>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            required
            onChange={(e) => {
              updateFormData("username", e);
            }}
          />
          Username
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            required
            minLength={6}
            maxLength={16}
            onChange={(e) => {
              updateFormData("password", e);
            }}
          />
          <span>Password</span>
          <span>(between 6 and 16 characters)</span>
        </label>
        <label htmlFor="confirmPassword">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            minLength={6}
            maxLength={16}
            onChange={(e) => {
              updateFormData("confirmPassword", e);
            }}
          />
          Confirm your password
        </label>
        <label htmlFor="creatorPassword">
          <input type="password" name="creatorPassword" id="creatorPassword" />
          Enter the password for creating posts
        </label>
        <button type="button" onClick={submitData}>
          Sign up
        </button>
      </form>
    </div>
  );
}

export default App;
