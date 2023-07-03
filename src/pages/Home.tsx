import {useState} from "react"
import ImageGallery from "../components/ImageGallery"
import Navbar from "../components/Navbar"
import UploadForm from "../components/UploadForm"
import { useCopyToClipboard } from "usehooks-ts"


const Home = () => {
    const [dropdown, setDropdown] = useState<string | null>(null)
  const handleItemClick = (item: string) => {
    // Do something with the selected item value
    console.log("Selected item:", item)
    setDropdown(item)
  }
  const [showToast, setShowToast] = useState(false)
 const [,copy] = useCopyToClipboard()
  const handleClick = (text: string) => {
       copy(text)
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 1000)
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      {showToast && (
        <div className="mr-4 toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Successfully copied</span>
          </div>
        </div>
      )}
      <UploadForm
        handleItemClick={handleItemClick}
        setDropdown={setDropdown}
        dropdown={dropdown}
      />
      <ImageGallery showToast={showToast} handleClick={handleClick} dropdown={dropdown} />
    </div>
  )
}

export default Home