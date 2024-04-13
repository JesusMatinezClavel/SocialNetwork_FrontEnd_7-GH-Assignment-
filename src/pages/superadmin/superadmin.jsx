// Styles
import './superadmin.css'

// Methos/modules
import { getAllPostsSuperadminService, getAllUsersSuperadminService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SkipForward, SkipBack } from "lucide-react";


//React Components
import { CText } from "../../common/c-text/cText";
import { CButton } from "../../common/c-button/cButton";
import { CCard } from "../../common/c-card/cCard";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";




export const Superadmin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rdxUser = useSelector(userData)

    const [allUsers, setAllUsers] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [userLimit, setUserLimit] = useState(5)
    const [userPage, setUserPage] = useState(1)
    const [postLimit, setPostLimit] = useState(5)
    const [postPage, setPostPage] = useState(1)

    console.log(allUsers);

    useEffect(() => {
        const getallUsers = async () => {
            try {
                const fetched = await getAllUsersSuperadminService(rdxUser?.credentials?.userToken)
                setAllUsers(fetched.data)
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                } else {
                    console.log(error);
                }
            }
        }
        const getallPosts = async () => {
            try {
                const fetched = await getAllPostsSuperadminService(rdxUser?.credentials?.userToken)
                setAllPosts(fetched.data)
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                } else {
                    console.log(error);
                }
            }
        }
        if (allUsers.length === 0) {
            getallUsers()
        }
        if (allPosts.length === 0) {
            getallPosts()
        }
    }, [])

    useEffect(() => {
        const getallUsers = async () => {
            try {
                const fetched = await getAllUsersSuperadminService(rdxUser?.credentials?.userToken, userLimit, userPage)
                fetched.data.length !== 0
                    ? setAllUsers(fetched.data)
                    : setAllUsers([])
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                } else {
                    console.log(error);
                }
            }
        }
        getallUsers()
    }, [userLimit, userPage])

    const plusUserLimit = () => {
        setUserLimit(userLimit + 1)
    }
    const minusUserLimit = () => {
        setUserLimit(userLimit - 1)
    }
    const plusUserPage = () => {
        setUserPage(userPage + 1)
    }
    const minusUserPage = () => {
        setUserPage(userPage - 1)
    }

    const plusPostPLimit = () => {
        setPostLimit(postLimit + 1)
    }
    const minusPostPLimit = () => {
        setPostLimit(postLimit - 1)
    }
    const plusPostPPage = () => {
        setPostPage(postPage + 1)
    }
    const minusPostPage = () => {
        setPostPage(postPage - 1)
    }


    return (
        <div className="superadminDesign">
            <div className="userUtilities">
                <div className="utilitiesTitle">
                    <CText className={'utilitiesTitle'} title={'Users'} />
                    <div className="limit">
                        <SkipBack className='icons' onClick={() => minusUserLimit()} />
                        <CText className={'utilitiesTitle'} title={`Limit: ${userLimit}`} />
                        <SkipForward className='icons' onClick={() => plusUserLimit()} />
                    </div>
                    <div className="pages">
                        <SkipBack className='icons' onClick={() => minusUserPage()} />
                        <CText className={'utilitiesTitle'} title={`Page: ${userPage}`} />
                        <SkipForward className='icons' onClick={() => plusUserPage()} />
                    </div>
                </div>
                <div className="utilitiesContent">
                    {
                        allUsers.map((user, index) => (
                            <CCard key={`user-${user._id}`} className={user._id % 2 === 0 ? 'utilitiesUsers' : 'utilitiesUsersReverse'}>
                                <div className="user">
                                    <CButton title={'delete'} />
                                    <CText className={'utilitiesUser'} title={`${user.firstName} ${user.lastName}`} />
                                    <div className="divider"></div>
                                    <CText className={'utilitiesUser'} title={user.nickName} />
                                    <div className="divider"></div>
                                    <CText className={'utilitiesUser'} title={user.birthDate} />
                                    <div className="divider"></div>
                                    <CText className={'utilitiesUser'} title={user.age} />
                                    <div className="divider"></div>
                                    <CText className={'utilitiesUser'} title={user.email} />
                                    <div className="divider"></div>
                                    <CText className={'utilitiesUser'} title={user.bio} />
                                    <div className="divider"></div>
                                    <CText className={'utilitiesUser'} title={user.role} />
                                </div>
                                <div className="dividerSide"></div>
                            </CCard>
                        ))
                    }
                </div>
            </div>
            <div className="postUtilities">
                <div className="utilitiesTitle">
                    <CText className={'utilitiesTitle'} title={'Users'} />
                    <div className="limit">
                        <SkipBack className='icons' onClick={() => minusPostLimit()} />
                        <CText className={'utilitiesTitle'} title={`Limit: ${postLimit}`} />
                        <SkipForward className='icons' onClick={() => plusPostLimit()} />
                    </div>
                    <div className="pages">
                        <SkipBack className='icons' onClick={() => minusPostPage()} />
                        <CText className={'utilitiesTitle'} title={`Page: ${postPage}`} />
                        <SkipForward className='icons' onClick={() => plusPostPage()} />
                    </div>
                </div>
                <div className="utilitiesContent"></div>
            </div>
        </div >
    )
}