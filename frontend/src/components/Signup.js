import axios from "axios"
import {useState, useEffect} from "react"
import Header from "./Header"
import Footer from "./Footer"
import Swal from 'sweetalert2'
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleLogin from 'react-google-login'


// 564301942115-skr3qljqv4t42m3vb7icf1mi1ive9r2g.apps.googleusercontent.com
const Signup = (props) => {
    useEffect(() =>{
        axios.get("https://restcountries.eu/rest/v2/all?fields=name")
        .then((res) => setCountries(res.data))
    }, [])
    const [countries, setCountries] = useState([])
    const [newUser, setNewUser] = useState ({
        name: "", 
        lastName: "", 
        email: "", 
        password: "", 
        photoUser: "",
        country: "",
    })

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
    
    const addUser = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const responseGoogle = (response) => {
        let newUserWithGoogle = {
            name: response.profileObj.givenName, 
            lastName: response.profileObj.familyName, 
            email: response.profileObj.email, 
            password: response.profileObj.googleId, 
            photoUser: response.profileObj.imageUrl,
            google: true,
            country: "Hawaii",
        }
        let disconect = true
        props.signUp(newUserWithGoogle)
        .then((res) => {
        if (res === undefined){
            Toast.fire({
                icon: 'error',
                title: 'Email is already in use'
                })
        } else if (disconect) {
            Toast.fire({
                icon: 'success',
                title: 'Your registration has been completed'
                })
        }
    }).catch((e) => console.log(e))
        
    }

    const submitInputs = () => {
        let disconect = true
        for (var i in newUser){
            if(!newUser[i].length){
                toast.warn("The field to complete is "+[i], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                disconect = false
                break
            }
        }
        if (disconect){
            props.signUp(newUser)
            .then((res) => {if (!res.includes("response")){
                // eslint-disable-next-line
                res.map((respuesta) => {
                    toast.warn(respuesta.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                })
            }
            if (!res.response.email & disconect){
                Toast.fire({
                    icon: 'error',
                    title: 'Email is already in use'
                    })
            } else if (disconect) {
                Toast.fire({
                    icon: 'success',
                    title: 'Your registration has been completed'
                    })
            } else {
                throw new Error()
            }
        }).catch(e =>  console.log(e))
    }
}
    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        {/* Same as */}
        <ToastContainer />
            <div className = "sign" style={{backgroundImage: "url('https://fondosmil.com/fondo/21037.jpg')"}}>
                <div id = "gradient"><Header/></div>
                    <div className = "inputs">
                        <div>
                            <h2>Create account</h2>
                            <input  type= "text" placeholder="Name" name="name"  value={newUser.name}  onChange={addUser}/>
                            <input  type= "text" placeholder="Last name" name="lastName" value={newUser.lastName}  onChange={addUser}/>
                            <input  type= "email" placeholder="example@example.com" name="email" value={newUser.email}  onChange={addUser}/>
                            <input  type= "password" placeholder="Password" name="password" value={newUser.password}  onChange={addUser}/>
                            <input  type= "url" placeholder="Url photo" name="photoUser" value={newUser.photoUser}  onChange={addUser}/>
                            <select name="country" onChange={addUser} value={newUser.country}>
                                <option>Select country...</option>
                                {countries.map((country, index) =>
                                    <option key = {index}>{country.name}</option>
                                )}
                            </select>
                            <button id= "buttonSign" onClick={submitInputs}>Sign up</button>
                            <GoogleLogin
                                clientId="564301942115-skr3qljqv4t42m3vb7icf1mi1ive9r2g.apps.googleusercontent.com"
                                buttonText="Sign up wit Google Account"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />,
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    signUp: usersActions.signUp
}

export default connect(null, mapDispatchToProps)(Signup)