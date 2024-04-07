//Styles
import './profile.css'

//Methods/Modules
import { useState, useEffect } from "react";

//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData } from "../../app/slices/userSlice";


export const Profile = () => {

    const rdxUser = useSelector(userData)

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        nickName: "",
        profileImg: "",
        bio: "",
        birthDate: "",
        email: "",
        passwordBody: "",
    })

    useEffect(()=>{
        
    },[profileData])

    return (
        <div className="profileDesign" >
            <CCard>
                <CText title={'Profile'} />
            </CCard>
        </div >
    )
}