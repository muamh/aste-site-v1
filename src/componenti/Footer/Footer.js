import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="container-fluid bg-dark text-white-50 pt-5" style={{bottom: '0px'}}>
            <div className="container py-5">
                <div className="row g-5">
                    <FooterSection
                        title="Contattaci"
                        items={[
                            { icon: 'fa fa-map-marker-alt', text: 'Via Galileo Galilei, 1, 25017 Lonato BS' },
                            { icon: 'fa fa-phone-alt', phone: '+39 030 991 3355' },
                            { icon: 'fa fa-envelope', email: 'mumah@estate.com' }
                        ]}
                    />
                    <FooterSection
                        title="Links"
                        items={[
                            { text: <Link to={`/contacts`} style={{textDecoration: 'none', color: 'inherit'}}>Contattaci</Link>}
                        ]}
                    />
                    <FooterSection
                        title="socials"
                        socials={[
                            'facebook',
                            'instagram',
                            'twitter-x',
                            'youtube'
                        ]}
                    />
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 mt-1">
                            &copy; <a className="text-white" href="#">Mumah Estate</a>, Tutti i diritti riservati.
                            <br />
                            Disegnata da <a className="text-white" href="https://htmlcodex.com">HUSM</a>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <button className="btn btn-link text-white-50 me-2">Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const FooterSection = ({ title, items, socials }) => {
    return (
        <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">{title}</h5>
            {items && (
                <ul className="list-unstyled mb-2">
                    {items.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item.icon && <i className={`${item.icon} me-3`}></i>}
                            {item.email ? (
                                <a href={`mailto:${item.email}`} className="text-white-50">{item.email}</a>
                            ) : (
                                item.phone ? (
                                    <a href={`tel:${item.phone}`} className="text-white-50">{item.phone}</a>
                                ) : (
                                    item.link ? (
                                        <a href={item.link} className="text-white-50">{item.text}</a>
                                    ) : (
                                        <span className="text-white-50">{item.text}</span>
                                    )
                                ))
                            }
                        </li>
                    ))}
                </ul>
            )}
            {socials && (
                <div className="row g-2 pt-2">
                    {socials.map((social) => (
                        <div key={social} className="col-5">
                            {/* facebook, instagram, twitter-x, youtube*/}
                            <i className={`bi bi-${social}`}/>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    );
}

export default Footer;
