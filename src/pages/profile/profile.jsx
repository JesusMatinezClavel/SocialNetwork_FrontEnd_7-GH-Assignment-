//Styles
import './profile.css'

//Methods/Modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnProfileService } from "../../services/apiCalls";
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

    if (!rdxUser.credentials.userToken) {
        navigate('/')
    }

    useEffect(() => {
        document.title = `${rdxUser.credentials.userTokenData.nickName} Profile`;
    }, [])

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

    useEffect(() => {
        const getOwnProfile = async () => {
            try {
                const fetched = await getOwnProfileService(rdxUser.credentials.userToken[0])
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
        getOwnProfile()
    }, [])

    console.log(profileData);

    return (
        <div className="row">
            <div className="profileDesign" >
                <div className="container-fluid col-xl-2 col-lg-2 col-md-12 col-sm-12">
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
                <div className="container-fluid col-xl-7 col-lg-7 col-md-12 col-sm-12">
                    <CCard className={'profileDataCard'}>
                        Chats<br />
                        posts<br />
                        followers || follows<br />
                    </CCard>
                </div>
                <div className="container-fluid col-xl-2 col-lg-2 col-md-12 col-sm-12">
                    <CCard className={'profileFiltersCard'}>
                    </CCard>
                </div>
            </div >
        </div>
    )
}