import './Hero.css'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'

const Hero = ({immobili}) => {
  return (
    <div className='immobili-carousel-container'>
        <Carousel>
            { immobili.map((immobile) =>{
                return(
                    <Paper>
                        <div className='immobile-card-container'>
                            <div className='immobile-card' style={{ '--img': `url(${immobile.immagini[0]})` }}>
                                <div className='immobile-detail'>
                                    <div className='immobile-immagine'>
                                        <img src={immobile.immagini[0]} alt={immobile.casa}/>
                                    </div>
                                    <Link to={`/detail/${immobile.idCasa}`} className='immobile-title' style={{textDecoration: 'none'}}>
                                        <div className='immobile-title'>
                                            <h4>{immobile.casa}</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Paper>
                )
            })
            }
        </Carousel>
    </div>
  )
}

export default Hero