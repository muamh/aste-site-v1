import React from 'react'
import api from "../../api/axiosConfig"
import apiMap from '../../api/axiosConfigMap'
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';
import './addCasa.css'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Regioni = () => {
    const [regioni, setRegioni] = useState([]);

    useEffect(() => {
        const fetchRegioni = async () => {
            try {
                const response = await apiMap.get("/regioni");
                setRegioni(response.data);
            } catch (error) {
                console.error("Error fetching regioni:", error);
            }
        };

        fetchRegioni();
    }, []);

    return (
        <>
            {regioni.map(regione => (
                <option key={regione} value={regione}>{regione}</option>
            ))}
        </>
    );
}

const Province = ({ selectedRegione }) => {
    const [province, setProvince] = useState([]);

    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const response = await apiMap.get(`/province/${selectedRegione}`);
                setProvince(response.data);
            } catch (error) {
                console.error("Error fetching province:", error);
            }
        };

        if (selectedRegione !== "regione") {
            fetchProvince();
        }
    }, [selectedRegione]);

    if (selectedRegione != "regione") {
        return (
            <>
                
                <div className="col-md" style={{overflow:"hidden"}}>
                    <select className="form-select border-0 py-3" style={{ color: 'black', overflow:"hidden"}} id='provinciaImmobile'>
                        <option selected hidden>Provincia</option>
                        {province.map(provincia => (
                            <option key={provincia.codice} value={provincia.nome}>{provincia.nome} ({provincia.sigla})</option>
                        ))}
                    </select>
                </div>
            </>
        );
    } else {
        <></>
    }
}

