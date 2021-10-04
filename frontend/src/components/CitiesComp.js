import {useState, useEffect } from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import citiesActions from "../redux/actions/citiesAction";

const CitiesComp = (props) => {
    
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        async function getCities(){
            try {
              await props.getCities()
            }catch (e) {
                alert("Error. You don't have permission")
                props.history.push("/home")
            }
            setLoading(false)
        }

        getCities()
        
        // eslint-disable-next-line
    }, [])

    if (loading){
        return (
            
        <img id = "loader" src="https://cdn.discordapp.com/attachments/871774608515280896/876197618932396062/gif-aviao.gif" alt="loading"/>
        )
    } 

    const cityFilter = (e) => {
        props.filter(e.target.value)
        }
            
        return (
            <>
                <div id = "contenedorBuscador">
                        <input onChange = {cityFilter} type = "text" id = "buscador" placeholder = "Search your favorite city"/> 
                </div>
                {props.cityFiltrada.length === 0 ? <div id = "notFoundContainer"><h2>The city you are looking for is not in our database. Try again</h2> <div id ="notFoundCity" style ={{backgroundImage: "url('/assets/error.jpg')"}}></div></div>
                : props.cityFiltrada.map((city, index) =>
                <Link  key = {index} to = {`/city/${city._id}`}><div  className = "foto" id = {`fotoCity${index+1}`} style = {{backgroundImage: `url('${city.photo}')`}}><h4>{city.country}</h4><h2>{city.city}</h2></div></Link>)}
            </>
        )
    }

    const mapDispatchToProps = {
        getCities: citiesActions.recCities,
        filter: citiesActions.filterCity
    }

    const mapStateToProps = (state) => {
        return {
            cities: state.cities.allCities,
            cityFiltrada: state.cities.cityFiltered,
            token: state.users.token
        }
    }


export default connect(mapStateToProps, mapDispatchToProps)(CitiesComp)

