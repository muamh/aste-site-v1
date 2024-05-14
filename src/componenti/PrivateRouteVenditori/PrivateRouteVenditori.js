import React, { useEffect } from 'react';
import { Route, Navigate, Routes , useNavigate} from 'react-router-dom';
import PersonalArea from '../PersonalArea/PersonalArea';

function PrivateRouteVenditori({ element: Element, ...rest }) {
const uid = sessionStorage.getItem("identificator");
const uJob = sessionStorage.getItem("roleOfIdentificator");
  const navigate = useNavigate();

  useEffect(() => {
    if (uid === null || uJob === null) {
      navigate("/login");
    }
  }, [uid, uJob, navigate]);

    if (uid !== null && uJob !== null && uJob == uid) {
        return(
            <Element {...rest} />
        );
    }
}

export default PrivateRouteVenditori;