const AddCasa = () => {
    const [selectedRegione, setSelectedRegione] = useState("regione");

    const handleRegioneChange = (e) => {
        setSelectedRegione(e.target.value);
    };
    const navigate = useNavigate();
    const [utente, setUtente] = useState(null);
    const [casaNextId, setCasaNextId] = useState(null);

    useEffect(() => {
        const fetchUtente = async () => {
          try {
            const risposta = await api.post("/api/v1/venditore/single/venditore/get/details/checkpoint", {identificator: sessionStorage.getItem("identificator")});
            console.log("utente:", risposta.data);
            setUtente(risposta.data);
            const response = await api.post("/api/v1/venditore/single/get/next/casa/id", {identificator: sessionStorage.getItem("identificator")});
            console.log(response.data);
            setCasaNextId(response.data);
          } catch (errore) {
            console.log("Errore:", errore);
            props.onLoading(true);
          }
        };
      
        fetchUtente(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

      const imageInputUploader = () => {
        const numphoto = photoCounter.value;
        photoCounter.readOnly = true;
        confirmButton.disabled = true;
        console.log(numphoto);
        for (let index = 0; index < numphoto; index++) {
            imageUploader.innerHTML+='<input type="file" className="inputFile form-control border-0 py-3 " name="filesaver" style={{ color: "black", overflow:"hidden"}} />';
        }
      }

      const asteDisablingChoosing = (visibility) => {
        (visibility) ? ($("#inizioAsta").show()) : ($("#inizioAsta").hide());
        (visibility) ? ($("#fineAsta").show()) : ($("#fineAsta").hide());
      }

      const asteInformation = () => {
        (tipologiaVendita.value === "Asta") ? (asteDisablingChoosing(true)) : (asteDisablingChoosing(false)) 
      }

      async function getImagesLinks(){
        try {
            const inputFiles = document.getElementsByName("filesaver");
            console.table(document.getElementsByName("filesaver"));
            const inputFileArray = Array.from(inputFiles)
            var imageLink = [];
            console.log("ciao");
            console.log(inputFileArray);
            console.log(inputFiles);
            inputFileArray.forEach(file => {
                console.log("ciao");
                console.log(file.files[0]);
                api.post('/api/v1/upload/files/uploading', {file: file.files[0]}, {
                    headers: {
                      'Content-Type': "multipart/form-data"
                    }
                }).then(response => imageLink.push(response.data))
            })
            console.log(imageLink);
            return imageLink;
        } catch (error) {
            console.log(error);
            return null;
        }
      }

      const ctrlInizioDate = () =>{
        if(!startAsta.value){
            return new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        }
        else{
            return new Date(startAsta.value).toISOString().replace('-', '/').split('T')[0].replace('-', '/');;
        }
      }

      const ctrlFineDate = () =>{
        if(!endAsta.value){
            return new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        }
        else{
            return new Date(endAsta.value).toISOString().replace('-', '/').split('T')[0].replace('-', '/');;
        }
      }

      const ctrlInizioTime = () =>{
        if(!startAsta.value){
            return new Date().valueOf();
        }
        else{
            return new Date(startAsta.value).valueOf();
        }
      }

      const ctrlFineTime = () =>{
        if(!endAsta.value){
            return new Date().valueOf();
        }
        else{
            return new Date(endAsta.value).valueOf();
        }
      }

      const immobileCreactionHandler = async () => {
        if (nomeArticolo.value && tipologieImmobili.value && indirizzo.value &&
            cap.value && provinciaImmobile.value && regioneImmobile.value && descrizioneImmobile.value
            && prezzoImmobile.value && tipologiaVendita.value) {
            var imageLink = imageLink = await getImagesLinks(); // Attendere che getImagesLinks sia completato
            console.log(imageLink);
            console.table(imageLink.toString());
            setTimeout(function() {var imagesListLink = new Array();
            const msgContentConfig = {
                casa: nomeArticolo.value,
                tipologia: new Array(tipologieImmobili.value, tipologieImmobili.value),
                indirizzo: indirizzo.value,
                cap: cap.value,
                provincia: provinciaImmobile.value,
                regione: regioneImmobile.value,
                idCasa: casaNextId,
                sellerId: utente.idVenditore,
                immagini: imageLink,
                descrizione: descrizioneImmobile.value,
                ora_inizio: ctrlInizioTime(),
                ora_fine: ctrlFineTime(),
                data_inizio: ctrlInizioDate(),
                data_fine: ctrlFineDate(),
                prezzo: prezzoImmobile.value,
                tipo_vendita: tipologiaVendita.value,
                identificativo: sessionStorage.getItem("identificator")
            };
            console.table(msgContentConfig);
                api.post("/api/v1/caseList/crete/immobile/in/a/detailed/way", msgContentConfig)
                .then(response => alert(response.data)).catch(erroe => console.log(erroe))
            }
                , 2500);
        }
        else{
            alert("Tutti i campi devono essere riempiti");
        }
    }
    

      if (!utente) {
        return (
            <div className='App' style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
                <AtomicSpinner 
                    electronColorPalette={[ "#0081C9", "#5BC0F8", "#86E5FF", "#345b66"]}
                    nucleusParticleFillColor='#163219'
                    atomSize={475}
                    electronPathCount={4}
                />
                <div>caricamento...</div>
                {navigate("/login")}
            </div>
        );
    } else{
        return (
            <div className='container personal'>
                <div className="row g-2">
                    <h2 className="text-center ">INSERISCI NUOVA CASA</h2>
                    <p><strong>Numero di immagini:</strong></p>
                    <div className='col-md'>
                        <input type='number' className='form-select border-o py-3' style={{color: 'black'}} title={1} id='photoCounter' min={1} defaultValue={1}/>
                        <button className="btn btn-primary border-0 w-100 py-3" 
                                id='confirmButton' 
                                onClick={imageInputUploader}>Conferma</button>
                    </div>
                    <p><strong>Carica file:</strong> 
                        <div className="col-md" id="imageUploader" >
                            
                        </div>
                    </p>
                    <p><strong>Nome articolo:</strong>
                        <div className="col-md">
                            <input type="text" className="form-control border-0 py-3" placeholder="ES: Casa affacciata sul lago..." style={{ color: 'black' }} id='nomeArticolo' key={"nomeArticolo"}/>
                        </div>
                    </p>
                    <div className="col-md"><p><strong>Tipologia di vendita:</strong> 
                        <select className="form-select border-0 py-3" style={{ color: 'black', overflow:"hidden"}} onChange={asteInformation} id='tipologiaVendita'>
                                <option selected >Vendita</option>
                                <option>Asta</option>
                        </select>
                    </p></div>
                    <p><strong>Tipologia di immobile:</strong> <div className="col-md">
                        <input type="text" className="form-control border-0 py-3" placeholder="ES: Villa, Villetta a schiera, Appartamento" style={{ color: 'black' }} id='tipologieImmobili' key={"tipologieImmobili"}/>
                    </div></p>
                    <p id='inizioAsta' style={{display: 'none'}}><strong>Inizio Asta:</strong>
                        <div className="col-md">
                            <input type="datetime-local" className="form-control border-0 py-3" placeholder="ES: Casa affacciata sul lago..." style={{ color: 'black' }} id='startAsta' key={"nomeArticolo"}/>
                        </div>
                    </p>
                    <p id='fineAsta' style={{display: 'none'}}><strong>Fine Asta:</strong>
                        <div className="col-md">
                            <input type="datetime-local" className="form-control border-0 py-3" placeholder="ES: Casa affacciata sul lago..." style={{ color: 'black' }} id='endAsta' key={"nomeArticolo"}/>
                        </div>
                    </p>
                    <p><strong>Regione:</strong>
                        <div className="col-md" style={{overflow:"hidden"}}>
                            <select className="form-select border-0 py-3" style={{ color: 'black', overflow:"hidden"}} onChange={handleRegioneChange} id='regioneImmobile'>
                                <option selected hidden>Regione</option>
                                <Regioni/>
                            </select>
                        </div>
                    </p>
                    <Province selectedRegione={selectedRegione} />
                    <p><strong>Indirizzo:</strong>
                        <div className="col-md">
                            <input type="text" className="form-control border-0 py-3" placeholder="ES: via roma, 5, Cazzago san Martino..." style={{ color: 'black' }} id='indirizzo' key={"indirizzo"}/>
                        </div>
                    </p>
                    <p><strong>CAP:</strong>
                    <div className='col-md'>
                        <input type='number' className='form-select border-o py-3' style={{color: 'black'}} title={1} id='cap' defaultValue={25086}/>
                    </div></p>
                    <p><strong>Prezzo:</strong>
                    <div className='col-md'>
                        <input type='number' className='form-select border-o py-3' style={{color: 'black'}} title={1} id='prezzoImmobile' defaultValue={0}/>
                    </div></p>
                    <p><strong>Descrizione:</strong>
                        <div className="col-md">
                            <textarea className="form-control border-0 py-3" placeholder="ES: immobile situato vicino al comune, centro città, ecc.." style={{ color: 'black' }} id='descrizioneImmobile' key={"descrizione"}/>
                        </div>
                    </p>
                    <div className="">
                        <button 
                            className="btn btn-primary border-0 w-100 py-3" 
                            id='searchButton'
                            onClick={immobileCreactionHandler}
                        >Crea Immobile</button>
                    </div>
                </div>            
            </div>
        )
}
}

export default AddCasa