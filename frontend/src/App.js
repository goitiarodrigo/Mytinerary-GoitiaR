import Home from "./pages/Home"
import Cities from "./pages/Cities"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import City from "./pages/City";
import Signup from "./components/Signup";
import Login from "./components/Login"
import { connect } from "react-redux";
import {useEffect} from "react"
import usersActions from "./redux/actions/usersActions";

const App = (props) => {
   useEffect(()=> {
      if (localStorage.getItem("token")){
         props.logLs(localStorage.getItem("token"))
      }
      // eslint-disable-next-line
   }, [])

   return (
      <BrowserRouter>
            <Switch>
               <Route exact path = "/" component = {Home}/>
               <Route  path = "/home" component = {Home}/>
               <Route path = "/city/:id" component = {City}/>
               <Route path = "/cities" component = {Cities}/>
               {!props.valid &&<Route path = "/signup" component = {Signup}/>}
               {!props.valid &&<Route path = "/login" component = {Login}/>}
               <Redirect to = "/" />
            </Switch>
      </BrowserRouter>
   ) 
}

const mapStateToProps = (state) => {
   return {
      valid: state.users.token,
   }
}

const mapDispatchToProps = {
   logLs: usersActions.logOnLs,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
