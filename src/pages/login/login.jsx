// Styles
import './login.css'

// Methos/modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/utilityFunctions";
import { loginService } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";

//React components
import { CInput } from "../../common/c-input/cInput";
import { CButton } from "../../common/c-button/cButton";
import { CText } from "../../common/c-text/cText";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { userData, login } from "../../app/slices/userSlice";


export const Login = () => {

    const navigate = useNavigate()
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

    const loginInput = async () => {
        try {
            const fetched = await loginService(loginData)

            if (!fetched.success) {
                throw new Error(fetched.message)
            }

            if (fetched.data) {
                const token = fetched.data
                const decodedToken = decodeToken(token[0])
                console.log(decodedToken);

                const passport = {
                    userToken: token,
                    userTokenData: decodedToken
                }
                dispatch(login({ credentials: passport }))
                setTimeout(() => {
                    navigate('/home')
                }, 1200);
            }
        } catch (error) {
            setLoginErrorMsg(error.message)
            setTimeout(() => {
                setLoginErrorMsg("")
            }, 1200);
        }
    }

    return (
        <div className="loginDesign">
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
            <CButton className={loginErrorMsg !== "" ? "CB-disabledButton" : ""} title={'button'} onClick={loginErrorMsg === "" ?() => loginInput() :null} />
            <CText className={'CT-errorText'} title={loginErrorMsg} />
        </div>
    )
}