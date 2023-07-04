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
      {showToast && (
        <div className="mr-4 toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
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
