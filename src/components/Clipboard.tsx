import { MdCopyAll } from "react-icons/md"
import { FC } from "react"

interface ClipboardProps {
  text: string
  handleClick: (text: string,copy:string) => void
  showToast: boolean

}

const Clipboard: FC<ClipboardProps> = ({ text,handleClick,showToast}) => {
 


  return (
    <>
      <button
        
        onClick={() => handleClick(text,"copy")}
        disabled={showToast}
        className={`absolute z-10 ${
          showToast ? "cursor-not-allowed" : "cursor"
        } text-black bg-transparent rounded-full px-2 py-2 shadow-md hover:bg-gray-500 focus:outline-none ml-2 my-2`}
      >
        <MdCopyAll className="w-5 h-5 text-gray-300" />
      </button>
    </>
  )
}

export default Clipboard
