import './navigator.css'

import { useNavigate } from "react-router-dom";

export const Navigator = ({ className, title, destination }) => {

    const navigate = useNavigate()

    const combinedClasses = `navigatorDesign ${className || ""}`

    return (
        <div className={combinedClasses} onClick={()=>navigate(destination)}>{title}</div>
    )
}