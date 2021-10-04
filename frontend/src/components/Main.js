
import React from "react"
import Carrusel from "./Carrusel"
import Footer from "./Footer"

const Main = () => {
    return (
        <>
            <img id = "medio" src="./assets/medio.png" alt = "datos interesantes"/>
            <div id = "fondoMain" style = {{backgroundImage: `url("./assets/fondo.jpg")`}} >
                <h3 id="itinerario">Popular MYtineraries</h3>
                <Carrusel />
                <Footer />
            </div>
        </>
        
    )
}
export default Main