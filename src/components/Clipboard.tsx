import { MdCopyAll } from "react-icons/md"
import { useCopyToClipboard } from "usehooks-ts"
import { FC, useEffect, useState } from "react"

interface ClipboardProps {
  text: string
}

const Clipboard: FC<ClipboardProps> = ({ text }) => {
  const [value, copy] = useCopyToClipboard()
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (value) {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 1000)
    }
  }, [value])

  return (
    <>
      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-info">
            <span>Successfully copied</span>
          </div>
        </div>
      )}
      <button
        onClick={() => copy(text)}
        className="absolute text-black bg-transparent rounded-full px-2 py-2 shadow-md hover:bg-gray-200 focus:outline-none ml-2 my-2"
      >
        <MdCopyAll className="w-5 h-5 text-white" />
      </button>
    </>
  )
}

export default Clipboard
