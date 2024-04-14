//Styles
import './header.css'

//Methods/Modules
import { useNavigate } from "react-router-dom";

//React Components
import { Navigator } from "../navigator/navigator";
import { LogOut, UserRound } from "lucide-react";


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
            const fetched = await logoutService(rdxUser?.credentials?.userToken)

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
                !rdxUser?.credentials?.userToken
                    ? (
                        <div className="navBar" onClick={()=>navigate('/')}>
                            <img src="../../../img/logotitle.png" alt="" />
                        </div>
                    ) : rdxUser?.credentials?.userTokenData?.roleName === 'superadmin'
                        ? (
                            <div className="navBar">
                                <div className="homeHeader">
                                    <Navigator destination={"/"}>
                                        <img src="../../../img/logo.png" alt="" />
                                    </Navigator>
                                </div>
                                <div className="navBarSeparator"></div>
                                <div className="navBarHeader">
                                    <Navigator className={'topNavBar'} destination={"/superadmin"} title={'Utilities'} />
                                    <Navigator className={'topNavBar'} destination={"/profile"}>
                                        <UserRound />
                                    </Navigator>
                                    <Navigator className={'topNavBar'} destination={"/"}>
                                        <LogOut onClick={() => logOutInput()} />
                                    </Navigator>
                                </div>
                            </div>
                        )
                        : (
                            <div className="navBar">
                                <div className="homeHeader">
                                    <Navigator destination={"/home"}>
                                        <img src="../../../img/logo.png" alt="" />
                                    </Navigator>                                </div>
                                <div className="navBarHeader">
                                    <Navigator className={'topNavBar'} destination={"/profile"}>
                                        <UserRound />
                                    </Navigator>                                    <LogOut onClick={() => logOutInput()}>
                                        <Navigator destination={"/"} />
                                    </LogOut>
                                </div>
                            </div>
                        )
            }
        </div >
    )
}