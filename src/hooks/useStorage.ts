import { useState } from "react"
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { storage } from "../firebase/config"
const useStorage=()=>{
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<Error | null>(null)
  const [url, setUrl] = useState<string | null>(null)

  const startUpload = (file:File) => {
  
    //when click
    if(!File){
      return;
    }
    const fileId = Date.now().toString()
    const fileType = file.type.split("/")[1]
    
    const storageRef = ref(storage, `images/${fileId}.${fileType}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
          setProgress(progress)
      },
      (error:Error) => {
       setError(error)
      },
      () => {
       
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL)
          setUrl(downloadURL)
          setProgress(progress)
        })
        
      }
    )

    
        
  }
  
       return {progress, error, startUpload}
}
export default useStorage