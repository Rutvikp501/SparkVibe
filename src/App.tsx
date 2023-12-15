
import "./globals.css";
import { Routes,Route } from "react-router-dom";
import Home from "./_root/pages/Home"
import SigninForm from './_auth/forms/SigninForm'

const App = () => {
  return (
    <main className="flex h-screen">
   <Routes>
    {/* public Routes */}
    <Route path="/sign-in" element={<SigninForm/>} />

    {/* Private Routes */}
    <Route index  element={<Home/>} />
   </Routes>

    </main>
  )
}

export default App
// color heightlight , tailwind css intellisense 20:41