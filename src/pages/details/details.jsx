//Styles
import './details.css'

//Methods/Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageSquareText, UserRoundCheck, UserCheck, SquareArrowOutUpRight } from "lucide-react";


//React Components
import { CText } from "../../common/c-text/cText";
import { CCard } from "../../common/c-card/cCard";

//Redux
import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailSlice";
import { userData } from "../../app/slices/userSlice";


export const Details = () => {

    const navigate = useNavigate()

    const rdxDetail = useSelector(detailData)
    const rdxUser = useSelector(userData)


    useEffect(() => {
        (!rdxUser?.credentials?.userToken) && ((!rdxDetail?.detail?.chat) || (!rdxDetail?.detail?.post))
            ? navigate('/login')
            : null
    }, [])



    return (
        <div className="detailsDesign">
            {
                rdxDetail.detail.chat && (
                    <CCard>
                        <CText title={rdxDetail?.detail?.chat?.sender} />
                        <CText title={rdxDetail?.detail?.chat?.receiver} />
                        <CText title={rdxDetail?.detail?.chat?.message} />
                    </CCard>
                )
            },
            {
                rdxDetail.detail.post && (
                    <CCard className={'postCard'}>
                        <div className="postIconsTop">
                            <SquareArrowOutUpRight className='icon'/>
                        </div>
                        <CText className={'postTitle'} title={rdxDetail?.detail?.post?.title} />
                        <CText className={'postImg'}>
                            <img src={rdxDetail?.detail?.post?.media} alt={`${rdxDetail?.detail?.post?._id}'s media`} />
                        </CText>
                        <CText className={'postText'} title={rdxDetail?.detail?.post?.description} />
                        <div className="postIconsBot">
                            <Heart className='icon' strokeWidth={'2px'} />
                            <CText title={rdxDetail?.detail?.post?.likes.length} />
                            <MessageSquareText className='icon' strokeWidth={'2px'} />
                            <CText title={rdxDetail?.detail?.post?.comments.length} />
                        </div>
                    </CCard>
                )
            }
        </div>
    )
}