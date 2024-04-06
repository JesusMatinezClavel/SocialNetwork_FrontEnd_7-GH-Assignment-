import { Routes, Route } from "react-router-dom";

import { Login } from "../login/login";
import { Register } from "../register/register";
import { Home } from "../home/home";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </>
    )
}