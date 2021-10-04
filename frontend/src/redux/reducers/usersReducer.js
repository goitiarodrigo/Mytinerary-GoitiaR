const usersReducer = (state = {name: null, token: null, email: null, photoUser: null, validation: false, _id: false}, action) =>{
    switch (action.type) {
        case "SIGN":
            localStorage.setItem("token", action.payload.token)
            return {
                name: action.payload.name,
                email: action.payload.email,
                photoUser: action.payload.photoUser,
                token: action.payload.token,
                _id: action.payload._id,
                validation: false
            }
        case "LOG_OUT":
            localStorage.removeItem("token")
            return {
                name: null,
                email: null,
                photoUser: null,
                token: null,
                validation: true
            }
        default:
            return state
     }
}

export default usersReducer