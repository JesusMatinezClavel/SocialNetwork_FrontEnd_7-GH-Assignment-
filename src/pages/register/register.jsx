// Styles
import './register.css'

// Methods/modules
import { useState, useEffect } from "react";
import { validate } from "../../utils/utilityFunctions";
import { registerService, uploadFileAvatar } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

//React components
import { CButton } from "../../common/c-button/cButton";
import { CInput } from "../../common/c-input/cInput";
import { CText } from "../../common/c-text/cText";
import { CCard } from "../../common/c-card/cCard";

//Redux

export const Register = () => {

    const navigate = useNavigate()

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

    const [avatar, setAvatar] = useState('../../img/default-ProfileImg.png');
    const [avatarUpload, setAvatarUpload] = useState(null);

    const [registerErrorMsg, setRegisterErrorMsg] = useState("")

    useEffect(() => {
        document.title = "Register";
    }, [])

    const inputHandler = (e) => {
        if (!e.target.files) {
            setRegisterData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        } else {
            const file = e.target.files[0]
            if (file) {
                setAvatarUpload(file)
                const reader = new FileReader()
                reader.onload = (event) => {
                    setAvatar(event.target.result)
                    setRegisterData((prevState) => ({
                        ...prevState,
                        profileImg: file.name
                    }));
                }
                reader.readAsDataURL(file)
            }
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

    const registerInput = async () => {
        try {
            if (registerData.profileImg !== "") {
                const uploadAvatar = await uploadFileAvatar(avatarUpload)
                if (!uploadAvatar.success) {
                    throw new Error(uploadAvatar.message)
                }
            }
            const fetched = await registerService(registerData)
            if (!fetched.success) {
                throw new Error(fetched.message)
            }
            setTimeout(() => {
                navigate('/login')
            }, 1200);
        } catch (error) {
            setRegisterErrorMsg(error.message)
            setTimeout(() => {
                setRegisterErrorMsg("")
            }, 2000);
        }
    }

    return (
        <div className="registerDesign">
            <CCard className={'cardRegister'}>
                <form
                    action="http://localhost:4000/api/files/upload"
                    encType="multipart/form-data"
                    method="post"
                >
                    <div className="registerImg">
                        <label
                            disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.profileImgError ? false : true}
                            htmlFor='photo'
                            className={'uploadPhotoInput'}
                            onChange={(e) => inputHandler(e)}
                            onBlur={(e) => checkError(e)}>
                            <img src={avatar} alt="default-profileImg" />
                        </label>
                        <CInput
                            disabled={registerErrorMsg === "" ? false : registerErrorMsg === registerDataError.profileImgError ? false : true}
                            className={'CI-LoginDesign fileInput'}
                            id={'photo'}
                            type={"file"}
                            name={"profileImg"}
                            value={""}
                            onChange={(e) => inputHandler(e)}
                            onBlur={(e) => checkError(e)}
                        />
                    </div>
                </form>
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
            <CButton className={registerErrorMsg !== "" ? "CB-disabledButton" : ""} title={'button'} onClick={registerErrorMsg === "" ? () => registerInput() : null} />
            <CText className={'CT-errorText'} title={registerErrorMsg} />
        </div>
    )
}