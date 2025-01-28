import { useState } from "react";
import "../Login/login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore imports
import upload from "../../lib/upload";
import { auth, db } from "../../lib/firebase"; // Firebase imports

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  const [loading, setLoading] = useState(false);
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);

      // Ensure the avatar file is provided before uploading
      if (!avatar.file) {
        toast.error("Please upload an avatar image");
        return;
      }

      //   const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email,
        password, // Note: It's better to avoid storing raw passwords
        // avatar: imgUrl,
        id: userCredential.user.uid,
        blocked: []
      });

      // Create empty user chats in Firestore
      await setDoc(doc(db, "userchats", userCredential.user.uid), {
        chats: []
      });

      toast.success("User Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Please enter valid Email/Password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // You can implement login functionality here
    // toast.success("hello");
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button disabled={loading}>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={(e) => handleRegister(e)}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => handleAvatar(e)}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button loading={loading}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
