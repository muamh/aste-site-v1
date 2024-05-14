import './App.css';
import api from "./api/axiosConfig"
import { useState, useEffect } from 'react';
import Layout from './componenti/Layout';
import {Routes, Route, redirect } from 'react-router-dom';
import Home from './componenti/home/Home';
import Navbar from './componenti/Navbar/Navbar';
import AtomicSpinner from 'atomic-spinner'
import Footer from './componenti/Footer/Footer';
import SearchBar from './componenti/SearchBar/SearchBar';
import ImmobileDetail from './componenti/ImmobileDetail/ImmobileDetail'
import Login from './componenti/Login/Login';
import Aste from './componenti/Aste/Aste';
import Vendita from './componenti/Vendita/Vendita';
import PersonalArea from './componenti/PersonalArea/PersonalArea';
import PrivateRoute from './componenti/PrivateRoute/PrivateRoute';
import LikedImmobili from './componenti/LikedImmobili/LikedImmobili';
import SavedImmobili from './componenti/SavedImmobili/SavedImmobili';
import PrivateRouteVenditori from './componenti/PrivateRouteVenditori/PrivateRouteVenditori';
import PersonalAreaVenditore from './componenti/PersonalArea/PersonalAreaVenditore';
import AddCasa from './componenti/AddCasa/AddCasa';
import Registration from './componenti/Registration/Registration';
import SelledImmobili from './componenti/SelledImmobili/SelledImmobili';
import Contacts from './componenti/Contacts/Contacts'


function App() {

  const [immobili, setImmobili] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Inizializza isLoading come true
  const [immobiliCards, setImmobiliCards] = useState(null);

  useEffect(() => {
    const fetchImmobili = async () => {
      try {
        const risposta = await api.get("/api/v1/caseList/firstCase");
        console.log("Immobili:", risposta.data);
        setImmobili(risposta.data);
        setTimeout(() => setIsLoading(false), 1500); // Imposta isLoading su false dopo 1.5 secondi
      } catch (errore) {
        console.log("Errore:", errore);
        setIsLoading(true); // Imposta isLoading su false in caso di errore
      }
    }

    fetchImmobili(); // Chiamata alla funzione per ottenere gli immobili
  }, []);


  useEffect(() => {
    const fetchImmobiliCards = async () => {
      setIsLoading(true);
        try {
            const risposta = await api.get("/api/v1/caseList/lastCase");
            console.log("Immobili Listati:", risposta.data);
            setImmobiliCards(risposta.data);
            setTimeout(() => setIsLoading(false),1500);
        } catch (errore) {
            setIsLoading(true);
            console.log("Errore Listato:", errore);
        }
    };

    fetchImmobiliCards();
  }, []);

  // Se isLoading è true, mostra un messaggio di caricamento
  if (isLoading) {
    return (
      <div className='App' style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
        <Routes>
          <Route path='/' element={<AtomicSpinner 
              electronColorPalette={[ "#0081C9", "#5BC0F8", "#86E5FF", "#345b66"]}
              nucleusParticleFillColor='#163219'
              atomSize={475}
              electronPathCount={4}
            />}
          />
        </Routes>
        <div>caricamento...</div>
      </div>
    );
  }

  const printProps = (e) => {
    setImmobiliCards(e);
  }
  
  

  const ctrlLoading = (e) => {
    setIsLoading(e);
  }
  return (
    <div className="App">
      <Navbar/>
      <SearchBar onSearch={printProps}/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home immobili={immobili} immobiliCards={immobiliCards}/>} />
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path='/detail/:casaid' element={<ImmobileDetail onLoading={ctrlLoading}/>}/>
          <Route path='/asta' element={<Aste onLoading={ctrlLoading}/>}/>
          <Route path='/vendita' element={<Vendita onLoading={ctrlLoading}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path="/personal/area" element={<PrivateRoute element={PersonalArea} onLoading={ctrlLoading} />} />
          <Route path="/personal/area/liked" element={<PrivateRoute element={LikedImmobili} onLoading={ctrlLoading} />} />
          <Route path="/personal/area/saved" element={<PrivateRoute element={SavedImmobili } onLoading={ctrlLoading}/>}/>
          <Route path='/venditore/personal/area' element={<PrivateRouteVenditori element={PersonalAreaVenditore} onLoading={ctrlLoading}/>}/>
          <Route path='/venditore/personal/add/casa/area' element={<PrivateRouteVenditori element={AddCasa} onLoading={ctrlLoading}/>}/>
          <Route path='/venditore/personal/posted/casa/area' element={<PrivateRouteVenditori element={SelledImmobili} onLoading={ctrlLoading}/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
