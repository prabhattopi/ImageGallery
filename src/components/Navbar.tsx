import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"


const Navbar = () => {
  const handleLogout = async () => {
    try {
        await signOut(auth)
    }
    catch (err) { 
      console.log(err)
    }
  }
  return (
    <div className="navbar bg-base-100 justify-between">
    <a className="font-bold normal-case text-xl underline">Prabhat's Gallery 🎦</a>
    <button onClick={handleLogout} className="bg-blue-300 text-white btn btn-ghost normal-case text-xl hover:bg-blue-500">Logout</button>


  </div>
  )
}

export default Navbar