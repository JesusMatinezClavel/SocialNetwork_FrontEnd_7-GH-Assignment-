// Styles
import './login.css'

// Methos/modules

//React components
import { CInput } from "../../common/c-input/cInput";
//Redux


export const Login = () => {
    return (
        <div className="loginDesign">
            <CInput
            className={'CI-LoginDesign'}
                type={"text"}
                name={"firstName"}
                value={""}
                placeholder={"input your first name"}
            />
        </div>
    )
}