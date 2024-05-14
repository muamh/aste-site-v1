import React, { useEffect } from 'react';
import { Route, Navigate, Routes , useNavigate} from 'react-router-dom';
import PersonalArea from '../PersonalArea/PersonalArea';

function PrivateRoute({ element: Element, ...rest }) {
  const uid = sessionStorage.getItem("identificator");
  const navigate = useNavigate();

  useEffect(() => {
    if (uid === null) {
      navigate("/login");
    }
  }, [uid, navigate]);

    if (uid !== null) {
        return(
            <Element {...rest} />
        );
    }
}

export default PrivateRoute;
