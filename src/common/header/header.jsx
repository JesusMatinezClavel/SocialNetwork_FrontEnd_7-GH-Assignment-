//Styles
import './header.css'

//Methods/Modules
import { useNavigate } from "react-router-dom";

//React Components
import { Navigator } from "../navigator/navigator";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

export const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rdxUser = useSelector(userData)

    const logOutInput = () => {
        dispatch(logout({ credentials: {} }))
        navigate('/')
    }

    return (
        <div className="headerDesign">
            <div className="homeHeader">
                <Navigator destination={"/"} title={"Home"} />
            </div>
            {
                rdxUser.credentials.userToken
                    ? (
                        <div className="navBarHeader">
                            <Navigator destination={"/profile"} title={"Profile"} />
                            <div className="logOut" onClick={() => logOutInput()}>
                                <Navigator destination={"/"} title={"Logout"} />
                            </div>
                        </div>
                    ) : (
                        <div className="navBarHeader">
                            <Navigator destination={"/register"} title={"Register"} />
                            <Navigator destination={"/login"} title={"Login"} />
                        </div>
                    )
            }
        </div >
    )
}