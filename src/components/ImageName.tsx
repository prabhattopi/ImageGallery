

const ImageName = () => {
  return (
<dialog id="my_modal_1" className="modal z-100">
  <form method="dialog" onSubmit={(e)=>e.preventDefault()} className="modal-box">
    <h3 className="font-bold text-lg">Your Desired Image Name</h3>
    
    <div className="modal-action">
      
      <button className="btn">Download</button>
      <button className="btn">Close</button>
    </div>
  </form>
</dialog>
  )
}

export default ImageName