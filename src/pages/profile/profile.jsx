//Styles
import './profile.css'

//Methods/Modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getChatByIdService, getOwnChatsService, getOwnPostsService, getOwnProfileService, getPostByIdService, getUserByIdService } from "../../services/apiCalls";
import dayjs from "dayjs";

//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";
import { CButton } from "../../common/c-button/cButton";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";


export const Profile = () => {

    const navigate = useNavigate()
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

    const [profileErrorMsg, setProfileErrorMsg] = useState("")

    if (!rdxUser.credentials.userToken) {
        navigate('/')
    }

    useEffect(() => {
        document.title = `${rdxUser.credentials.userTokenData.nickName} Profile`;
    }, [])

    useEffect(() => {
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
            } catch (error) {
                console.log(error.message);
            }
        }
        getOwnProfile()
    }, [])

    useEffect(() => {
        const getOwnPosts = async () => {
            const userPosts = []
            try {
                for (const post of profileData.posts) {
                    const postId = post
                    const fetched = await getPostByIdService(rdxUser.credentials.userToken[0], postId)
                    if (!userPosts.includes(fetched.data[0])) {
                        userPosts.push(fetched.data[0])
                    }
                    if (!fetched.success) {
                        throw new Error(fetched.message)
                    }
                }
                setProfilePosts(userPosts)
            } catch (error) {
                console.log(error.message);
            }
        }
        getOwnPosts()
    }, [profileData])

    useEffect(() => {
        const getOwnChats = async () => {
            const userChats = []
            try {
                for (const chat of profileData.chat) {
                    const chatId = chat
                    const fetched = await getChatByIdService(rdxUser.credentials.userToken[0], chatId)
                    if (!userChats.includes(fetched.data[0])) {
                        userChats.push(fetched.data[0])
                    }
                    if (!fetched.success) {
                        throw new Error(fetched.message)
                    }
                }
                setProfileChats(userChats)
            } catch (error) {
                console.log(error.message);
            }
        }
        getOwnChats()
    }, [profileData])

    const prueba = () => {
        console.log(profileChats);
        console.log(profilePosts);
    }

    return (
        <div className="row">
            <CButton title='button' onClick={() => prueba()} />
            <div className="profileDesign" >
                <div className="container-fluid col-lg-2 col-md-12 col-sm-12">
                    <CText title={profileErrorMsg} />
                    <CText title={'PROFILE'} />
                    <CCard className={'profileUserCard'}>
                        <CText className={'profileImg'} title={profileData.profileImg} />
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
                            <CCard key={`post-${post._id}`}>
                                <CText title={post.title} />
                                <CText title={post.media} />
                                <CText title={post.description} />
                            </CCard>
                        ))
                        }
                    </CCard>
                </div>
                <div className="container-fluid col-lg-2 col-md-12 col-sm-12">
                    <CText title={profileErrorMsg} />
                    <CText title={'CHATS'} />
                    <CCard className={'profileChatsCard'}>
                        {profileChats.map((chat, index) => (
                            <CCard key={`chat-${chat._id}`}>
                                <CText title={chat.receiver} />

                            </CCard>
                        ))
                        }
                    </CCard>
                </div>
            </div >
        </div>
    )
}