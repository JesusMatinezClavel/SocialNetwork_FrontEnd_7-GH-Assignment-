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
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)

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
                // setAllUsers([])
                const fetched = await getAllUsersSuperadminService(rdxUser?.credentials?.userToken, limit, page)
                setAllUsers(fetched.data)
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                } else {
                    console.log(error);
                }
            }
        }
        getallUsers()
    }, [limit, page])

    const plusLimit = () => {
        setLimit(limit + 1)
    }
    const minusLimit = () => {
        setLimit(limit - 1)
    }
    const plusPage = () => {
        setPage(page + 1)
    }
    const minusPage = () => {
        setPage(page - 1)
    }



    return (
        <div className="superadminDesign">
            <div className="userUtilities">
                <div className="utilitiesTitle">
                    <CText className={'utilitiesTitle'} title={'Users'} />
                    <div className="limit">
                        <SkipBack onClick={() => minusLimit()} />
                        <CText className={'utilitiesTitle'} title={`Limit: ${limit}`} />
                        <SkipForward onClick={() => plusLimit()} />
                    </div>
                    <div className="pages">
                        <SkipBack onClick={() => minusPage()} />
                        <CText className={'utilitiesTitle'} title={`Page: ${page}`} />
                        <SkipForward onClick={() => plusPage()} />
                    </div>
                </div>
                <div className="utilitiesContent">
                    {
                        allUsers.map((user, index) => (
                            <CCard className={'utilitiesUsers'}>
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
                                <CButton title={'delete'} />
                            </CCard>
                        ))
                    }
                </div>
            </div>
            <div className="postUtilities">
                <div className="utilitiesTitle">
                    <CText className={'utilitiesTitle'} title={'Posts'} />
                </div>
                <div className="utilitiesContent"></div>
            </div>
        </div>
    )
}