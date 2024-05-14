import React from 'react';
import api from "../../api/axiosConfig";
import SectionImmobili from "../SectionImmobili/SectionImmibili";


const Searcher = () => {
    
    var vartestoRicerca = document.querySelector('#testoRicerca') !== null ? document.querySelector('#testoRicerca').value : "";
    console.log(vartestoRicerca)
    var vartipoVendita = document.querySelector('#tipoVendita') !== null ? document.querySelector('#tipoVendita').value : "";
    console.log(vartipoVendita)
    var varregioneRicerca = document.querySelector('#regioneRicerca') !== null ? document.querySelector('#regioneRicerca').value : "";
    console.log(varregioneRicerca)
    var varprovinciaRicerca = document.querySelector('#provinciaRicerca') !== null ? document.querySelector('#provinciaRicerca').value : "";
    console.log(varprovinciaRicerca)

async function getImmobili() {
    
            try {
                const filtriRicerca = {
                    ricerca: vartestoRicerca.toString(),
                    tipologiaVendita: vartipoVendita.toString(),
                    regione: varregioneRicerca.toString(),
                    provincia: varprovinciaRicerca.toString()
                }

                const configuration = {
                    headers: 
                    {
                        'ngrok-skip-browser-warning': 'true', 
                        "Authorization": "anonimous"
                    }
                }

                const url = api.defaults.baseURL + "/api/v1/caseList/cerca/" + filtriRicerca.ricerca + "/" + filtriRicerca.tipologiaVendita + "/" + filtriRicerca.regione + "/" + filtriRicerca.provincia;
                
                await fetch(url, configuration)
                    .then(risposta => risposta.json())
                    .then(immobiliCards => { 
                        console.log("Risposta:\n", immobiliCards); 
                        const elementRemozione = document.getElementById("contenitoreRicerca");
                        document.getElementById("testospace").removeChild(elementRemozione);
                        const element = document.createElement("div");
                        element.setAttribute("id", "contenitoreRicerca");
                        document.getElementById('testospace').appendChild(element);
                        const elementTestoSpace = document.getElementById("contenitoreRicerca");
                        ReactDOM.createRoot(element).render(<SectionImmobili immobiliCards={immobiliCards}/>);
                    })
                    .catch(error => { console.error(error); });
            } catch (errore) {
                console.log("Errore:", errore);
            }
}
getImmobili();

try {
    document.getElementById("searchButton").addEventListener('click', () =>{
        vartestoRicerca = document.querySelector('#testoRicerca').value;
        vartipoVendita = document.querySelector('#tipoVendita').value;
        varregioneRicerca = document.querySelector('#regioneRicerca').value;
        varprovinciaRicerca = document.querySelector('#provinciaRicerca').value;
        /*testospace.innerHTML += `
            <div>${vartestoRicerca}</div>
            <div>${vartipoVendita}</div>
            <div>${varregioneRicerca}</div>
            <div>${varprovinciaRicerca}</div>`;
            */
            getImmobili();
    })
} catch (error) {
    console.log(error);
}

  return (
    <div  id='testospace'></div>
  )
}

export default Searcher