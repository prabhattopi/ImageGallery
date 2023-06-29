
  import { collection, query,onSnapshot, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import {useState,useEffect} from "react"

export type Image = {
  imageUrl: string
  userEmail: string
  createdAt: Date
}
const useGetData = (collectionName:string) => {

  const [docs, setDocs] = useState<Image[]>([])
  const [loading,setLoading]=useState<boolean>(true)
  

  useEffect(() => {
    let unsubscribe:()=>void
    const getData = async () => {
      try {
        const q = query(collection(db,collectionName),orderBy("createdAt","desc"))
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images:Image[] = []
          querySnapshot.forEach((doc) => {
            images.push({imageUrl: doc.data().imageUrl,createdAt:doc.data().createdAt.toDate(),userEmail:doc.data().userEmail})
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
  }, [collectionName])
  
  return {docs,loading}
}

export default useGetData