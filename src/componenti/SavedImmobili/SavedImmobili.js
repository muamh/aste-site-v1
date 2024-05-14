import SectionImmobili from "../SectionImmobili/SectionImmibili";
import api from "../../api/axiosConfig"
import AtomicSpinner from 'atomic-spinner'
import { useState, useEffect } from 'react';

const SavedImmobili = (props) => {
    const [aste, setAste] = useState(null);

    useEffect(() => {
        const fetchAste = async () => {
          try {
            const risposta = await api.post("/api/v1/users/getting/user/saved/houses", {identificator: sessionStorage.getItem("identificator")});
            console.log("Immobili:", risposta.data);
            setAste(risposta.data);
          } catch (errore) {
            console.log("Errore:", errore);
            props.onLoading(true);
          }
        };
      
        fetchAste(); // Chiamata alla funzione per ottenere gli immobili
      }, []);

    if (!aste) {
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
        return (<SectionImmobili immobiliCards={aste}/>)
    }
}

export default SavedImmobili