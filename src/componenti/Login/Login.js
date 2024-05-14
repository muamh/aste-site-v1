import React, { useState, useEffect } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Api from '../../api/axiosConfig'
import axios from 'axios';
import { redirect } from 'react-router';
import Redirect from 'react-router-dom';
import { useNavigate } from 'react-router';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Aggiungi stato per tracciare lo stato di focus dell'input password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true); // Imposta lo stato di focus dell'input password su true
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false); // Imposta lo stato di focus dell'input password su false
  };

  const handleLoginSucces = (response) => {
    sessionStorage.setItem("identificator" , response.data);
    navigate("/personal/area")
    console.log("Entro nel logged");
    console.table(sessionStorage.getItem("identificator"))
  }

  const handleVenditoreLoginSucces = (response) => {
    sessionStorage.setItem("identificator" , response.data);
    sessionStorage.setItem("roleOfIdentificator" , response.data);
    navigate("/venditore/personal/area")
    console.log("Entro nel logged");
    console.table(sessionStorage.getItem("identificator"))
  }

  const handleLoginUnSuccesness = () => {
    axios.post("https://74c2-2001-b07-a3f-8e3-7949-ad72-e233-132f.ngrok-free.app/api/v1/venditore/single/venditore/logger/checkpoint", 
      {"email": email,
        "password": password,
      headers : {'ngrok-skip-browser-warning': 'true', "Content-Type": "application/json"}
    })
    .then(response => {("Utente non trovato" === (response.data)) ? handleLoginSecondUnSuccesness() : handleVenditoreLoginSucces(response)})
    .then(response => console.log("risp:" + response)).catch(error => alert("errore: " + error))
    
  }

  const handleLoginSecondUnSuccesness = () => {
    const errorMsg = "Utente inesistente";
    alert(errorMsg)
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impedisce il comportamento predefinito del modulo di inviare i dati

    // Esegui la chiamata API qui
    try {
      const errorMsg = "Utente inesistente";
      console.log(email);
      console.log(password);
      const response = axios.post("https://74c2-2001-b07-a3f-8e3-7949-ad72-e233-132f.ngrok-free.app/api/v1/users/single/user/logger/checkpoint", 
      {"email": email,
        "password": password,
      headers : {'ngrok-skip-browser-warning': 'true', "Content-Type": "application/json"}
    }).then(response => {("Utente non trovato" === (response.data)) ? handleLoginUnSuccesness() : handleLoginSucces(response)}).then(response => console.log("risp:" + response)).catch(error => alert("errore: " + error))
      
      /*if (response.data === "Utente non trovato") {
        handleLoginUnSuccesness();
      } else {
        handleLoginSucces();
      }

      /*if (sessionStorage.getItem("identificator")) {
        redirect={to: '/'}
        console.log('Login avvenuto con successo!');
      } else {
        console.error('Errore durante il login:', response.status);
      }*/
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Aggiungi il gestore per l'evento onSubmit */}
      <div className="login-form">
        <p className="login-text">
          <span className="fa-stack fa-lg">
            <strong>LOGIN</strong>
          </span>
        </p>
        <input 
            type="email" 
            name="email" 
            className="login-username" 
            autoFocus={true} 
            required={true} 
            placeholder="Email" 
            onChange={(e) => {setEmail(e.target.value)}}
        />
        <div className="password-input-container">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password"
            className="login-password" 
            required={true} 
            placeholder="Password" 
            onFocus={handlePasswordFocus} // Aggiungi gestori per focus e blur dell'input password
            onBlur={handlePasswordBlur}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <label className="password-toggle-label">
            <FontAwesomeIcon 
              icon={showPassword ? faEyeSlash : faEye} 
              className={`password-toggle-icon ${isPasswordFocused ? 'focused' : ''}`} 
              onClick={togglePasswordVisibility} 
            />
          </label>
        </div>
        <input type="submit" name="Login" value="Login" className="login-submit p-2" />
        <span href="" className="login-forgot-pass">Password dimenticata?</span>
      </div>
    </form>
  );
}

export default Login;
