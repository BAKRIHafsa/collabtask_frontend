import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/css/registration.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the LoginRequest object to the backend
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      // Handle the response from the backend
      if (response.status === 200) {
        // Login successful
        alert("Login Successful");
        const userId = response.data; // Assuming the response contains the userId
        // Store the userId in localStorage
        localStorage.setItem("userId", userId);
        // Render BoardList component directly
        navigate(`/boardlist/${userId}`);
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (err) {
      console.error("User Login Failed:", err);
      setErrorMessage("User Login Failed");
    }
  };
  const handleSignupClick = () => {
    // Naviguer vers la page d'inscription lorsque le bouton "Sign Up" est cliqué
    navigate("/register");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Fill in the Information Below</p>

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="register-container-1"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="register-container-1"
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-button">
          Login
        </button>
        <button type="button" onClick={handleSignupClick}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
