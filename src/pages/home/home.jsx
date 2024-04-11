// Styles
import './home.css'

// Methos/modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnProfileService, getUserByIdService } from "../../services/apiCalls";
import { Heart, MessageSquareText, UserRoundCheck, UserCheck } from "lucide-react";

//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";
import { CButton } from "../../common/c-button/cButton";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { addDetail, removeDetail } from "../../app/slices/chatSlice";



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

    useEffect(() => {
        document.title = `${rdxUser.credentials.userTokenData.nickName}'s Home`;
        dispatch(removeDetail({ detail: {} }))
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
            } catch (error) {
                console.log(error.message);
            }
        }
        getOwnProfile()
    }, [homeData])

    // const getDetails = (e) => {
    //     let receiver
    //     chatReceivers.map(element => {
    //         element.nickName === e.target.innerText
    //             ? receiver = element._id
    //             : null
    //     })
    //     profileChats.map(chat => {
    //         chat.receiver === receiver
    //             ? (
    //                 dispatch(addDetail({ detail: { chat } })),
    //                 navigate('/details')
    //             )
    //             : null
    //     })
    // }


    return (
        <div className="homeDesign">
            {
                !rdxUser.credentials.userToken[0]
                    ? (
                        <div className="homeDesign-Out">NO TOKEN</div>
                    ) : (
                        <div className="row">
                            <div className="homeDesign-In">
                                <div className="container-fluid col-lg-2 col-md-6 col-sm-12">
                                    <CText title={'HOME'} />
                                    <CCard className={'homeUserCard'}>
                                        <CText className={'profileImg'} title={homeData.profileImg} />
                                        <CText title={`${homeData.firstName} ${homeData.lastName}`} />
                                        <CText title={homeData.nickName} />
                                        <CText title={homeData.age} />
                                        <CText title={homeData.birthDate} />
                                        <CText title={homeData.email} />
                                        <CText title={homeData.bio} />
                                    </CCard>
                                </div>
                                <div className="container-fluid col-lg-7 col-md-12 col-sm-12">
                                    <CText title={'POSTS'} />
                                    <CCard className={'homePostsCard'}>
                                        {homePosts.map((post, index) => (
                                            <CCard key={`post-${post._id}`}>
                                                <CText title={post.title} />
                                                <CText title={post.media} />
                                                <CText title={post.description} />
                                                <div className="postIcons">
                                                    <Heart className='icon' strokeWidth={'2px'} />
                                                    <MessageSquareText className='icon' strokeWidth={'2px'} />
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
        </div>
    )
}