import SectionImmobili from "../SectionImmobili/SectionImmibili";
import api from "../../api/axiosConfig"
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';

const SelledImmobili = (props) => {
    const [selling, setSelling] = useState(null);

    useEffect(() => {
        const fetchSelling = async () => {
          try {
            const risposta = await api.post("/api/v1/venditore/getting/venditore/selling/houses", {identificator: sessionStorage.getItem("identificator")});
            console.log("Immobili:", risposta.data);
            setSelling(risposta.data);
          } catch (errore) {
            console.log("Errore:", errore);
            props.onLoading(true);
          }
        };
      
        fetchSelling(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

    if (!selling) {
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
        return (<SectionImmobili immobiliCards={selling}/>)
    }
}

export default SelledImmobili