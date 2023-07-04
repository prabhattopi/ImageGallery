import { FiDownloadCloud } from "react-icons/fi"
import { FC } from "react"

interface DownloadButtonProps {
  text: string
  handleClick: (text: string, download:string) => void
  showToast: boolean
}

const DownloadButton:FC<DownloadButtonProps> = ({handleClick,showToast,text}) => {

  
  return (
    <>
      <button
        onClick={() => handleClick(text,"downlaad")}
        disabled={showToast}
        className={`absolute z-10 ${
          showToast ? "cursor-not-allowed" : "cursor"
        } text-black bg-transparent rounded-full px-2 py-2 shadow-md hover:bg-gray-500 focus:outline-none ml-2 my-12`}
      >
        <FiDownloadCloud className="w-5 h-5 text-gray-300" />
      </button>
    </>
  )
}

export default DownloadButton
