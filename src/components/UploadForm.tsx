import { useState } from "react"
import useStorage from "../hooks/useStorage"

enum DropdownItems {
  Item5= "All",
  Item1 = "Nature",
  Item2 = "Education",
  Item3 = "Girls",
  Item4 = "Boys",
  Item6= "Project"

  // Add more items as needed
}
interface UploadFormProps {
  handleItemClick: (item: DropdownItems) => void
  dropdown: string | null
  setDropdown: (item:string|null) => void
}

const UploadForm = ({ setDropdown, handleItemClick, dropdown }:UploadFormProps) => {
  const [selectFile, setSelectFile] = useState<File | null>(null)
  const { startUpload, progress } = useStorage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectFile(e.target.files[0])
       setDropdown(null)
    }
  }

  const resetFileInput = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.value = "" // Reset the value to empty string to visually clear the input field
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectFile) {
      // start upload
      console.log(selectFile)
      startUpload(selectFile, dropdown)
    }
    setSelectFile(null)
    setDropdown(null)
    resetFileInput()
  }

  return (
    <div className="text-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-8"
      >
        <div className="flex items-center gap-8 w-full justify-center">
          <input
            id="file-input" // Add an id to the file input for easier targeting
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <div className="dropdown w-80">
            <label tabIndex={0} className="btn m-1">
              {dropdown ? dropdown : "Please select a category"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52 z-[20]"
            >
              {/* Loop through the enum values and render the list items */}
              {Object.values(DropdownItems).map((item, index) => (
                <li key={index} onClick={() => handleItemClick(item)}>
                  <a>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          </div>
    

        <button
          type="submit"
          className={`btn gap-3 ${Boolean(progress) && "loading"}`}
          disabled={!selectFile || Boolean(progress) || !dropdown}
        >
          UPLOAD <span>🚀</span>
        </button>
      </form>
    </div>
  )
}

export default UploadForm
