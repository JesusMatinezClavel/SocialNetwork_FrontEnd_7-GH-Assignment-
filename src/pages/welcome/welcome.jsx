import './welcome.css'

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Welcome = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Welcome!`
    },[])
    return (
        <div className="welcomeDesign">
            <img src="../../../img/titlebigger.png" alt="welcome logo" />
            <div className="registerlink" onClick={() => navigate('/register')}>
                <img src='../../../img/logobigger.png' />
            </div>
        </div>
    )
}