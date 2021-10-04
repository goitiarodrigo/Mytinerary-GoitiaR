import { useRef } from "react"
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import Swal from 'sweetalert2'

const CommentComp = (props) => {


   

    const inputValue = useRef()
    const[inputChange, setInputChange] = useState(false)

    const userValid = props.commentCurrent.userId._id === props._id

    useEffect(()=>{
        setInputChange(false)
    }, [props.renderizar])

    const confirmToast = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            props.delete(props.itineraryId, props.commentCurrent._id, props.token)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        }

    const commentUser = 
    <div id="inputChange2">
        {!inputChange 
        ? <p>{props.commentCurrent.comment}</p> 
        :   <>
                <input type="text"  defaultValue={props.commentCurrent.comment} ref={inputValue} />
                <button onClick={()=> props.edithComment(props.commentCurrent._id, inputValue.current.value, props.token)}>✔️</button>
            </> }
            <div>
                <button onClick={()=>setInputChange(!inputChange)}>✏️</button>
                <button onClick={confirmToast}>🗑️</button>
            </div>    
    </div>

    const validComment = userValid ? (commentUser) : <p>{props.commentCurrent.comment}</p>



    return (
        <>
            <div id= "divInputChange">
                <img id= "picInputChange"src={props.commentCurrent.userId.photoUser} alt="..."/>
                <p id= "pInputChange">{props.commentCurrent.userId.name}</p>
            </div>    
            <div id="inputChange">
                    {/* <div id= "picInputChange" style={{backgroundImage:`url("${props.commentCurrent.userId.photoUser}")`}}></div> */}
                {validComment}
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


export default connect(mapStateToProps)(CommentComp)