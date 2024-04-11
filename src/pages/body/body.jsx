//Styles

//Methods/Modules
import { Routes, Route } from "react-router-dom";

//React Components
import { Login } from "../login/login";
import { Register } from "../register/register";
import { Home } from "../home/home";
import { Profile } from "../profile/profile";
import { Details } from "../details/details";
import { Welcome } from "../welcome/welcome";

//Redux



export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/home' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/details' element={<Details />} />
            </Routes>
        </>
    )
}