import { connect } from "react-redux"
import CommentComp from "./CommentComp"
import itinerariesActions from "../redux/actions/itinerariesAction"
import { useRef, useState } from "react"
import Swal from 'sweetalert2'


const CommentsComp = (props) => {

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

    const [render, setRender] = useState(false)

    const [allComment, setAllComment] = useState(props.currentComment)

    const inputValue = useRef()
  
const deleteCom=(idItinerary, commentId, token)=>{
    props.deleteComment(idItinerary, commentId, token)
    .then(res=>{
        if(res.success) setAllComment(allComment.filter(comment => comment._id !== commentId))
        else throw new Error()
    })
    .catch((e)=> console.log(e))
}



const editComment = (commentId, comment, token)=> {
    props.changeComment(commentId, comment, token)
    .then((res)=> {allComment.map(oneComment => {
                    if (oneComment._id === commentId){
                        oneComment.comment=comment
                    }
    })
        setAllComment(allComment)   
        setRender(!render)
    })
    .catch((e)=> console.log(e))
}

const sendHandler = () =>{
    let valueComment = inputValue.current.value
    
    props.addComment(props.itineraryId, valueComment, props.token)
    .then(res=> setAllComment(res.response.data.response), inputValue.current.value="")
    .catch(e=> console.log(e))
}

const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        sendHandler()
    }
  }

  const warning = () => {
    Toast.fire({
        icon: 'error',
        title: "You need log for comment"
      }) 
    
  }

    return (
        <>
        <h4>Comments</h4>
        <div id = "commentsContainer">
            {allComment.map((comment, index) => <CommentComp key={index} commentCurrent={comment} delete={deleteCom} itineraryId={props.itineraryId} edithComment={editComment} renderizar={render}/> )}
        </div>   
            <div id = "comment">
                <input type="text" ref={inputValue} placeholder={props.token ? "Write a comment" : "You need log for comment"} disabled={props.token ? false : true} onKeyPress={handleKeyPress}/>   
                <button onClick={props.token ? sendHandler : warning}>✔️</button>
            </div> 

        </>
    )
}



const mapStateToProps = (state) => {
    return {
       token: state.users.token,
    }
 }

const mapDispatchToProps = {
    changeComment: itinerariesActions.modifyComment,
    deleteComment: itinerariesActions.deleteComment,
    addComment: itinerariesActions.addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComp)