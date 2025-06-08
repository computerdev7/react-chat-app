import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import LoginSignup from "./pages/loginsignup.jsx"
import Home from "./pages/home.jsx"
import Profile from "./pages/profile.jsx"

export default function App(){
  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </Router>
    </>
  )
}