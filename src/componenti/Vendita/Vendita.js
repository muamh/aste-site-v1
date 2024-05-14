import SectionImmobili from "../SectionImmobili/SectionImmibili";
import api from "../../api/axiosConfig"
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';

const Vendita = (props) => {
    const [vendita, setVendita] = useState(null);

    useEffect(() => {
        const fetchVendita = async () => {
          try {
            const risposta = await api.get("/api/v1/caseList/cerca/vendita");
            console.log("Immobili:", risposta.data);
            setVendita(risposta.data);
          } catch (errore) {
            console.log("Errore:", errore);
            props.onLoading(true);
          }
        };
      
        fetchVendita(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

    if (!vendita) {
        return (
            <div className='App' style={{color:"white",display: "flex" ,alignItems : "center", backgroundColor:"black", justifyContent:"space-around", flexDirection:"column"}}>
                <AtomicSpinner 
                    electronColorPalette={[ "#0081C9", "#5BC0F8", "#86E5FF", "#345b66"]}
                    nucleusParticleFillColor='#163219'
                    atomSize={475}
                    electronPathCount={4}
                />
                <div>caricamento...</div>
            </div>
        );
    } else{
        return (<SectionImmobili immobiliCards={vendita}/>)
    }
}

export default Vendita;