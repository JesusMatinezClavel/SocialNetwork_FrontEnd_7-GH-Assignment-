// Styles
import './home.css'

// Methos/modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPostService, getAllPostsService, getFileAvatar, getOwnProfileService, getUserByIdService, uploadFilePost } from "../../services/apiCalls";
import { Heart, MessageSquareText, UserRoundCheck, UserCheck, SquareArrowOutUpRight } from "lucide-react";

//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";
import { CButton } from "../../common/c-button/cButton";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { addDetail, removeDetail } from "../../app/slices/detailSlice";
import { CInput } from '../../common/c-input/cInput';



export const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rdxUser = useSelector(userData)

    const [homeData, setHomeData] = useState({
        firstName: "",
        lastName: "",
        nickName: "",
        profileImg: "",
        bio: "",
        age: "",
        birthDate: "",
        email: "",
    })
    const [homePosts, setHomePosts] = useState([])
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        media: ""
    })
    const [mediaPreview, setMediaPreview] = useState('../../img/default-ProfileImg.png')
    const [mediaUpload, setMediaUpload] = useState(null)


    useEffect(() => {
        !rdxUser?.credentials?.userToken
            ? navigate('/')
            : (document.title = `${rdxUser.credentials.userTokenData.nickName}'s Home`,
                dispatch(removeDetail({ detail: {} })))
    }, [])

    useEffect(() => {
        const getOwnProfile = async () => {
            try {
                const fetched = await getOwnProfileService(rdxUser.credentials.userToken)
                if (!fetched.success) {
                    throw new Error(fetched.message)
                }
                const userData = fetched.data
                setHomeData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    nickName: userData.nickName,
                    profileImg: userData.profileImg,
                    bio: userData.bio,
                    age: userData.age,
                    birthDate: userData.birthdate,
                    email: userData.email,
                    password: userData.password,
                    followers: userData.followers,
                    followed: userData.followed,
                    posts: userData.posts,
                    chat: userData.chat,
                    comment: userData.comment,
                    liked: userData.liked
                })
                const avatarFetched = await getFileAvatar(userData.profileImg)
                setHomeData((prevState) => ({
                    ...prevState,
                    profileImg: avatarFetched
                }))
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                }
            }
        }
        if (homeData.nickName === "" || homeData.email === "" || homeData.birthDate === "") {
            getOwnProfile()
        }
    }, [homeData])

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const fetched = await getAllPostsService(rdxUser.credentials.userToken)
                setHomePosts(fetched.data)
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                }
            }
        }
        if (homePosts.length === 0) {
            getAllPosts()
        }
    }, [homePosts])

    const getPostDetail = (index) => {
        const post = homePosts[index];
        dispatch(addDetail({ detail: { post } }))
        navigate('/details')
    }

    const inputHandler = (e) => {
        if (!e.target.files) {
            setNewPost((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        } else {
            const file = e.target.files[0]
            if (file) {
                setMediaUpload(file)
                const reader = new FileReader()
                reader.onload = (event) => {
                    setMediaPreview(event.target.result)
                    setNewPost((prevState) => ({
                        ...prevState,
                        media: file.name
                    }));
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const createnewPost = async () => {
        try {
            if (newPost.media !== "") {
                const uploadPost = await uploadFilePost(mediaUpload)
                if (!uploadPost.success) {
                    throw new Error(uploadPost.message)
                }
            }
            const postFetched = await createNewPostService(rdxUser.credentials.userToken, newPost)
            const uploadMedia = await uploadFilePost(mediaPreview)
            setMediaPreview('../../img/default-ProfileImg.png')
            setNewPost({
                title: "",
                description: "",
                media: mediaPreview
            })

        } catch (error) {
            if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                dispatch(logout({ credentials: {} }))
            }
        }
    }

    return (
        <div className="row">
            <div className="homeDesign">
                <div className="container-fluid col-lg-2 col-md-6 col-sm-12">
                    <CText title={'HOME'} />
                    <CCard className={'homeUserCard'}>
                        <CText className={'profileImg'}>
                            <img src={homeData.profileImg} alt="" />
                        </CText>
                        <CText title={`${homeData.firstName} ${homeData.lastName}`} />
                        <CText title={homeData.nickName} />
                        <CText title={homeData.age} />
                        <CText title={homeData.birthDate} />
                        <CText title={homeData.email} />
                        <CText title={homeData.bio} />
                    </CCard>
                </div>
                <div className="container-fluid col-lg-7 col-md-12 col-sm-12">
                    <CCard className={'homePostsCard'}>
                        <CCard className={'newPostCard'}>
                            <form
                                action="http://localhost:4000/api/files/upload"
                                encType="multipart/form-data"
                                method="post"
                            >
                                <div className="newPostMedia">
                                    <label
                                        htmlFor='photo'
                                        className={'uploadPhotoInput CI-newPostImage'}
                                        onChange={(e) => inputHandler(e)}>
                                        <img src={mediaPreview} alt="default-profileImg" />
                                    </label>
                                    <CInput
                                        className={'CI-newPostImage fileInput'}
                                        id={'photo'}
                                        type={"file"}
                                        name={"profileImg"}
                                        value={""}
                                        onChange={(e) => inputHandler(e)}
                                    />
                                </div>
                            </form>
                            <div className="newPostText">
                                <CInput
                                    className={'CI-newPosTitle'}
                                    type={"text"}
                                    name={"title"}
                                    value={newPost.title || ""}
                                    placeholder={"input your title"}
                                    onChange={(e) => inputHandler(e)}
                                />
                                <CInput
                                    className={'CI-newPostarea'}
                                    type={"textarea"}
                                    name={"description"}
                                    value={newPost.description || ""}
                                    placeholder={"textArea"}
                                    onChange={(e) => inputHandler(e)}
                                />
                                <CButton title={'new Post!'} onClick={() => createnewPost()} />
                            </div>
                        </CCard>
                        {homePosts.map((post, index) => (
                            <CCard className={'postCard'} key={`post-${post._id}`}>
                                <div className="postIconsTop">
                                    <SquareArrowOutUpRight className='icon' onClick={() => getPostDetail(index)} />
                                </div>
                                <CText className={'postTitle'} title={post.title} />
                                <CText className={'postImg'} ><img src={post.media} alt="" /></CText>
                                <CText className={'postText'} title={post.description} />
                                <div className="postIconsBot">
                                    <Heart className='icon' strokeWidth={'2px'} />
                                    <CText title={post.likes.length} />
                                    <MessageSquareText className='icon' strokeWidth={'2px'} />
                                    <CText title={post.comments.length} />
                                </div>
                            </CCard>
                        ))
                        }
                    </CCard>
                </div>
            </div>
        </div>
    )
}