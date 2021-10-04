import Carousel from 'react-bootstrap/Carousel'
import CommentsComp from "./CommentsComp"


const ActivitiesComp = (props) => {
    return (
        <>
            <div id= "carouselContainer">
                <div id= "carouselContainerSec">
                    <Carousel className="carrouselActivities">
                        {props.activities.map((activity, index) => {
                        return ( 
                            <Carousel.Item key={index} interval={2000} className="photoAContainer">
                                <div className="activityPhoto" style={{backgroundImage:`url("${activity.picAct}")`}} />
                                <Carousel.Caption className="caption">
                                    <p>{activity.title}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )})}
                    </Carousel>
                </div>
                <div id = "containerComments">   
                    <CommentsComp itineraryId = {props.itineraryId} currentComment={props.comments}/>
                </div>
           </div>    
        </>
    )
}




export default ActivitiesComp