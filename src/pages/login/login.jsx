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
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";


export const Login = () => {

    const dispatch = useDispatch()
    const rdxUser = useSelector(userData)

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [loginDataError, setLoginDataError] = useState({
        emailError: "",
        passwordError: ""
    })

    const [loginErrorMsg, setLoginErrorMsg] = useState("")

    useEffect(() => {
        document.title = "Login";
    }, [])


    const inputHandler = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        if (e.target.value === "") {
            setLoginErrorMsg("")
        }
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
            {/* <CInput
                disabled={loginErrorMsg === "" ? false : loginErrorMsg === loginDataError.nickNameError ? false : true}
                className={'CI-LoginDesign'}
                type={"text"}
                name={"nickName"}
                value={loginData.nickName || ""}
                placeholder={"input your nickname"}
                onChange={(e) => inputHandler(e)}
                onBlur={(e) => checkError(e)}
            /> */}
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
            {/* <CInput
                disabled={loginErrorMsg === "" ? false : loginErrorMsg === loginDataError.birthDateError ? false : true}
                className={'CI-LoginDesign'}
                type={"date"}
                name={"birthDate"}
                value={loginData.birthDate || ""}
                placeholder={"input your birthdate"}
                onChange={(e) => inputHandler(e)}
                onBlur={(e) => checkError(e)}
            /> */}
            <CInput
                disabled={loginErrorMsg === "" ? false : loginErrorMsg === loginDataError.passwordError ? false : true}
                className={'CI-LoginDesign'}
                type={"password"}
                name={"password"}
                value={loginData.password || ""}
                placeholder={"input your password"}
                onChange={(e) => inputHandler(e)}
                onBlur={(e) => checkError(e)}
            />
            <CButton className={loginErrorMsg !== "" ? "CB-disabledButton" : ""} title={'button'} />
            <CText className={'CT-errorText'} title={loginErrorMsg} />
        </div>
    )
}