
  import { collection, query,onSnapshot, orderBy, where } from "firebase/firestore"
import { db } from "../firebase/config"
import {useState,useEffect} from "react"

export type Image = {
  imageUrl: string
  userEmail: string
  createdAt: Date
  filter:string
}
const useGetData = (collectionName:string,dropdown:string|null) => {

  const [docs, setDocs] = useState<Image[]>([])
  const [loading,setLoading]=useState<boolean>(true)
  

  useEffect(() => {
    let unsubscribe:()=>void
    const getData = async () => {
        let q
      try {
       q= query(collection(db, collectionName), orderBy("createdAt", "desc"));
        console.log(dropdown)
         const fileInput = document.getElementById(
           "file-input"
         ) as HTMLInputElement
         if (dropdown&&fileInput.value==""&&dropdown!="All") {
           q = query(
             collection(db, collectionName),
             orderBy("createdAt", "desc"),
             where("filter", "==", dropdown )
           )
         }
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images:Image[] = []
          querySnapshot.forEach((doc) => {
            images.push({imageUrl: doc.data().imageUrl,createdAt:doc.data().createdAt.toDate(),userEmail:doc.data().userEmail,filter:doc.data().filter})
          })
          setDocs(images)
          setLoading(false)
        })
      }
      catch (error) {
        console.log(error)
        setLoading(false)
      }
      
    }
  
    getData()
    return ()=>unsubscribe && unsubscribe()
  }, [collectionName,dropdown])
  
  return {docs,loading}
}

export default useGetData