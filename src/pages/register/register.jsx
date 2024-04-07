// Styles
import './register.css'

// Methos/modules
import { useState, useEffect } from "react";

//Redux

export const Register = () => {

    useEffect(() => {
        document.title = "Register";
    }, [])
    
    return (
        <div className="registerDesign">REGISTER</div>
    )
}