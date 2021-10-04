import React from "react"
import { Link} from "react-router-dom"


const Hero = () => {
  return (
    <div className = "hero" style= {{backgroundImage: "url('/assets/flechasnav2.jpg')"}}>
        <img id = "logo" src="./assets/LOGO2.png" alt = "..."/>
        <div id = "botonAccion">
          <p>
          Find your perfect trip, designed by insiders who know and love their cities!
          </p>
          <Link to = "/cities"><button>CLICK HERE!</button></Link>
        </div>
    </div>
  )
}
export default Hero