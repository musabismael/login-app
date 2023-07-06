import React, { useState } from "react";
import "../styles/LoginPage.scss";
import animation from "../animation.svg";
interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least 8 characters with 1 uppercase, 1 lowercase, and 1 special character."
      );
    } else {
      if (username === "admin" && password === "Admin@123") {
        onLogin("Editor");
      } else if (username === "guest" && password === "Guest@123") {
        onLogin("Viewer");
      } else {
        setErrorMessage("Invalid username or password");
      }
      // Login logic
      setErrorMessage("User not found");
      console.log("Login successful!");
    }
  };

  return (
    <div className="container">
      <div className="animation-container">
        <img src={animation} alt="Animation" className="animation" />
      </div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
