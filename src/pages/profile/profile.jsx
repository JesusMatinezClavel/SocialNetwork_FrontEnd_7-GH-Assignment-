//Styles
import './profile.css'

//Methods/Modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnProfileService, getUserByIdService } from "../../services/apiCalls";
import { Heart, MessageSquareText, UserRoundCheck, UserCheck, SquareArrowOutUpRight } from "lucide-react";


//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";
import { CButton } from "../../common/c-button/cButton";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { addDetail, removeDetail } from "../../app/slices/detailSlice";


export const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rdxUser = useSelector(userData)

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        nickName: "",
        profileImg: "",
        bio: "",
        age: "",
        birthDate: "",
        email: "",
    })

    const [profilePosts, setProfilePosts] = useState([])

    const [profileChats, setProfileChats] = useState([])

    const [chatReceivers, setChatReceivers] = useState([])

    const [profileErrorMsg, setProfileErrorMsg] = useState("")

    if (!rdxUser.credentials.userToken) {
        navigate('/')
    }

    // useEffect(() => {
    //     document.title = `${rdxUser.credentials.userTokenData.nickName}'s Profile`;
    //     dispatch(removeDetail({ detail: {} }))
    // }, [])

    useEffect(() => {
        document.title = `${rdxUser.credentials.userTokenData.nickName}'s Profile`;
        dispatch(removeDetail({ detail: {} }))
        const getOwnProfile = async () => {
            try {
                const fetched = await getOwnProfileService(rdxUser.credentials.userToken[0])
                const userData = fetched.data[0]
                setProfileData({
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
                setProfileChats(userData.chat)
                setProfilePosts(userData.posts)
            } catch (error) {
                console.log(error.message);
            }
        }
        getOwnProfile()
    }, [])

    useEffect(() => {
        const getReceivers = async () => {
            const receivers = []
            try {
                for (const chat of profileChats) {
                    const receiverId = chat.receiver
                    const fetched = await getUserByIdService(rdxUser.credentials.userToken[0], receiverId)
                    if (!fetched.success) {
                        throw new Error(fetched.message)
                    } else if (!receivers.includes(fetched.data[0])) {
                        receivers.push(fetched.data[0])
                    }
                }
                setChatReceivers(receivers)
            } catch (error) {
                console.log(error.message);
            }
        }
        getReceivers()
    }, [profileChats])

    const getChatDetail = (e) => {
        let receiver
        chatReceivers.map(element => {
            element.nickName === e.target.innerText
                ? receiver = element._id
                : null
        })
        profileChats.map(chat => {
            chat.receiver === receiver
                ? (
                    dispatch(addDetail({ detail: { chat } })),
                    navigate('/details')
                )
                : null
        })
    }

    const getPostDetail = (index) => {
        const post = profilePosts[index];
        dispatch(addDetail({ detail: { post } }))
        navigate('/details')
    }

    return (
        <div className="row">
            <div className="profileDesign" >
                <div className="container-fluid col-lg-2 col-md-6 col-sm-12">
                    <CText title={profileErrorMsg} />
                    <CText title={'PROFILE'} />
                    <CCard className={'profileUserCard'}>
                        <CText className={'profileImg'}>
                            <img src={profileData.profileImg} alt={`${profileData.nickName}'s profile Picture`} />
                        </CText>
                        <CText title={`${profileData.firstName} ${profileData.lastName}`} />
                        <CText title={profileData.nickName} />
                        <CText title={profileData.age} />
                        <CText title={profileData.birthDate} />
                        <CText title={profileData.email} />
                        <CText title={profileData.bio} />
                    </CCard>
                </div>
                <div className="container-fluid col-lg-7 col-md-12 col-sm-12">
                    <CText title={profileErrorMsg} />
                    <CText title={'POSTS'} />
                    <CCard className={'profilePostsCard'}>
                        {profilePosts.map((post, index) => (
                            <CCard className={'postCard'} key={`post-${post._id}`}>
                                <div className="postIconsTop">
                                    <SquareArrowOutUpRight className='icon' onClick={() => getPostDetail(index)} />
                                </div>
                                <CText className={'postTitle'} title={post.title} />
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
                <div className="container-fluid col-lg-2 col-md-6 col-sm-12">
                    <CText title={profileErrorMsg} />
                    <CText title={'CHATS'} />
                    <CCard className={'profileChatsCard'}>
                        {chatReceivers.map((receiver, index) => (
                            <CCard className={'receiverCard'} key={`chat-${receiver._id}`} onClick={(e) => getChatDetail(e)}>
                                <CText title={receiver.nickName} />
                            </CCard>
                        ))
                        }
                    </CCard>
                </div>
            </div >
        </div>
    )
}