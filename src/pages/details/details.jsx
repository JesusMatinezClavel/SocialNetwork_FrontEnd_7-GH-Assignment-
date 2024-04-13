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
import { addRemoveLikeService, getFileAvatar, getFilePost } from '../../services/apiCalls';


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
        birthDate: "",
        email: "",
        passwordBody: ""
    })
    const [detailUpdateDataError, setDetailUpdateDataError] = useState({
        firstNameError: "",
        lastNameError: "",
        nickNameError: "",
        profileImgError: "",
        bioError: "",
        birthDateError: "",
        emailError: "",
        passwordBodyError: ""
    })
    const [avatar, setAvatar] = useState(null)

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
        if (rdxDetail.detail.email) {
            const getAvatar = async () => {
                try {
                    const fetched = await getFileAvatar(rdxDetail?.detail?.profileImg)
                    setAvatar(fetched)
                } catch (error) {
                    console.log(error);
                }
            }
            getAvatar()
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

    const inputHandler = (e) => {
        if (!e.target.files) {
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
                                    // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.profileImgError ? false : true}
                                    htmlFor='photo'
                                    className={'uploadPhotoInput'}
                                // onChange={(e) => inputHandler(e)}
                                // onBlur={(e) => checkError(e)}
                                >
                                    {/* <img src={avatar} alt="default-profileImg" /> */}
                                </label>
                                <CInput
                                    // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.profileImgError ? false : true}
                                    className={'CI-LoginDesign fileInput'}
                                    id={'photo'}
                                    type={"file"}
                                    name={"profileImg"}
                                    value={""}
                                // onChange={(e) => inputHandler(e)}
                                // onBlur={(e) => checkError(e)}
                                />
                            </div>
                        </form>
                        <div className="registerText">
                            <CInput
                                // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.firstNameError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"text"}
                                name={"firstName"}
                                value={detailUpdateData.firstName || ""}
                                placeholder={"input your first name"}
                            // onChange={(e) => inputHandler(e)}
                            // onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.lastNameError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"text"}
                                name={"lastName"}
                                value={detailUpdateData.lastName || ""}
                                placeholder={"input your last name"}
                            // onChange={(e) => inputHandler(e)}
                            // onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.nickNameError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"text"}
                                name={"nickName"}
                                value={detailUpdateData.nickName || ""}
                                placeholder={"input your nickname"}
                            // onChange={(e) => inputHandler(e)}
                            // onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.emailError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"email"}
                                name={"email"}
                                value={detailUpdateData.email || ""}
                                placeholder={"input your email"}
                            // onChange={(e) => inputHandler(e)}
                            // onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.birthDateError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"date"}
                                name={"birthDate"}
                                value={detailUpdateData.birthDate || ""}
                                placeholder={"input your birthdate"}
                            // onChange={(e) => inputHandler(e)}
                            // onBlur={(e) => checkError(e)}
                            />
                            <CInput
                                // disabled={registerErrorMsg === "" ? false : registerErrorMsg === detailUpdateDataError.passwordBodyError ? false : true}
                                className={'CI-LoginDesign'}
                                type={"password"}
                                name={"passwordBody"}
                                value={detailUpdateData.passwordBody || ""}
                                placeholder={"input your password"}
                            // onChange={(e) => inputHandler(e)}
                            // onBlur={(e) => checkError(e)}
                            />
                        </div>
                    </CCard>
                )
            }
            <CButton title={'edit'} />
        </div>
    )
}