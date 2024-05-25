import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        nom: nom,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        alert("Inscription réussie. Veuillez vous connecter.");
        navigate("/login");
      } else {
        setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Échec de l'inscription :", error);
      setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Inscription</h1>
        <p>Veuillez remplir les informations ci-dessous</p>

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
          className="register-container-1"
        />

        <input
          type="text"
          name="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="register-container-1"
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="register-container-1"
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
