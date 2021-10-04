import Footer from "../components/Footer"
import Header from "../components/Header"
import CitiesComp from "../components/CitiesComp";

const Cities = () => {
    return (
        <>
        <Header />
            <div id = "fotoHeader" style = {{backgroundImage: "url('./assets/header.jpg')"}}></div>
        <CitiesComp />
        <Footer />
        </>
    )
}
export default Cities