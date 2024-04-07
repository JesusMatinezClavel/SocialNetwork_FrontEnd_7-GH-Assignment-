// Styles
import './register.css'

// Methods/modules
import { useState, useEffect } from "react";
import { validate } from "../../utils/utilityFunctions";
import { registerService } from "../../services/apiCalls";

//React components
import { CButton } from "../../common/c-button/cButton";
import { CInput } from "../../common/c-input/cInput";
import { CText } from "../../common/c-text/cText";
import { CCard } from "../../common/c-card/cCard";

//Redux

export const Register = () => {

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        nickName: "",
        profileImg: "",
        bio: "",
        birthDate: "",
        email: "",
        passwordBody: ""
    })

    const [registerDataError, setRegisterDataError] = useState({
        firstNameError: "",
        lastNameError: "",
        nickNameError: "",
        profileImgError: "",
        bioError: "",
        birthDateError: "",
        emailError: "",
        passwordBodyError: ""
    })

    const [registerErrorMsg, setRegisterErrorMsg] = useState("")

    useEffect(() => {
        document.title = "Register";
    }, [])

    const inputHandler = (e) => {
        setRegisterData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        if (e.target.value === "") {
            setRegisterErrorMsg("")
        }
    }

    const checkError = (e) => {

        const valid = validate(e.target.name, e.target.value)

        setRegisterDataError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: valid
        }))
    }

    useEffect(() => {
        for (let element in registerDataError) {
            if (registerDataError[element] !== "") {
                setRegisterErrorMsg(registerDataError[element])
                break
            }
        }
        const allErrorsCleared = Object.values(registerDataError).every(value => value === "");
        if (allErrorsCleared) {
            setRegisterErrorMsg("")
        }
    }, [registerDataError])

    const selectFileButton = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="registerDesign">
            <CCard className={'cardRegister'}>
                <div className="registerImg">
                    <CInput
                        disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.profileImgError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"file"}
                        style={{display: 'none'}}
                        name={"profileImg"}
                        value={registerData.profileImg || ""}
                        placeholder={"Select your profile picture"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                    <CButton title={'Select File'} onClick={()=>selectFileButton()}/>
                </div>
                <div className="registerText">
                    <CInput
                        disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.firstNameError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"text"}
                        name={"firstName"}
                        value={registerData.firstName || ""}
                        placeholder={"input your first name"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                    <CInput
                        disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.lastNameError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"text"}
                        name={"lastName"}
                        value={registerData.lastName || ""}
                        placeholder={"input your last name"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                    <CInput
                        disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.nickNameError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"text"}
                        name={"nickName"}
                        value={registerData.nickName || ""}
                        placeholder={"input your nickname"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                    <CInput
                        disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.emailError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"email"}
                        name={"email"}
                        value={registerData.email || ""}
                        placeholder={"input your email"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                    <CInput
                        disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.birthDateError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"date"}
                        name={"birthDate"}
                        value={registerData.birthDate || ""}
                        placeholder={"input your birthdate"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                    <CInput
                        disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.passwordBodyError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"password"}
                        name={"passwordBody"}
                        value={registerData.passwordBody || ""}
                        placeholder={"input your password"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                </div>
            </CCard>
            <CButton className={registerErrorMsg !== "" ? "CB-disabledButton" : ""} title={'button'} />
            <CText className={'CT-errorText'} title={registerErrorMsg} />
        </div>
    )
}