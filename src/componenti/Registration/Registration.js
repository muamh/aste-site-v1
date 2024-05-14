import React, { useState, useEffect } from 'react';
import './Registration.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Api from '../../api/axiosConfig'
import axios from 'axios';
import { redirect } from 'react-router';
import Redirect from 'react-router-dom';
import { useNavigate } from 'react-router';

const Registration = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Aggiungi stato per tracciare lo stato di focus dell'input password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [piva, setPIva] = useState("");
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
    Api.post("/api/v1/venditore/single/venditore/logger/checkpoint", 
      {"email": email,
        "password": password,
        "cognome" : cognome,
        "nome": nome,
        "piva" : piva,
    })
    .then(response => {("Errore durante la generazione del venditore" === (response.data)) ? handleLoginSecondUnSuccesness() : handleVenditoreLoginSucces(response)})
    .then(response => console.log("risp:" + response)).catch(error => alert("errore: " + error))
    
  }

  const pivaDisabled = () => {
    $("#piva").show();
    document.getElementById("piva").setAttribute("required", true);
  }

  const pivaAbled = () => {
    $("#piva").hide();
    document.getElementById("piva").removeAttribute("required");
    document.getElementById("piva").setAttribute("required", false);
  }

  const userTypeHandler = () =>{
    (document.getElementById("piva").style.display === "none") ? (pivaDisabled()) : (pivaAbled());
  }

  const handleLoginSecondUnSuccesness = () => {
    const errorMsg = "Utente inesistente";
    alert(errorMsg)
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impedisce il comportamento predefinito del modulo di inviare i dati
    if (tipoUtente.value === "venditore") {
        console.log(email);
        console.log(password);
        Api.post("/api/v1/venditore/single/venditore/sign/up/checkpoint", 
        {"email": email,
          "password": password,
          "cognome" : cognome,
          "nome": nome,
          "piva" : piva
        })
        .then(response => {("Errore durante la generazione del venditore" === (response.data)) ? alert(response.data) : handleVenditoreLoginSucces(response)}).then(response => console.log("risp:" + response)).catch(error => alert("errore: " + error))
    } else if (tipoUtente.value === "utente") {
      console.log(email);
        console.log(password);
        Api.post("/api/v1/users/single/user/sign/up/checkpoint", 
        {"email": email,
          "password": password,
          "cognome" : cognome,
          "nome": nome
        })
        .then(response => {
          ("Errore durante la generazione dell'utente" === (response.data)) 
          ? 
          alert(response.data) 
          : 
          handleLoginSucces(response)})
          .then(response => 
            console.log("risp:" + response))
          .catch(error => alert("errore: " + error))
    }
    
  };

  return (
    <form onSubmit={handleSubmit}> {/* Aggiungi il gestore per l'evento onSubmit */}
      <div className="login-form">
        <p className="login-text">
          <span className="fa-lg">
            <strong>REGISTRAZIONE</strong>
          </span>
        </p>
        <input 
            type="text" 
            name="nome" 
            className="login-username" 
            autoFocus={true} 
            required={true} 
            placeholder="Nome" 
            onChange={(e) => {setNome(e.target.value)}}
        />
        <input 
            type="text" 
            name="cognome" 
            className="login-username" 
            autoFocus={true} 
            required={true} 
            placeholder="Cognome" 
            onChange={(e) => {setCognome(e.target.value)}}
        />
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
          <div className=" ">
              <select className="login-username border-0 py-3" title='Utente' id='tipoUtente' onChange={userTypeHandler}>
                  <option value="utente">Utente</option>
                  <option value="venditore">Venditore</option>
              </select>
          </div>
        <input 
            type="text" 
            name="piva" 
            id='piva'
            className="login-username" 
            autoFocus={true} 
            required={false} 
            placeholder="Partita Iva: " 
            defaultValue="p.iva"
            style={{display: 'none'}}
            onChange={(e) => {setPIva(e.target.value)}}
        />
        <input type="submit" name="registrati" value="Registrati" className="login-submit p-2" />
      </div>
    </form>
  );
}

export default Registration;
