// Styles
import './login.css'

// Methos/modules
import { useState, useEffect } from "react";
import { validate } from "../../utils/utilityFunctions";

//React components
import { CInput } from "../../common/c-input/cInput";
import { CButton } from "../../common/c-button/cButton";
import { CText } from "../../common/c-text/cText";
//Redux


export const Login = () => {

    const [loginData, setLoginData] = useState({
        nickName: "",
        email: "",
        birthDate: "",
        password: ""
    })

    const [loginDataError, setLoginDataError] = useState({
        nickNameError: "",
        emailError: "",
        birthDateError: "",
        passwordError: ""
    })

    const [loginErrorMsg, setLoginErrorMsg] = useState("")

    const inputHandler = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {

        const validData = validate(e.target.name, e.target.value)

        setLoginDataError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: validData
        }))
    }

    useEffect(() => {
        for (let element in loginDataError) {
            if (loginDataError[element] !== "") {
                setLoginErrorMsg(loginDataError[element])
                break
            }
        }
        const allErrorsCleared = Object.values(loginDataError).every(value => value === "");
        if (allErrorsCleared) {
            setLoginErrorMsg("")
        }
    }, [loginDataError])

    return (
        <div className="loginDesign">
            <CInput
                disabled={loginErrorMsg === "" ? false : loginErrorMsg === loginDataError.nickNameError ? false : true}
                className={'CI-LoginDesign'}
                type={"text"}
                name={"nickName"}
                value={loginData.nickName || ""}
                placeholder={"input your nickname"}
                onChange={(e) => inputHandler(e)}
                onBlur={(e) => checkError(e)}
            />
            <CInput
                disabled={loginErrorMsg === "" ? false : loginErrorMsg === loginDataError.emailError ? false : true}
                className={'CI-LoginDesign'}
                type={"email"}
                name={"email"}
                value={loginData.email || ""}
                placeholder={"input your email"}
                onChange={(e) => inputHandler(e)}
                onBlur={(e) => checkError(e)}
            />
            <CButton title={'button'} />
            <CText className={'errorText'} title={loginErrorMsg} />
        </div>
    )
}