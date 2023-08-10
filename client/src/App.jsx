import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import SignUp from "./components/SignUp"
import Navbar from "./components/Navbar"
import VerifyEmail from "./features/users/VerifyEmail"
import ForgotPassword from "./features/users/ForgotPassword"
import ResetPassword from "./features/users/ResetPassword"
import UpdatePassword from "./features/users/UpdatePassword"
import { selectCurrentToken } from './features/auth/authSlice'
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const auth = useSelector(selectCurrentToken)

  return (
    <>
      <BrowserRouter>
        <Navbar auth={auth} />
        <Routes>
          <Route index element={<Home />} />
          {!auth && <Route path="/login" element={<Login />} />}
          {auth && <Route path="/logout" element={<Logout />} />}
          {!auth && <Route path="/signup" element={<SignUp />} />}
          {!auth && <Route path="/verify" element={<VerifyEmail />} />}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App