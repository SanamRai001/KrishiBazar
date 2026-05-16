
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="flex flex-col gap-2">
          <div className="flex  flex-row gap-4 text-green-800 font-semibold">
            <img src="./kishanLogo.png" alt="Kishan Logo" className="w-8 h-8 object-contain"  />
            <h1 >Krishi  Bazar</h1>
          </div>
          <p className="text-sm">
            &copy; Krishi Bazar. Fresh from the field. Empowering local farmers throguh technology.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-green-800 font-semibold">CATEGORIES</h1>
          <ul className="text-sm">
            <li>Vegetables</li>
            <li>Fruits</li>
            <li>Grains</li>
            <li>Seeds</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-green-800 font-semibold">SUPPORT</h1>
          <ul className="text-sm">
            <li>Help Center</li>
            <li>Farmer Registration</li>
            <li>Delivery Areas</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-green-800 font-semibold">STAY CONNECTED</h1>
          <div className="flex flex-col gap-2 text-sm">
            <p>Subscribe for seasonal harvests and best prices.</p>
            <div className="flex ">
              <input type="email" placeholder="Your email" className="border-cyan-800"/>
              <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-11  h-11 object-contain"><path d="M544 160C544 124.7 515.3 96 480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160zM416 320C416 326.7 413.2 333 408.3 337.6L296.3 441.6C289.3 448.1 279.1 449.8 270.4 446C261.7 442.2 256 433.5 256 424L256 216C256 206.5 261.7 197.8 270.4 194C279.1 190.2 289.3 191.9 296.3 198.4L408.3 302.4C413.2 306.9 416 313.3 416 320z"/></svg></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer