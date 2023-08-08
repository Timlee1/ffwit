import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import SignUp from "./components/SignUp"
import Navbar from "./components/Navbar"
import { selectCurrentToken } from './features/auth/authSlice'
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const auth = useSelector(selectCurrentToken)

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          {!auth && <Route path="/login" element={<Login />} />}
          {auth && <Route path="/logout" element={<Logout />} />}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App