import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import PublicRoutes from "./routes/PublicRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"
import ImageName from "./components/ImageName"
import { useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import { saveAs } from "file-saver"
function App() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState<string>("")
  const [, copy] = useCopyToClipboard()
  const [modal,setModal]=useState(true)
  const handleClick = async (text: string, order: string) => {
    if (order == "copy") {
      copy(text)

      setToastMessage("Copied Succefully !")
    } 
    else {
      try {
        // Fetch the image data from the URL
        const response = await fetch(text);
        const blob = await response.blob();

        // Use file-saver to trigger the download
        saveAs(blob, "image.png");

        setToastMessage("Downloaded Successfully !");
      } catch (error) {
        console.error("Error downloading image:", error);
        setToastMessage("Error downloading image!");
      }
    }

    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
      setToastMessage("")
    }, 1000)
  }

  return (
    <>
      <div className={`fade-overlay ${modal ? "fade-overlay-visible" : ""}`} />
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
          <div className="">
            <input
              type="text"
              placeholder="Enter your text"
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
            />
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 mr-2 rounded">
                Button 1
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
                Button 2
              </button>
            </div>
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
