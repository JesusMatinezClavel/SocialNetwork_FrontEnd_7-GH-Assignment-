// Styles
import './home.css'

// Methos/modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPostsService, getFile, getOwnProfileService, getUserByIdService } from "../../services/apiCalls";
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

    useEffect(() => {
        document.title = `${rdxUser.credentials.userTokenData.nickName}'s Home`;
        dispatch(removeDetail({ detail: {} }))
        if (!rdxUser.credentials.userToken[0]) {
            navigate('/welcome')
        }
    }, [])

    useEffect(() => {
        const getOwnProfile = async () => {
            try {
                const fetched = await getOwnProfileService(rdxUser.credentials.userToken[0])
                const userData = fetched.data[0]
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
                const avatarFetched = await getFile(userData.profileImg)
                setHomeData((prevState) => ({
                    ...prevState,
                    profileImg: avatarFetched
                }))
            } catch (error) {
                console.log(error.message);
            }
        }
        getOwnProfile()
    }, [])

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const fetched = await getAllPostsService(rdxUser.credentials.userToken[0])
                setHomePosts(fetched.data[0])
            } catch (error) {

            }
        }
        getAllPosts()
    }, [])

    const getPostDetail = (index) => {
        const post = homePosts[index];
        dispatch(addDetail({ detail: { post } }))
        navigate('/details')
    }

    const inputHandler = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
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
                                        <img src={'../../../img/default-ProfileImg.png'} alt="default-profileImg" />
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
                            <CButton title={'new Post!'}/>
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