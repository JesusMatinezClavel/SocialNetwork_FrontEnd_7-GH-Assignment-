//Styles
import './profile.css'

//Methods/Modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnProfileService, getUserByIdService, getFileAvatar, addRemoveLikeService, deleteOwnPostService } from "../../services/apiCalls";
import { Heart, MessageSquareText, UserRoundCheck, UserCheck, SquareArrowOutUpRight } from "lucide-react";


//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";
import { CButton } from "../../common/c-button/cButton";
import { CInput } from "../../common/c-input/cInput";

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
        password: "",
        followers: "",
        followed: "",
        posts: "",
        chat: "",
        comment: "",
        liked: "",
    })

    const [profilePosts, setProfilePosts] = useState([])

    const [profilePostsLikes, setProfilePostsLikes] = useState([])

    const [profileChats, setProfileChats] = useState([])

    const [chatReceivers, setChatReceivers] = useState([])

    const [confirmDelete, setConfirmDelete] = useState(false)

    const [editable, setEditable] = useState(false)

    useEffect(() => {
        !rdxUser?.credentials?.userToken
            ? navigate('/')
            : (document.title = `${rdxUser?.credentials?.userTokenData?.nickName}'s Profile`,
                dispatch(removeDetail({ detail: {} })))
    }, [])

    useEffect(() => {
        const getOwnProfile = async () => {
            try {
                const fetched = await getOwnProfileService(rdxUser?.credentials?.userToken)
                const userData = fetched.data
                setProfileData({
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
                setProfileData((prevState) => ({
                    ...prevState,
                    profileImg: avatarFetched
                }))
                setProfileChats(userData.chat)
                setProfilePosts(userData.posts)
                userData.posts.map(post => {
                    profilePostsLikes.push(post.likes)
                })
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                }
            }
        }
        if (profileData.nickName === "" || profileData.email === "" || profileData.birthDate === "") {
            getOwnProfile()
        }
    }, [profileData, profilePosts])

    // console.log(profileChats);

    useEffect(() => {
        const getReceivers = async () => {
            const receivers = []
            try {
                for (const chat of profileChats) {
                    const receiverId = chat.receiver
                    console.log(receiverId);
                    const fetched = await getUserByIdService(rdxUser?.credentials?.userToken, receiverId)
                    console.log(fetched,data);
                    if (!fetched.success) {
                        throw new Error(fetched.message)
                    } else if (!receivers.includes(fetched.data)) {
                        receivers.push(fetched.data)
                    }
                }
                setChatReceivers(receivers)
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                }
            }
        }
        if (chatReceivers.length === 0) {
            getReceivers()
        }
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

    const addRemoveLike = async (index) => {
        const post = profilePosts[index]
        try {
            const fetched = await addRemoveLikeService(rdxUser?.credentials?.userToken, post._id)
            if (!fetched.success) {
                throw new Error(fetched.message)
            }
            const updatedPosts = profilePosts.map((post, i) => {
                if (i === index) {
                    const updatedLikes = post.likes.includes(rdxUser?.credentials?.userTokenData?.userId)
                        ? post.likes.filter(id => id !== rdxUser?.credentials?.userTokenData?.userId)
                        : [...post.likes, rdxUser?.credentials?.userTokenData?.userId];
                    return { ...post, likes: updatedLikes };
                }
                return post;
            });
            setProfilePosts(updatedPosts);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteOwnPost = async (index) => {
        const post = profilePosts[index]
        try {
            const fetched = await deleteOwnPostService(rdxUser?.credentials?.userToken, post._id)
            const updatedPosts = profilePosts.filter(element => element._id !== post._id)
            setProfilePosts(updatedPosts)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBox = () => {
        confirmDelete
            ? setConfirmDelete(false)
            : setConfirmDelete(true)
    }

    const editProfile = () => {
        dispatch(addDetail({ detail: profileData }))
        navigate('/details')
    }

    const editPost = (index) => {
        const post = profilePosts[index]
        dispatch(addDetail({
            detail: {
                edit: post
            }
        }))
        navigate('/details')
    }
    return (
        <div className="profileDesign" >
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
                <div className="profileIcons">
                    <div className="iconsInfo">
                        <Heart />
                        <CText title={profileData.liked.length} />
                    </div>
                    <div className="iconsInfo">
                        <MessageSquareText />
                        <CText title={profileData.comment.length} />
                    </div>
                    <div className="iconsInfo">
                        <UserRoundCheck />
                        <CText title={profileData.followers.length} />
                    </div>
                    <div className="iconsInfo">
                        <UserCheck />
                        <CText title={profileData.followed.length} />
                    </div>
                </div>
                <CButton title={'edit profile'} onClick={() => editProfile()} />
            </CCard>
            <CCard className={'profilePostsCard'}>
                {profilePosts.map((post, index) => (
                    <CCard className={'postCard'} key={`post-${post._id}`}>
                        <div className="postIconsTop">
                            <SquareArrowOutUpRight className='icon' onClick={() => getPostDetail(index)} />
                        </div>
                        <CText className={'postTitle'} title={post.title} />
                        <div className="postIconsBot">
                            <div className="leftIconsBot">
                                <div className="iconsInfo" >
                                    <Heart className='icon' strokeWidth={'2px'} onClick={() => addRemoveLike(index)} />
                                    <CText title={profilePosts[index].likes.length} />
                                </div>
                                <div className="iconsInfo">
                                    <MessageSquareText className='icon' strokeWidth={'2px'} />
                                    <CText title={post.comments.length} />
                                </div>
                            </div>
                            <div className="deleteButton">
                                <CButton title={'edit'} onClick={() => editPost(index)} />
                                <CButton title={'delete'} onClick={() => deleteBox()} />
                                <div className="confirmDelete">
                                    <CButton title={'confirm'} className={confirmDelete ? "" : 'hidden'} onClick={() => deleteOwnPost(index)} />
                                    <CButton title={'cancel'} className={confirmDelete ? "" : 'hidden'} onClick={() => deleteBox()} />
                                </div>
                            </div>
                        </div>
                    </CCard>
                ))

                }
            </CCard>
            <CCard className={'profileChatsCard'}>
                {chatReceivers.map((receiver, index) => (
                    <CCard className={'receiverCard'} key={`chat-${profileChats[index]._id}`} onClick={(e) => getChatDetail(e)}>
                        <CText title={receiver.nickName} />
                    </CCard>
                ))
                }
            </CCard>
        </div >
    )
}