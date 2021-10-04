import {NavLink} from "react-router-dom"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import citiesActions from "../redux/actions/citiesAction"

const Header = (props) => {

    const logOutHandler = (e) => {
        props.logOut(e.target.value)
        props.borrar()
    }

    return (
        <div className = "header">
            <div id = "nav">
                <NavLink to = "/home"><h5>Home</h5></NavLink>
                <NavLink to = "/cities"><h5>Cities</h5></NavLink>
                {!props.valid && (<NavLink to = "/signup"><h5>Sign up</h5></NavLink>)}
                {!props.valid && (<NavLink to = "/login"><h5>Log in</h5> </NavLink>)}
                {props.valid && (<NavLink className= "navLink" to = "/home" onClick={logOutHandler}>Log out</NavLink>)}
                {props.valid  ? <div id="srcUser"><p>Welcome, {props.name}</p><img id = "sesion" src={props.photoUser} alt="icono"/></div> : <img id = "sesion2" src="/assets/sesion.png" alt="icono"/>}
            </div>  
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        valid: state.users.token,
        photoUser: state.users.photoUser,
        name: state.users.name
    }
}

const mapDispatchToProps = {
    logOut: usersActions.logOut,
    borrar: citiesActions.deleteCities
 }

export default connect(mapStateToProps, mapDispatchToProps)(Header)