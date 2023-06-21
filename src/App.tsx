import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"

function App() {

  return (
  <Routes>
    <Route path="/" element={<PrivateRoutes><Home/></PrivateRoutes>}/>
    <Route path="/signup" element={<PublicRoutes><Signup/></PublicRoutes>}/>
  </Routes>
  )
}

export default App
