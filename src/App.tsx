import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Error from "./pages/Error"
import NewRequestForm from "./pages/NewRequestForm"
import { LoginContext } from "./contexts/loginContext"
import { useState } from "react"
import Unauthorized from "./pages/Unauthorized"

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
             <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
                <Login />
             </LoginContext.Provider>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/new-request" element={<NewRequestForm />} />
          <Route path="/403" element={<Unauthorized />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
