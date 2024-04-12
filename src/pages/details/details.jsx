//Styles
import './details.css'

//Methods/Modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageSquareText, UserRoundCheck, UserCheck, SquareArrowOutUpRight } from "lucide-react";


//React Components
import { CText } from "../../common/c-text/cText";
import { CCard } from "../../common/c-card/cCard";

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
        // try {
        //     const fetched = await addRemoveLikeService(rdxUser.credentials.userToken, post._id)
        //     if (!fetched.success) {
        //         throw new Error(fetched.message)
        //     }
        //     const updatedPosts = homePosts.map((post, i) => {
        //         if (i === index) {
        //             const updatedLikes = post.likes.includes(rdxUser.credentials.userTokenData.userId)
        //                 ? post.likes.filter(id => id !== rdxUser.credentials.userTokenData.userId)
        //                 : [...post.likes, rdxUser.credentials.userTokenData.userId];
        //             return { ...post, likes: updatedLikes };
        //         }
        //         return post;
        //     });
        //     setHomePosts(updatedPosts);
        // } catch (error) {
        //     console.log(error);
        // }
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
        </div>
    )
}