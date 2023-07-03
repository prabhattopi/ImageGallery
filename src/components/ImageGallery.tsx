import useGetData, { Image } from "../hooks/useGetData"
import Clipboard from "./Clipboard"
interface ImageGallery{
  dropdown:string|null
}
const ImageGallery = ({dropdown}:ImageGallery) => {
  const { docs, loading } = useGetData("images",dropdown)
  if (loading) {
    return (
      <div className="text-center flex justify-center align-middle mt-8">
        <progress className="progress w-56"></progress>
      </div>
    )
  }
  return (
    <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
      {docs?.map((e: Image) => (
        <div
          key={e.imageUrl}
          className="card card-compact w-full bg-base-100 shadow-xl"
        >
          <Clipboard text={e.imageUrl} />
          <figure className="max-h-[15rem]">
            <img src={e.imageUrl} alt="images" />
          </figure>
          <div className="card-body">
            <p>Upload by: {e.userEmail}</p>
            <span>Created on: {e.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
