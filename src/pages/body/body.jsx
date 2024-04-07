import { Routes, Route } from "react-router-dom";

import { Login } from "../login/login";
import { Register } from "../register/register";
import { Home } from "../home/home";
import { Profile } from "../profile/profile";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </>
    )
}