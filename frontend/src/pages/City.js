import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import ItineraryComp from "../components/ItineraryComp"
import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesAction"
import itinerariesActions from "../redux/actions/itinerariesAction"
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

const City = (props) => {
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!props.cities.length){
            props.history.push("/cities")
            return false
        } 
        async function getCity(){
            try {
               await props.city(props.match.params.id)
            }catch (e) {
                alert("Will be redirected to Home page")
                props.history.push("/home")
            }
        }
    getCity()
    
    async function getItineraries(){
        try {
           await props.getItineraries(props.match.params.id)
        }catch (e) {
            alert("Will be redirected to Home page")
            props.history.push("/home")
        }
        setLoading(false)
    }
        getItineraries()
        
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading){
        return (
            <div id = "loader">
                <img src="https://cdn.discordapp.com/attachments/871774608515280896/876197618932396062/gif-aviao.gif" alt="loading"/>
            </div>
        )
    } 
    
    return (
        <div id = "city">
            <Header />
            <div id ="headerCity" style = {{backgroundImage: `url('${props.cityOne.photo}')`}}><h1>{props.cityOne.city}</h1> (<h3>{props.cityOne.country})</h3></div>

                {props.itineraries.length > 0 ? props.itineraries.map(itinerario => <ItineraryComp key = {itinerario._id} itinerario = {itinerario}/>) : <div id = "itinerariesNotFound"><h1>This city has no itineraries yet</h1><img src= "https://blog.ida.cl/wp-content/uploads/sites/5/2017/03/Tra%CC%81fico-de-bu%CC%81squeda-en-Search-Console.jpg" alt = "..."/></div>}
               <Link to = "/cities"><h2 id = "back">GO BACK!</h2></Link>
            <Footer />
        </div>
    )
}

const mapDispatchToProps = {
    getCities: citiesActions.recCities,
    getItineraries: itinerariesActions.getItinerariesCity,
    city: citiesActions.getCity
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities.cityFiltered,
        itineraries: state.itineraries.allItineraries,
        cityOne: state.cities.city
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(City)