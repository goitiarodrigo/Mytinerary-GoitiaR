import { connect } from "react-redux"
import {NavLink} from "react-router-dom"
import usersActions from "../redux/actions/usersActions"


const Footer = (props) => {

    const logOutHandler = (e) => {
        props.logOut(e.target.value)
    }

    return (
        <>
        <div id = "footer2">
            <nav id = "footer">
                <NavLink to = "/home"><h5>Home</h5></NavLink>
                <NavLink to = "/cities"><h5>Cities</h5></NavLink>
                {!props.valid && (<NavLink to = "/signup"><h5>Sign up</h5></NavLink>)}
                {!props.valid && (<NavLink to = "/login"><h5>Log in</h5> </NavLink>)}
                {props.valid && (<NavLink className= "navLink" to = "/home" onClick={logOutHandler}>Log out</NavLink>)}
            </nav>
            <div id = "redesSociales">
                <a rel="noreferrer" href = "https://www.facebook.com" target="_blank"><img className = "redSocial" src="/assets/facebook.png" alt="redSocialIcono"/></a>
               <a rel="noreferrer" href = "https://www.instagram.com" target="_blank"><img className = "redSocial" src="/assets/ins.png" alt="redSocialIcono"/></a>
               <a rel="noreferrer" href = "https://www.twitter.com" target="_blank"><img className = "redSocial" src="/assets/twitter.png" alt="redSocialIcono"/></a>
            </div>
        </div>
        </>
)
}

const mapStateToProps = (state) => {
    return {
        valid: state.users.token

    }
}

const mapDispatchToProps = {
    logOut: usersActions.logOut
 }

export default connect(mapStateToProps, mapDispatchToProps)(Footer)