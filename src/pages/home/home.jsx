// Styles
import './home.css'

// Methos/modules
import { useState, useEffect } from "react";

//React components

//Redux


export const Home = ()=>{

    useEffect(() => {
        document.title = "Home";
    }, [])
    return(
        <div className="homeDesign">HOME</div>
    )
}