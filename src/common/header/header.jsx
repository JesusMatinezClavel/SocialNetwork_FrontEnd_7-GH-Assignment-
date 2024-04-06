//Styles
import './header.css'

//Methods/Modules

//React Components
import { Navigator } from "../navigator/navigator";


export const Header = () => {
    return (
        <div className="headerDesign">
            <Navigator destination={"/login"} title={"Login"} />
            <Navigator destination={"/register"} title={"Register"} />
        </div>
    )
}