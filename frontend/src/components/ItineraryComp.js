import { useState } from "react"
import ActivitiesComp from "./ActivitiesComp"
import activitiesActions from "../redux/actions/activitiesAction"
import { connect } from "react-redux"
import Spinner from 'react-bootstrap/Spinner'
import itinerariesActions from "../redux/actions/itinerariesAction"
import Swal from 'sweetalert2'

const ItineraryComp = (props) => {
    const {price, hashtag, description, author, photo, duration, itinerary, likes, _id, comments} = props.itinerario
    const [button, setButton] = useState (true)
    const [activities, setActivities] = useState([])
    const [likeIcon, setLikeIcon] = useState(true) 
    const [itinerariesLike, setItinerariesLike] = useState(likes)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    
    const likeItineraryCulito = async () =>{
        setLikeIcon(false)
        if(!props.token){
            Toast.fire({
                icon: 'error',
                title: "You need log for to interact"
            }) 
        }else {
            let response = await props.likeItinerary(_id, props.token)
            setItinerariesLike(response.data.response)
        }
        setLikeIcon(true)
    }


    const viewHandler = () => {
        setButton(!button)

        if (button){
        async function getActivities(){
            try {
               let respuesta = await props.getActivities(_id)
               setActivities(respuesta)
            }catch (e) {
                console.log(e)
                // props.history.push("/home")
            }
        }
            getActivities()
        }
    }
    return (
        <>
            <div id= "picContainer">
                <div id = "card">
                    <img id = "foto" src = {photo} alt = "city"/>
                    <div id = "cardIn">
                        <div>
                            <img src = {author.photo} alt = "..."/>
                            <h2>{author.name}</h2>
                        </div>
                        <h2>{itinerary}</h2>
                        <p className = "description">{description}</p>
                        <div id = "iteraccion">
                            <div>
                                {hashtag.map((hash, index) => 
                                <p key = {index} className = "hash">{hash}</p>)}
                            </div>
                            <div id="likeButIt">
                                <button id="likeBut" onClick={(likeIcon ? likeItineraryCulito : null)}><p className = "like"> {itinerariesLike.includes(props._id) ? "❤️" : "🤍"}</p></button>
                                    <p>{itinerariesLike.length}</p>
                            </div>        
                        </div>
                        <div id="duration">
                            <p className = "duration">{"Price: "}{"💵".repeat(price)}</p>
                            <p className = "duration">Duration: {duration}hs 🕑</p>
                        </div>
                        <div id="buttonClick">
                            <button id="buttonOnClick" onClick={viewHandler}>{button ? "View more" : "View less"}</button>
                        </div>
                    </div>
                </div>
                {button  ? <h3 style = {{display:"none"}}>Under Construction</h3> 
                : <div style = {{display:"block"}}>{activities.length > 0 ? <ActivitiesComp  activities= {activities} itineraryId={_id} comments={comments}/> : <div id="loadingSpinner"><Spinner animation="border" variant="primary" /></div>}</div>}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
       token: state.users.token,
       _id: state.users._id
    }
 }

const mapDispatchToProps = {
    getActivities: activitiesActions.getActivitiesPerIt,
    likeItinerary: itinerariesActions.likeItinerary

}


export default connect(mapStateToProps, mapDispatchToProps)(ItineraryComp)