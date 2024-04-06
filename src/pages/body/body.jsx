import { Routes, Route } from "react-router-dom";

import { Login } from "../login/login";
import { Register } from "../register/register";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </>
    )
}