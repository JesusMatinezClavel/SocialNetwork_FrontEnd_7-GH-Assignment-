//Styles
import './profile.css'

//Methods/Modules

//React Components
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";
//Redux


export const Profile = () => {
    return (
        <div className="profileDesign">
            <CCard>
                <CText title={'Profile'} />
            </CCard>
        </div>
    )
}