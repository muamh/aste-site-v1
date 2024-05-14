import Hero from '../Hero/Hero'
import SectionImmobili from '../SectionImmobili/SectionImmibili'

const Home = ({immobili, immobiliCards}) => {
  return (
    <div>
        <Hero immobili={immobili}/>
        <SectionImmobili immobiliCards={immobiliCards}/>
    </div>
  )
}

export default Home