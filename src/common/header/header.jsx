//Styles
import './header.css'

//Methods/Modules
import { useNavigate } from "react-router-dom";

//React Components
import { Navigator } from "../navigator/navigator";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { logoutService } from '../../services/apiCalls';

export const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const rdxUser = useSelector(userData)

    const logOutInput = async () => {
        try {
            const fetched = await logoutService(rdxUser.credentials.userToken)

            console.log(fetched);

            if (!fetched.success) {
                throw new Error(fetched.message)
            }

            dispatch(logout({ credentials: {} }))
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="headerDesign">
            {
                rdxUser.credentials.userToken
                    ? (
                        <div className="navBar">
                            <div className="homeHeader">
                                <Navigator destination={"/home"} title={"Home"} />
                            </div>
                            <div className="navBarHeader">
                                <Navigator destination={"/profile"} title={rdxUser.credentials.userTokenData.nickName} />
                                <div className="logOut" onClick={() => logOutInput()}>
                                    <Navigator destination={"/"} title={"Logout"} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="navBar">
                            <div className="homeHeader">
                                <Navigator destination={"/"} title={"Home"} />
                            </div>
                            <div className="navBarHeader">
                                <Navigator destination={"/register"} title={"Register"} />
                                <Navigator destination={"/login"} title={"Login"} />
                            </div>
                        </div>

                    )
            }
        </div >
    )
}