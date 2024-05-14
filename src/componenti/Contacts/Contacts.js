import React from 'react'
import "./Contacts.css"

const Contacts = () => {
  return (
    <div id='contenitoreContatti'>
        <h1>Contatti</h1>

        <h2>Informazioni di Contatto</h2>
        <p><strong>Email:</strong> <a href="mailto:mumah@estate.com">mumah@estate.com</a></p>
        <p><strong>Telefono:</strong> <a href="tel:+390309913355">+39 030 991 3355</a></p>

        <h2>Orari di Ufficio</h2>
        <p>Siamo aperti dal lunedì al venerdì, dalle ore 9:00 alle ore 18:00.</p>

        <h2>Descrizione dell'Idea/Progetto</h2>
        <p>Benvenuto in Mumah Estate, la piattaforma che rivoluziona il modo in cui le persone interagiscono con il mercato immobiliare. La nostra missione è semplificare il processo di ricerca, acquisto e vendita di proprietà, offrendo un'esperienza utente coinvolgente e soddisfacente.</p>

        <h2>Motto</h2>
        <p>Il nostro motto, "<em>OPTIO IDONEA QUARENTIBUS VIRTUTEM</em>", significa "Scelta adeguata per virtù". Abbiamo scelto questo motto perché crediamo fermamente che la nostra piattaforma offra agli utenti la possibilità di fare scelte informate e consapevoli, guidate dalla virtù della trasparenza, dell'integrità e della fiducia.</p>

        <h2>Motivo per cui hai scelto Mumah Estate</h2>
        <p>Hai scelto Mumah Estate perché crediamo che tu meriti di avere accesso a uno strumento che ti renda il processo di ricerca, acquisto e vendita di proprietà immobiliari più accessibile, conveniente e sicuro. Siamo qui per guidarti attraverso ogni fase del processo, garantendo facilità d'uso, trasparenza e sicurezza in ogni momento.</p>

        <h2>Mappa</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.3860010083226!2d10.478757976160125!3d45.462027671073926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478196f520f9b5b7%3A0x71096a192f15ffae!2sIstituto%20di%20Istruzione%20Superiore%20Luigi%20Cerebotani!5e0!3m2!1sit!2sit!4v1713710892932!5m2!1sit!2sit" height="450" style={{border: "0", width: '80vw'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

    </div>
  )
}

export default Contacts