import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(email, password)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {
        error && error
      }
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Welcome to Prabhat's Gallery</h1>
            <p className="py-6">
              This is one of the best Image Gallery for the public to enhance
              their photographic skill, and also connect people socialy through
              their skills.
              <p className="py-3 text-2xl font-200">
                Please Singup to procced further{" "}
                <span className="hidden sm:inline">🙏</span>
              </p>
            </p>
          </div>
          <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Signup
