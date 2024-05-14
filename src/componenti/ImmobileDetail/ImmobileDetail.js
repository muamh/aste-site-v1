import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImmobileDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSave } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import api from "../../api/axiosConfig";
import { Link, useParams } from 'react-router-dom'; // Importa il hook useParams
import AtomicSpinner from 'atomic-spinner'
import { faHeart, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

const ImmobileDetail = (props) => {

  const [immobile, setImmobile] = useState(null);
  const [ctrlAstaDate, setCtrlAstaDate] = useState(false);
  const [ctrlAsta, setCtrlAsta] = useState(false);
  const [sellerPhone, setSellerPhone] = useState(null);
  const [liked, setLiked] = useState(null);
  const [saved, setSaved] = useState(null);
  var dateInizio = null;
  var dateFine = null;
  var oraInizio = null;
  var oraFine = null;
  const { casaid } = useParams();

  useEffect(() => {
    const fetchImmobile = async () => {
      try {
        console.log("\n\n\n\nCASA ID: \n" + casaid + "\n\n\n");
        const risposta = await api.get("/api/v1/caseList/" + casaid);
        console.log("Immobili:", risposta.data);
        dateInizio = new Date(risposta.data.ora_inizio.time).toLocaleDateString();
        dateFine = new Date(risposta.data.ora_fine.time).toLocaleDateString();
        oraInizio = new Date(risposta.data.ora_inizio.time).toLocaleTimeString();
        oraFine = new Date(risposta.data.ora_fine.time).toLocaleTimeString();
        setTimeout(() => props.onLoading(false), 1500);
        setImmobile(risposta.data);
        var todayDay = new Date().toDateString();
        var todayHour = new Date().getTime();
        if (risposta.data.tipo_vendita === "asta") {
          setCtrlAsta(true);
        }else{
          setCtrlAsta(false);
        }
        if (ctrlAsta) {
          if(todayDay > dateInizio && todayDay < dateFine){
            setCtrlAstaDate(true);
          } else{
            setCtrlAstaDate(false);
          }
          if (!ctrlAstaDate && (todayDay === dateInizio) && oraInizio <= todayHour ) {
            setCtrlAstaDate(true);
          } else{
            setCtrlAstaDate(false);
          }
          if (!ctrlAstaDate && (todayDay === dateFine) && oraFine >= todayHour ) {
            setCtrlAstaDate(true);
          } else{
            setCtrlAstaDate(false);
          }
        }

        const response = await api.post("/api/v1/venditore/getter/venditore/email/based/on/id",{ identificator : risposta.data.sellerId});
        console.log("venditore email:", response.data);
        setTimeout(() => props.onLoading(false), 1500);
        setSellerPhone(response.data);
        if (sessionStorage.getItem("identificator") && sessionStorage.getItem("roleOfIdentificator") !== sessionStorage.getItem("identificator")) {
          const likingResp = await api.post("/api/v1/users/single/user/ctrl/if/house/is/liked", { identificator: sessionStorage.getItem("identificator"), casaId: casaid});
          console.log("likato" + "\n");
          console.log(likingResp);
          console.log(likingResp.data);
          setLiked(likingResp.data);
          const savedResp = await api.post("/api/v1/users/single/user/ctrl/if/house/is/saved", { identificator: sessionStorage.getItem("identificator"), casaId: casaid});
          console.log("salvato" + savedResp.data);
          setSaved(savedResp.data);
        }
      } catch (errore) {
        console.log("Errore:", errore);
        props.onLoading(true);
      }
    };
  
    fetchImmobile(); // Chiamata alla funzione per ottenere gli immobili
  }, []);
  
  console.log(ctrlAstaDate);

  

  const handleLikingButton = async() => {
    const likedResp = await api.post("/api/v1/users/single/user/change/if/house/is/liked", { check: liked,identificator: sessionStorage.getItem("identificator"), casaId: casaid});
    console.log("salvato" + likedResp.data);
    if (likedResp.data) {
      setLiked(((liked) ? (false) : (true)));
    }
  }

  const handleSavedButton = async() => {
    const savedResp = await api.post("/api/v1/users/single/user/change/if/house/is/saved", { check: saved,identificator: sessionStorage.getItem("identificator"), casaId: casaid});
    console.log("salvato" + savedResp.data);
    if (savedResp.data) {
      setSaved(((saved) ? (false) : (true)));
    }
  }


  const [mainImageIndex, setMainImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const handelImgSuccessiva = () => {
    const nextIndex = (mainImageIndex + 1) % immobile.immagini.length;
    setMainImageIndex(nextIndex);
  };

  const handelImgPrecedente = () => {
    const prevIndex = (mainImageIndex - 1 + immobile.immagini.length) % immobile.immagini.length;
    setMainImageIndex(prevIndex);
  };

  const handlePuntataAsta = () => {
    const prezzoIniziale = immobile.prezzo;
    const prezzoPersonale = puntata.value;
    console.log("prezzo iniziale: " + prezzoIniziale);
    console.log("prezzo puntata: " + prezzoPersonale);
    if (!prezzoPersonale) {
      alert("La casella dell'offerta non può essere vuota!");
    }else{
      if (prezzoIniziale >= prezzoPersonale) {
        alert("La puntata deve superare il valore del prezzo attuale!");
      }
      else{
        api.post("/api/v1/caseList/authorized/puntata/of/house", {casaId: casaid, puntata : prezzoPersonale.toString()}).then(response => alert(response.data)).then(window.location.reload());
        
      }
    }
  }

  const handleClickPuntataAsta = () => {
    alert("Devi eseguire l'accesso prima di potere fare una puntata")
  }

  if (!immobile) {
    return (
      <div style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
        <AtomicSpinner 
              electronColorPalette={[ "#0081C9", "#5BC0F8", "#86E5FF", "#345b66"]}
              nucleusParticleFillColor='#163219'
              atomSize={475}
              electronPathCount={4}
        />
      </div>
    );
  } else{
    return (
      <div className='container-fluid  wow fadeIn justify-content-center'  style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
        <div className="container row g-2 justify-content-center" >
          <div className="col-md-5 contenitoreProduct  justify-content-center  mx-auto">
            <div className='caroselloProdotto ' style={{display: 'flex', justifyContent: 'center'}}>
              <button onClick={handelImgPrecedente} className="nav-button p-2" style={{ opacity: 0.5, fontSize: '18px' }}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img src={immobile.immagini[mainImageIndex]} alt="Immagine principale" className='product-immagine' />
              <button onClick={handelImgSuccessiva} className="nav-button p-2" style={{ opacity: 0.5, fontSize: '18px' }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <Slider {...settings} style={{ marginTop: '20px', marginBottom: '20px' }}>
              {immobile.immagini.map((image, index) => (
                <div key={index} onClick={() => setMainImageIndex(index)} style={{ cursor: 'pointer' }} >
                  <img src={image} alt={`Immagine ${index + 1}`} className='immagineLista'/>
                </div>
              ))}
            </Slider>
          </div>
          {(ctrlAsta)
          ?
          (
            (sessionStorage.getItem("identificator")) 
            ? 
            (
              (sessionStorage.getItem("identificator") === sessionStorage.getItem("roleOfIdentificator"))
              ?
              (
                <div className='descrizione col-md-5 text-uppercase mx-auto' style={{ color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: '20px', backgroundColor: '#333', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <h1 style={{ color: '#66CCFF', marginBottom: '10px', fontSize: '30px', fontWeight:'bolder' }}><strong>{immobile.casa}</strong></h1>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Descrizione: {immobile.descrizione}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Prezzo attuale: {immobile.prezzo} €</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Regione: {immobile.regione}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Provincia: {immobile.provincia}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Data inizio Asta: {new Date(immobile.ora_inizio.time).toLocaleDateString()}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Ora inizio Asta: {new Date(immobile.ora_inizio.time).toLocaleTimeString()}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Data fine Asta: {new Date(immobile.ora_fine.time).toLocaleDateString()}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Ora fine Asta: {new Date(immobile.ora_fine.time).toLocaleTimeString()}</p>
                  <div style={{marginBottom: '10px', fontSize: '18px'}}>
                    <div className="">
                      <input type='number' className='form-select border-o py-3' style={{color: 'black'}} title={immobile.prezzo} id='puntata' min={immobile.prezzo} defaultValue={immobile.prezzo}/>
                    </div>  
                  </div> 
                  <div style={{marginBottom: '10px', fontSize: '18px'}}>
                    <div className="">
                      <button 
                        className="btn btn-primary border-0 w-100 py-3" 
                        id='searchButton'
                        onClick={handlePuntataAsta}>Fai la tua puntata
                      </button>
                    </div>  
                  </div>  
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Contatta venditore: <a href={"mailto:" + sellerPhone}>{sellerPhone}</a></p>
                  {/* Aggiungi altre informazioni necessarie qui */}
                </div>
              )
              :
              (
                <div className='descrizione col-md-5 text-uppercase mx-auto' style={{ color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: '20px', backgroundColor: '#333', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <h1 style={{ color: '#66CCFF', marginBottom: '10px', fontSize: '30px', fontWeight:'bolder' }}><strong>{immobile.casa}</strong></h1>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Descrizione: {immobile.descrizione}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Prezzo attuale: {immobile.prezzo} €</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Regione: {immobile.regione}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Provincia: {immobile.provincia}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Data inizio Asta: {new Date(immobile.ora_inizio.time).toLocaleDateString()}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Ora inizio Asta: {new Date(immobile.ora_inizio.time).toLocaleTimeString()}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Data fine Asta: {new Date(immobile.ora_fine.time).toLocaleDateString()}</p>
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Ora fine Asta: {new Date(immobile.ora_fine.time).toLocaleTimeString()}</p>
                  <div style={{marginBottom: '10px', fontSize: '18px'}}>
                    <div className="">
                      <input type='number' className='form-select border-o py-3' style={{color: 'black'}} title={immobile.prezzo} id='puntata' min={immobile.prezzo} defaultValue={immobile.prezzo}/>
                    </div>  
                  </div> 
                  <div style={{marginBottom: '10px', fontSize: '18px'}}>
                    <div className="">
                      <button 
                        className="btn btn-primary border-0 w-100 py-3" 
                        id='searchButton'
                        onClick={handlePuntataAsta}>Fai la tua puntata
                      </button>
                    </div>  
                  </div>  
                  <p style={{ marginBottom: '10px', fontSize: '18px' }}>Contatta venditore: <a href={"mailto:" + sellerPhone}>{sellerPhone}</a></p>
                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: '' , fontSize:'30px'}}>
                    {(liked) ? (<FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer', marginRight: '35px', color:'red'}} onClick={handleLikingButton} />) : (<FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer', marginRight: '35px' }} onClick={handleLikingButton} />)}
                    {(saved) ? (<FontAwesomeIcon icon={faSave} style={{ cursor: 'pointer', color:'yellow' }} onClick={handleSavedButton} />) : (<FontAwesomeIcon icon={faSave} style={{ cursor: 'pointer' }} onClick={handleSavedButton} />)}
                  </div>
                  {/* Aggiungi altre informazioni necessarie qui */}
                </div>
              )
            ) 
            : 
            (
              <div className='descrizione col-md-5 text-uppercase mx-auto' style={{ color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: '20px', backgroundColor: '#333', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ color: '#66CCFF', marginBottom: '10px', fontSize: '30px', fontWeight:'bolder' }}><strong>{immobile.casa}</strong></h1>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Descrizione: {immobile.descrizione}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Prezzo attuale: {immobile.prezzo} €</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Regione: {immobile.regione}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Provincia: {immobile.provincia}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Data inizio Asta: {new Date(immobile.ora_inizio.time).toLocaleDateString()}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Ora inizio Asta: {new Date(immobile.ora_inizio.time).toLocaleTimeString()}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Data fine Asta: {new Date(immobile.ora_fine.time).toLocaleDateString()}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Ora fine Asta: {new Date(immobile.ora_fine.time).toLocaleTimeString()}</p>
                <div style={{marginBottom: '10px', fontSize: '18px'}}>
                  <div className="">
                    <input type='number' className='form-select border-o py-3' style={{color: 'black'}} title={immobile.prezzo} id='puntata' min={immobile.prezzo} defaultValue={immobile.prezzo}/>
                  </div>  
                </div> 
                <div style={{marginBottom: '10px', fontSize: '18px'}}>
                  <Link className="" style={{textDecoration: 'none'} } to={"/login"}>
                    <button 
                      className="btn btn-primary border-0 w-100 py-3" 
                      id='searchButton'
                      onClick={handleClickPuntataAsta}>Fai la tua puntata
                    </button>
                  </Link>  
                </div> 
            <p style={{ marginBottom: '10px', fontSize: '18px' }}>Contatta venditore: <a href={"mailto:" + sellerPhone}>{sellerPhone}</a></p> 
                {/* Aggiungi altre informazioni necessarie qui */}
              </div>
            )
          )
          :
          (
            (sessionStorage.getItem("identificator")) ? 
            (
              <div className='descrizione col-md-5 text-uppercase mx-auto' style={{ color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: '20px', backgroundColor: '#333', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ color: '#66CCFF', marginBottom: '10px', fontSize: '30px', fontWeight:'bolder' }}><strong>{immobile.casa}</strong></h1>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Descrizione: {immobile.descrizione}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Prezzo: {immobile.prezzo} €</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Regione: {immobile.regione}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Provincia: {immobile.provincia}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Contatta venditore: <a href={"mailto:" + sellerPhone}>{sellerPhone}</a></p>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: '' , fontSize:'30px'}}>
                  {(liked) ? (<FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer', marginRight: '35px', color:'red'}} onClick={handleLikingButton} />) : (<FontAwesomeIcon icon={faHeart} style={{ cursor: 'pointer', marginRight: '35px' }} onClick={handleLikingButton} />)}
                  {(saved) ? (<FontAwesomeIcon icon={faSave} style={{ cursor: 'pointer', color:'yellow' }} onClick={handleSavedButton} />) : (<FontAwesomeIcon icon={faSave} style={{ cursor: 'pointer' }} onClick={handleSavedButton} />)}
                </div>
                {/* Aggiungi altre informazioni necessarie qui */}
              </div>
            ) : (
              <div className='descrizione col-md-5 text-uppercase mx-auto' style={{ color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: '20px', backgroundColor: '#333', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ color: '#66CCFF', marginBottom: '10px', fontSize: '30px', fontWeight:'bolder' }}><strong>{immobile.casa}</strong></h1>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Descrizione: {immobile.descrizione}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Prezzo: {immobile.prezzo} €</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Regione: {immobile.regione}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Provincia: {immobile.provincia}</p>
                <p style={{ marginBottom: '10px', fontSize: '18px' }}>Contatta venditore: <a href={"mailto:" + sellerPhone}>{sellerPhone}</a></p>
                
                {/* Aggiungi altre informazioni necessarie qui */}
              </div>
            )
          )}

        </div>
      </div>
    );
  }
}

export default ImmobileDetail;
