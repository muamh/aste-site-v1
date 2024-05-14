import React from 'react';
import { Link } from 'react-router-dom'
import api from "../../api/axiosConfig"
import { useState, useEffect } from 'react';
import './SectionImmobile.css'

const ImmobileCard = ({ immobile }) => {
    return (
        <div className="col-lg-3 col-md-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="property-item rounded overflow-hidden border-top border-end">
                <div className="position-relative overflow-hidden"  style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
                <Link to={`/detail/${immobile.idCasa}`} className='immobile-title' style={{textDecoration: 'none', margin: '0%!important'}}><img className="img-fluid" src={immobile.immagini[0]} alt="" /></Link>
                    <div className="bg-white rounded text-black position-absolute start-0 top-0 m-4 py-1 px-3">{immobile.tipologia[0]}</div>
                    <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{immobile.tipologia[1]}</div>
                </div>
                <div className="p-4 pb-0">
                    <h5 className="text mb-3" >{immobile.prezzo} €</h5>
                    <Link to={`/detail/${immobile.idCasa}`} className='immobile-title' style={{textDecoration: 'none'}}>{immobile.casa}</Link>
                    <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{immobile.indirizzo}</p>
                </div>
            </div>
        </div>
    );
};
    

    
const ImmobileCardGroup = ({immobiliCards}) => {    
    // Verifica se immobili è null prima di mappare
    if (!immobiliCards) {
        return null; // Se immobili è null, restituisci null
    }
    
    console.log("immobili dentro ImmobileCardGroup:\n" +  JSON.stringify(immobiliCards))
    if (!immobiliCards) {
        return(<div>NESSUN IMMOBILE TROVATO</div>)
    }
    return (
        immobiliCards.map((immobile) => {
            console.log("Entro");
            console.log("entrato" + JSON.stringify(immobile));
            return (<ImmobileCard immobile={immobile} />);
        })
        
    );
};


const SectionImmobili = ({immobiliCards}) => {
    return (
        <div className="tab-content m-5 ">
            <div id="tab-1" className="tab-pane fade show p-1 active" >
                <div className="row g-4" >
                    <ImmobileCardGroup immobiliCards={immobiliCards}/>
                </div>
            </div>
        </div>
    );
};

export default SectionImmobili;
