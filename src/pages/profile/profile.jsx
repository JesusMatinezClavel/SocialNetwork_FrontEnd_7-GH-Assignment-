//Styles
import './profile.css'

//Methods/Modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnChatsService, getOwnPostsService, getOwnProfileService, getUserByIdService } from "../../services/apiCalls";
import dayjs from "dayjs";

//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";

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
                console.log(fetched);
                setProfileData({
                    firstName: fetched.data[0].firstName,
                    lastName: fetched.data[0].lastName,
                    nickName: fetched.data[0].nickName,
                    profileImg: fetched.data[0].profileImg,
                    bio: fetched.data[0].bio,
                    age: fetched.data[0].age,
                    birthDate: fetched.data[0].birthdate,
                    email: fetched.data[0].email,
                })
            } catch (error) {
                console.log(error);
            }
        }
        // const getOwnPosts = async () => {
        //     try {
        //         const fetched = await getOwnPostsService(rdxUser.credentials.userToken[0])
        //         setProfilePosts(fetched.data[0])
        //     } catch (error) {

        //     }
        // }
        // const getOwnChats = async () => {
        //     try {
        //         const fetched = await getOwnChatsService(rdxUser.credentials.userToken[0])

        //         if (!fetched.success) {
        //             throw new Error(fetched.message)
        //         }

        //         setProfileChats(fetched.data[0])

        //     } catch (error) {
        //         setProfileErrorMsg(error.message)
        //     }
        // }
        getOwnProfile()
        // getOwnPosts()
        // getOwnChats()
    }, [])

    useEffect(() => {
        const getUserById = async () => {
            try {
                for (const chat of profileChats) {  
                    const receiverId = chat.receiver
                    const fetched = await getUserByIdService(rdxUser.credentials.userToken[0], receiverId)

                    if(!fetched.success){
                        throw new Error(fetched.message)
                    }
                    
                    console.log(fetched);

                }
            } catch (error) {

            }
        }
        getUserById()
    }, [profileChats])

    return (
        <div className="row">
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
                            <CCard key={`chat-${profileChats[index]._id}`}>
                            </CCard>
                        ))
                        }
                    </CCard>
                </div>
            </div >
        </div>
    )
}