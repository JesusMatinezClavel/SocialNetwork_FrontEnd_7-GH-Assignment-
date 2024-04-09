//Styles
import './details.css'

//Methods/Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//React Components
import { CText } from "../../common/c-text/cText";
import { CCard } from "../../common/c-card/cCard";

//Redux
import { useSelector } from "react-redux";
import { chatData } from "../../app/slices/chatSlice";
import { userData } from "../../app/slices/userSlice";


export const Details = () => {

    const navigate = useNavigate()

    const rdxChat = useSelector(chatData)
    const rdxUser = useSelector(userData)

    useEffect(() => {
        !rdxUser.credentials.userToken || !rdxChat.chat.chat
            ? navigate('/login')
            : null
    }, [])



    return (
        <div className="detailsDesign">
            {
                <CCard>
                    <CText title={rdxChat.chat.chat.sender} />
                    <CText title={rdxChat.chat.chat.receiver} />
                    <CText title={rdxChat.chat.chat.message} />
                </CCard>
            }
        </div>
    )
}