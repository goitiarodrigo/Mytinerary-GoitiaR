import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import GoogleLogin from 'react-google-login'


const Login = (props) => {
    const [userLog, setUserLog] = useState({email: "", password: ""})
    const userLogin = (e) =>{
        setUserLog({...userLog, [e.target.name]: e.target.value})
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      const responseGoogle = (response) => {
        let newUserWithGoogle = {
            email: response.profileObj.email, 
            password: response.profileObj.googleId
        }
        props.logIn(newUserWithGoogle)
        .then((res) => {
        if (!res.respuesta.data.success){
            Toast.fire({
                icon: 'error',
                title: 'Email or password incorrect'
                })
        }else{
            Toast.fire({
                icon: 'success',
                title: 'Welcome'
                })
        }
    }).catch((e) => console.log(e))}

    const submitUserLog = () =>{
        props.logIn(userLog)
        .then((res) => {for (var i in userLog){
            if(!userLog[i].length){
                Toast.fire({
                    icon: 'error',
                    title: 'The field complete is: '+ [i]
                  })
                break
            }
            if (res.respuesta.data.success){
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully. Welcome'
              })
                
        }else if (!res.respuesta.data.success) {
            Toast.fire({
                icon: 'error',
                title: 'Password or email incorrect'
              })
        }else throw new Error()
    }
    }).catch(e => Toast.fire({
                    icon: 'error',
                    title: "Oops, something went wrong"
                }))}

    return (
        <div className = "sign" style={{backgroundImage: "url('https://fondosmil.com/fondo/21037.jpg')"}}>
            <div id = "gradient"><Header/></div>
            <div className = "inputs inputs2">
                <div>
                    <input type="email" placeholder="Enter your email" name="email" value={userLog.email} onChange={userLogin}/>
                    <input type="password" placeholder="Enter your password" name="password" value={userLog.password} onChange={userLogin}/>
                    <button id= "buttonSign" onClick ={submitUserLog}>Login</button>
                    <GoogleLogin
                        clientId="564301942115-skr3qljqv4t42m3vb7icf1mi1ive9r2g.apps.googleusercontent.com"
                        buttonText="Login with Google account"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />,
                    <p>Don't have an account? <Link to = "/signup">Sign up here!</Link></p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const mapDispatchToProps = {
    logIn: usersActions.logIn
}

export default connect(null, mapDispatchToProps)(Login)