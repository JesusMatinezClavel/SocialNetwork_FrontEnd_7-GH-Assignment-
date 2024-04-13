// Styles
import './home.css'

// Methos/modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addRemoveLikeService, createNewPostService, getAllPostsService, getFileAvatar, getOwnProfileService, getUserByIdService, uploadFilePost } from "../../services/apiCalls";
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
        password: "",
        followers: "",
        followed: "",
        posts: "",
        chat: "",
        comment: "",
        liked: "",

    })
    const [homePosts, setHomePosts] = useState([])
    const [mediaPreview, setMediaPreview] = useState(null)
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        media: ""
    })
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
                console.log(avatarFetched);
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
            const postFetched = await createNewPostService(rdxUser.credentials.userToken, newPost)
            if (newPost.media !== "") {
                const uploadPost = await uploadFilePost(mediaUpload)
                if (!uploadPost.success) {
                    throw new Error(uploadPost.message)
                }
            }
            setMediaPreview('../../img/default-ProfileImg.png')
            setNewPost({
                title: "",
                description: "",
                media: ""
            })

        } catch (error) {
            if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                dispatch(logout({ credentials: {} }))
            } else {
                console.log(error);
            }
        }
    }

    const addRemoveLike = async (index) => {
        const post = homePosts[index]
        try {
            const fetched = await addRemoveLikeService(rdxUser.credentials.userToken, post._id)
            if (!fetched.success) {
                throw new Error(fetched.message)
            }
            const updatedPosts = homePosts.map((post, i) => {
                if (i === index) {
                    const updatedLikes = post.likes.includes(rdxUser.credentials.userTokenData.userId)
                        ? post.likes.filter(id => id !== rdxUser.credentials.userTokenData.userId)
                        : [...post.likes, rdxUser.credentials.userTokenData.userId];
                    return { ...post, likes: updatedLikes };
                }
                return post;
            });
            setHomePosts(updatedPosts);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row">
            <div className="homeDesign">
                <CCard className={'homeUserCard'}>
                    <CText className={'profileImg'}>
                        <img src={homeData.profileImg} alt="" />
                    </CText>
                    <CText title={homeData.nickName} />
                    <CText title={homeData.age} />
                    <div className="profileIcons">
                        <div className="iconsInfo">
                            <Heart />
                            <CText title={homeData.liked.length} />
                        </div>
                        <div className="iconsInfo">
                            <MessageSquareText />
                            <CText title={homeData.comment.length} />
                        </div>
                        <div className="iconsInfo">
                            <UserRoundCheck />
                            <CText title={homeData.followers.length} />
                        </div>
                        <div className="iconsInfo">
                            <UserCheck />
                            <CText title={homeData.followed.length} />
                        </div>
                    </div>
                </CCard>
                <CCard className={'homePostsCard'}>
                    <CCard className={'newPostCard'}>
                        <form
                            action="http://localhost:4000/api/files/uploadPost"
                            encType="multipart/form-data"
                            method="post"
                        >
                            <div className="newPostMedia">
                                <label
                                    htmlFor='photo'
                                    className={'uploadPhotoInput CI-newPostImage'}
                                    onChange={(e) => inputHandler(e)}>
                                    <img src={mediaPreview || '../../../img/default-ProfileImg.png'} alt="default-mediaPreview" />
                                </label>
                                <CInput
                                    className={'CI-newPostImage fileInput'}
                                    id={'photo'}
                                    type={"file"}
                                    name={"media"}
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
                                <div className="iconsInfo" >
                                    <Heart className='icon' strokeWidth={'2px'} onClick={() => addRemoveLike(index)} />
                                    <CText title={post.likes.length} />
                                </div>
                                <div className="iconsInfo">
                                    <MessageSquareText className='icon' strokeWidth={'2px'} />
                                    <CText title={post.comments.length} />
                                </div>
                            </div>
                        </CCard>
                    ))
                    }
                </CCard>
            </div>
        </div>
    )
}