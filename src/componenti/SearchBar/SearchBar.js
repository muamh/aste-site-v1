import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfigMap';
import apiSpring from '../../api/axiosConfig';
import { Link } from 'react-router-dom'
import './SearchBar.css';

const Regioni = () => {
    const [regioni, setRegioni] = useState([]);

    useEffect(() => {
        const fetchRegioni = async () => {
            try {
                const response = await api.get("/regioni");
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
                const response = await api.get(`/province/${selectedRegione}`);
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
                
                <div className="col-md-4" style={{overflow:"hidden"}}>
                    <select className="form-select border-0 py-3" style={{ color: 'black', overflow:"hidden"}} id='provinciaRicerca'>
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


const SearchBar = (props) => {
    const [selectedRegione, setSelectedRegione] = useState("regione");

    const handleRegioneChange = (e) => {
        setSelectedRegione(e.target.value);
    };

    const handleSearch = () =>{
        try {
            const filtriRicerca = {
                ricerca: testoRicerca.value.toString(),
                tipologiaVendita: tipoVendita.value.toString(),
                regione: regioneRicerca.value.toString(),
                provincia: provinciaRicerca.value.toString()
            }
        
            const configuration = {
                headers: 
                {
                    'ngrok-skip-browser-warning': 'true', 
                    "Authorization": "anonimous"
                }
            }
        
            const url = apiSpring.defaults.baseURL + "/api/v1/caseList/cerca/" + filtriRicerca.ricerca + "/" + filtriRicerca.tipologiaVendita + "/" + filtriRicerca.regione + "/" + filtriRicerca.provincia;
            
        
            const valoreFetch = fetch(url, configuration)
                .then(risposta => risposta.json())
                .then(immobiliList => { 
                    console.log("Risposta:\n", immobiliList); 
                    try {
                        const element = document.getElementsByTagName("main")[0];
                        console.log("Dopo main arrivato");
                        //ReactDOM.createRoot(element).render(<SectionImmobili immobiliCards={immobiliList}/>);
                        console.log(props);
                        props.onSearch(immobiliList);
                    } catch (error) {
                        console.log("Errore nel inserire dopo il fetch:\n" + error.toString());
                    }
                    return immobiliList
                })
                .catch(error => { console.error(error); });
                //console.log("ValoreFetch:\n" + valoreFetch);
                //console.log()
                
        } catch (error) {
            console.log("Errore Nel fetch");
        }
    }

    return (
        <div className="container-fluid bg-dark wow fadeIn" data-wow-delay="0.1s" style={{ padding: '35px' }}>
            <div className="container">
                <div className="row g-2">
                    <div className="col-md-10">
                        <div className="row g-2">
                            <div className="col-md-4">
                                <input type="text" className="form-control border-0 py-3" placeholder="Cerca..." style={{ color: 'black' }} id='testoRicerca' key={"testoRicerca"}/>
                            </div>
                            <div className="col-md-4">
                                <select className="form-select border-0 py-3" style={{ color: 'black' }} title='Cosa Cerchi?' id='tipoVendita'>
                                    <option hidden selected>Cosa cerchi?</option>
                                    <option value="asta">Asta</option>
                                    <option value="vendita">Vendita</option>
                                </select>
                            </div>
                            <div className="col-md-4" style={{overflow:"hidden"}}>
                                <select className="form-select border-0 py-3" style={{ color: 'black', overflow:"hidden"}} onChange={handleRegioneChange} id='regioneRicerca'>
                                    <option selected hidden>Regione</option>
                                    <Regioni/>
                                </select>
                            </div>
                            <Province selectedRegione={selectedRegione} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Link to={'/'}>
                            <button 
                                className="btn btn-primary border-0 w-100 py-3" 
                                id='searchButton'
                                onClick={handleSearch}
                            >Search</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
