
const ProductCard = ({name, price, image, category, seller}) => {
  return (
    <>
      <div className="productCard">
        <img src={image} alt={name} className="rounded-2xl"/>
        <div className="productCardContent">
          <div className="flex flex-row justify-between">
            <p>{category}</p>
            <p className="flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 object-contain  text-green-600"><path fill="currentColor" d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/></svg>verified
            </p>
          </div>
          <div>
            <p>{name}</p>
            <p>{seller}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Rs.{price}</p>
            <button type="button">{/* cartIcon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1" fill="currentColor" />
          <circle cx="20" cy="21" r="1" fill="currentColor" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard