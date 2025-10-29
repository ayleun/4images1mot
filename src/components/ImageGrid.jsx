import './ImageGrid.css'

function ImageGrid({ images }) {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img 
            src={image} 
            alt={`Image ${index + 1}`}
            className="game-image"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGrid



