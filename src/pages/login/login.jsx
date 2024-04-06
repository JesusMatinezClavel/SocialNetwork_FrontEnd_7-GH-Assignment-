// Styles
import './login.css'

// Methos/modules
import { useState, useEffect } from "react";

//React components
import { CInput } from "../../common/c-input/cInput";
import { CButton } from "../../common/c-button/cButton";
//Redux


export const Login = () => {

    const [loginData, setLoginData] = useState({
        nickName: "",
        email: "",
        birthDate: "",
        password: ""
    })

    const inputHandler = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="loginDesign">
            <CInput
                className={'CI-LoginDesign'}
                type={"text"}
                name={"nickName"}
                value={loginData.nickName || ""}
                placeholder={"input your nickname"}
            />
            <CButton title={'button'} />
        </div>
    )
}