//Styles
import './details.css'

//Methods/Modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageSquareText, UserRoundCheck, UserCheck, SquareArrowOutUpRight } from "lucide-react";
import { validate } from "../../utils/utilityFunctions";



//React Components
import { CText } from "../../common/c-text/cText";
import { CCard } from "../../common/c-card/cCard";
import { CInput } from "../../common/c-input/cInput";
import { CButton } from "../../common/c-button/cButton";

//Redux
import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailSlice";
import { userData } from "../../app/slices/userSlice";
import { addRemoveLikeService, getFileAvatar, getFilePost, updateOwnProfileService, uploadFileAvatar } from '../../services/apiCalls';


export const Details = () => {

    const navigate = useNavigate()
    const rdxDetail = useSelector(detailData)
    const rdxUser = useSelector(userData)

    const [postMedia, setPostMedia] = useState('')
    const [postLikes, setPostLikes] = useState([])
    const [detailUpdateData, setDetailUpdateData] = useState({
        firstName: "",
        lastName: "",
        nickName: "",
        profileImg: "",
        bio: "",
        email: "",
        password: ""
    })
    const [detailUpdateDataError, setDetailUpdateDataError] = useState({
        firstNameError: "",
        lastNameError: "",
        nickNameError: "",
        profileImgError: "",
        bioError: "",
        passwordError: ""
    })
    const [detailErrorMsg, setDetailErrorMsg] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [avatarUpload, setAvatarUpload] = useState(null)
    const [updatePassword, setUpdatePassword] = useState(false)

    useEffect(() => {
        (!rdxUser?.credentials?.userToken) && ((!rdxDetail?.detail?.chat) || (!rdxDetail?.detail?.post))
            ? navigate('/login')
            : null
    }, [])

    useEffect(() => {
        if (rdxDetail.detail.post) {
            const getPostMedia = async () => {
                if (rdxDetail.detail.post.media.split(':')[0] !== 'https') {
                    try {
                        const fetched = await getFilePost(rdxDetail.detail.post.media)
                        setPostMedia(fetched)
                    } catch (error) {
                        if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                            dispatch(logout({ credentials: {} }))
                        }
                    }
                }

            }
            setPostLikes(rdxDetail.detail.post.likes)
            getPostMedia()
        }
    }, [])

    const addRemoveLike = async () => {
        setPostLikes(prevState => {

            const updatedLikes = prevState.includes(rdxUser.credentials.userTokenData.userId)
                ? (
                    prevState.filter(id => id !== rdxUser.credentials.userTokenData.userId)
                ) : (
                    [...prevState, rdxUser.credentials.userTokenData.userId]
                )
            return updatedLikes
        })
    }

    console.log(avatarUpload);
    console.log(rdxDetail.detail.profileImg);

    const inputHandler = (e) => {
        if (!e.target.files) {
            if (e.target.value === "") {
                setDetailErrorMsg("")
            }
            setDetailUpdateData((prevState) => ({
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
                    setDetailUpdateData((prevState) => ({
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

        setDetailUpdateDataError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: valid
        }))
    }

    const editPassword = () => {
        updatePassword
            ? setUpdatePassword(false)
            : setUpdatePassword(true)
    }

    const updateProfile = async () => {
        try {
            const fetched = await updateOwnProfileService(rdxUser.credentials.userToken, detailUpdateData)
            console.log(fetched);
            if (avatarUpload !== null) {
                try {
                    const avatarFetched = await uploadFileAvatar(avatarUpload)
                    console.log(avatarFetched);
                } catch (error) {

                }
            }
            navigate('/profile')
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        for (let element in detailUpdateDataError) {
            if (detailUpdateDataError[element] !== "") {
                setDetailErrorMsg(detailUpdateDataError[element])
                break
            }
        }
        const allErrorsCleared = Object.values(detailUpdateDataError).every(value => value === "");
        if (allErrorsCleared) {
            setDetailErrorMsg("")
        }
    }, [detailUpdateDataError])

    return (
        <div className="detailsDesign">
            {
                rdxDetail.detail.chat && (
                    <CCard>
                        <div className="senderReceiver">
                            <CText title={rdxDetail?.detail?.chat?.sender} />
                            <CText title={rdxDetail?.detail?.chat?.receiver} />
                        </div>
                        <CText title={rdxDetail?.detail?.chat?.message} />
                    </CCard>
                )
            },
            {
                rdxDetail.detail.post && (
                    <CCard className={'postCard'}>
                        <div className="postIconsTop">
                            <SquareArrowOutUpRight className='icon' />
                        </div>
                        <CText className={'postTitle'} title={rdxDetail?.detail?.post?.title} />
                        <CText className={'postImg'}>
                            <img src={postMedia || rdxDetail?.detail?.post?.media} alt={`${rdxDetail?.detail?.post?._id}'s media`} />
                        </CText>
                        <CText className={'postText'} title={rdxDetail?.detail?.post?.description} />
                        <div className="postIconsBot">
                            <div className="likes" >
                                <Heart className='icon' strokeWidth={'2px'} onClick={() => addRemoveLike()} />
                                <CText title={postLikes.length} />
                            </div>
                            <div className="comments">
                                <MessageSquareText className='icon' strokeWidth={'2px'} />
                                <CText title={rdxDetail?.detail?.post?.comments.length} />
                            </div>
                        </div>
                    </CCard>

                )
            }
            {
                rdxDetail.detail.email && (
                    <CCard className={'cardRegister'}>
                        <form
                            action="http://localhost:4000/api/files/uploadAvatar"
                            encType="multipart/form-data"
                            method="post"
                        >
                            <div className="registerImg">
                                <label
                                    disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.profileImgError ? false : true}
                                    htmlFor='photo'
                                    className={'uploadPhotoInput'}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                >
                                    <img src={avatar || rdxDetail.detail.profileImg} alt="default-profileImg" />
                                </label>
                                <CInput
                                    disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.profileImgError ? false : true}
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
                                disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.firstNameError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"text"}
                                name={"firstName"}
                                value={detailUpdateData.firstName || ""}
                                placeholder={"input your first name"}
                                onChange={(e) => inputHandler(e)}
                                onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.lastNameError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"text"}
                                name={"lastName"}
                                value={detailUpdateData.lastName || ""}
                                placeholder={"input your last name"}
                                onChange={(e) => inputHandler(e)}
                                onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.nickNameError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"text"}
                                name={"nickName"}
                                value={detailUpdateData.nickName || ""}
                                placeholder={"input your nickname"}
                                onChange={(e) => inputHandler(e)}
                                onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.nickNameError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"text"}
                                name={"bio"}
                                value={detailUpdateData.bio || ""}
                                placeholder={"input your bio"}
                                onChange={(e) => inputHandler(e)}
                            />
                            <CButton title={'password'} onClick={() => editPassword()} />
                        </div>
                    </CCard>
                )
            }
            {updatePassword && (
                <CCard className={updatePassword ? 'overBoxUpdatePassword' : "hidden"}>
                    <CInput
                        disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.passwordBodyError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"password"}
                        name={"password"}
                        value={detailUpdateData.passwordBody || ""}
                        placeholder={"input your password"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                    <CInput
                        disabled={detailErrorMsg === "" ? false : detailErrorMsg === detailUpdateDataError.passwordBodyError ? false : true}
                        className={'CI-LoginDesign'}
                        type={"password"}
                        name={"passwordCheck"}
                        value={detailUpdateData.passwordBody || ""}
                        placeholder={"input your password"}
                        onChange={(e) => inputHandler(e)}
                        onBlur={(e) => checkError(e)}
                    />
                </CCard>
            )}
            <CButton title={'edit'} className={detailErrorMsg !== "" ? "CB-disabledButton" : ""} onClick={detailErrorMsg === "" ? () => updateProfile() : null} />
            <CText className={'CT-errorText'} title={detailErrorMsg} />
        </div>
    )
}