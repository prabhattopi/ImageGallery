import {useState,FC} from "react"
import ImageGallery from "../components/ImageGallery"
import Navbar from "../components/Navbar"
import UploadForm from "../components/UploadForm"


interface HomePorps {
  handleClick:(prev:string,order:string)=>void
  showToast:boolean
}
const Home: FC<HomePorps> = ({handleClick,showToast }) => {
  const [dropdown, setDropdown] = useState<string | null>(null)
  const handleItemClick = (item: string) => {
    // Do something with the selected item value
    console.log("Selected item:", item)
    setDropdown(item)
  }


 
  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />

      <UploadForm
        handleItemClick={handleItemClick}
        setDropdown={setDropdown}
        dropdown={dropdown}
      />
      <ImageGallery
        showToast={showToast}
        handleClick={handleClick}
        dropdown={dropdown}
      />
    </div>
  )
}

export default Home