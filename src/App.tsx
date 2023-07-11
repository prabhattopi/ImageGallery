import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import { useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import { saveAs } from "file-saver"
function App() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState<string>("")
  const [, copy] = useCopyToClipboard()
  const [modal, setModal] = useState(false)
  const [text, setText] = useState<string>("")
  const [imageName, setImageName] = useState<string>("")
  const handleClick = async (text: string, order: string) => {
    if (order == "copy") {
      copy(text)
      setToastMessage("Copied Succefully !")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        setToastMessage("")
      }, 1000)
    } else {
      try {
        // Fetch the image data from the URL
        setText(text)
        setModal(true)
      } catch (error) {
        console.error("Error downloading image:", error)
        setToastMessage("Error downloading image!")
      }
    }
  }
  const closeModal = () => {
    setModal(false)
    setText("")
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (imageName) {
        const response = await fetch(text)
        const blob = await response.blob()

        // Use file-saver to trigger the download
        saveAs(blob, `${imageName || "image"}.png`)
         setModal(false)
        setToastMessage("Downloaded Successfully !")
        
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
         
          setToastMessage("")
        }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-4 rounded-lg z-20">
            <h3 className="text-lg font-bold mb-4">Desired ImageName</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Image Name
                </label>
                <input
                  type="text"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder="only name don't put extentsion"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-lg px-4 py-1 text-sm font-medium text-white bg-blue-500  hover:bg-blue-600"
                >
                  Download
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center">
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home handleClick={handleClick} showToast={showToast} />
            </PrivateRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
      </Routes>
    </>
  )
}

export default App
