// Styles
import './superadmin.css'

// Methos/modules
import { deleteUserSuperadminService, getAllPostsSuperadminService, getAllUsersSuperadminService, getAuthorService } from "../../services/apiCalls";
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
    const [authors, setAuthors] = useState([])
    const [userLimit, setUserLimit] = useState(5)
    const [userPage, setUserPage] = useState(1)
    const [postLimit, setPostLimit] = useState(5)
    const [postPage, setPostPage] = useState(1)

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
        // if (allPosts.length > 5) {
        //     allPosts.map(post => {
        //         const getAuthors = async () => {
        //             try {
        //                 const fetched = await getAuthorService(rdxUser?.credentials?.userToken, post.author)
        //                 setAuthors((prevState) => (
        //                     [...prevState, fetched.data]
        //                 ))
        //             } catch (error) {
        //                 if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
        //                     dispatch(logout({ credentials: {} }))
        //                 } else {
        //                     console.log(error);
        //                 }
        //             }
        //         }
        //         getAuthors()
        //     })
        // }
    }, [allUsers, allPosts])

    // useEffect(() => {
    //     allPosts.map(post => {
    //         const getAuthors = async () => {
    //             try {
    //                 const fetched = await getAuthorService(rdxUser?.credentials?.userToken, post.author)
    //                 setAuthors((prevState) => (
    //                     [...prevState, fetched.data]
    //                 ))
    //             } catch (error) {
    //                 if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
    //                     dispatch(logout({ credentials: {} }))
    //                 } else {
    //                     console.log(error);
    //                 }
    //             }
    //         }
    //         getAuthors()
    //     })
    // }, [allPosts])

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
        const getallPosts = async () => {
            try {
                const fetched = await getAllPostsSuperadminService(rdxUser?.credentials?.userToken, userLimit, userPage)
                fetched.data.length !== 0
                    ? setAllPosts(fetched.data)
                    : setAllPosts([])
            } catch (error) {
                if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                    dispatch(logout({ credentials: {} }))
                } else {
                    console.log(error);
                }
            }
        }
        getallUsers()
    }, [userLimit, userPage, postLimit, postPage])

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

    const deleteUser = async (index) => {
        const user = allUsers[index]
        try {
            if (user.role !== 'superadmin') {
                const fetched = await deleteUserSuperadminService(rdxUser.credentials.userToken, user._id)
                if (!fetched.success) {
                    throw new Error(fetched.message)
                }
                const updatedUsers = allUsers.filter(element => element !== user)
                setUserLimit(userLimit - 1)
                setAllUsers(updatedUsers)
            }
        } catch (error) {
            if (error === "TOKEN NOT FOUND" || error === "TOKEN INVALID" || error === "TOKEN ERROR") {
                dispatch(logout({ credentials: {} }))
            } else {
                console.log(error);
            }
        }
    }

    const plusPostLimit = () => {
        setPostLimit(postLimit + 1)
    }
    const minusPostLimit = () => {
        setPostLimit(postLimit - 1)
    }
    const plusPostPage = () => {
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
                                    <CButton title={'delete'} onClick={() => deleteUser(index)} />
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
                    <CText className={'utilitiesTitle'} title={'Posts'} />
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
                <div className="utilitiesContent">
                    {
                        allPosts.map((post, index) => (
                            <CCard key={`post-${post._id}-${index}`} className={post._id % 2 === 0 ? 'utilitiesPosts' : 'utilitiesPostsReverse'}>
                                <div className="post">
                                    <CButton title={'delete'} onClick={() => deletePost(index)} />
                                    {/* <CText className={'utilitiesPost'} title={post.author} /> */}
                                    {/* <div className="divider"></div> */}
                                    <CText className={'utilitiesPost'} title={post.title} />
                                    <div className="divider"></div>
                                    <CText className={'utilitiesPost'} title={post.description} />
                                </div>
                                <div className="dividerSide"></div>
                            </CCard>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}