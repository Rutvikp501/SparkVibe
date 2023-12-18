
import "./globals.css";
import { Routes, Route } from "react-router-dom";
import Home from "./_root/pages/Home"
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public Routes */}
        <Route element={<AuthLayout />}>

          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />

        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />

        </Route>
      </Routes>

    </main>
  )
}

export default App
// color heightlight , tailwind css intellisense 
// cONTINUE FROM => 1:00:33 
// .env.local 
// VITE_APPWRITE_PROJECT_ID="65719bef5e258e8be4fe"
// VITE_APPWRITE_URL='https://cloud.appwrite.io/v1'
// VITE_APPWRITE_STORAGE_ID='658030ccbfec6f0a5d75'
// VITE_APPWRITE_DATABASE_ID='65803136a77357fff63d'