import {useState} from "react"
import ImageGallery from "../components/ImageGallery"
import Navbar from "../components/Navbar"
import UploadForm from "../components/UploadForm"


const Home = () => {
    const [dropdown, setDropdown] = useState<string | null>(null)
  const handleItemClick = (item: string) => {
    // Do something with the selected item value
    console.log("Selected item:", item)
    setDropdown(item)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <UploadForm handleItemClick={handleItemClick} setDropdown={setDropdown} dropdown={dropdown} />
      <ImageGallery dropdown={dropdown} />
    </div>
  )
}

export default Home