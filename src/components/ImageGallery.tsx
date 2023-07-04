
import ContentLoader from "react-content-loader"
import useGetData, { Image } from "../hooks/useGetData"
import Clipboard from "./Clipboard"
import SkeletonCard from "./SkeletonCard"
import { LazyLoadImage } from "react-lazy-load-image-component"
import DownloadButton from "./DownloadButton"

interface ImageGallery {
  dropdown: string | null
  handleClick: (text: string,order:string) => void
  showToast: boolean
 
}

const ImageGallery = ({
  dropdown,
  handleClick,
  showToast,

}: ImageGallery) => {
  const { docs, loading } = useGetData("images", dropdown)

  if (loading) {
    // Render skeleton while loading
    return (
      <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
        {/* Render 9 skeleton cards for the grid */}
        {Array.from({ length: 9 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
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
          <Clipboard
            showToast={showToast}
            handleClick={handleClick}
            text={e.imageUrl}
          />
          <DownloadButton
            showToast={showToast}
            handleClick={handleClick}
            text={e.imageUrl}
          />

          <figure className="max-h-[15rem]">
            <LazyLoadImage
              alt="images"
              src={e.imageUrl}
              placeholder={<ImagePlaceholder />}
            />
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

// Placeholder for the image while loading
const ImagePlaceholder = () => (
  <ContentLoader
    speed={2}
    width={260}
    height={300}
    viewBox="0 0 260 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="10" rx="5" ry="5" width="240" height="150" />
    <rect x="10" y="170" rx="3" ry="3" width="100" height="10" />
    <rect x="10" y="190" rx="3" ry="3" width="180" height="10" />
    <rect x="10" y="230" rx="3" ry="3" width="100" height="10" />
    <rect x="10" y="250" rx="3" ry="3" width="120" height="10" />
  </ContentLoader>
)

export default ImageGallery
