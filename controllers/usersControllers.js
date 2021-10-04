const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const usersControllers= {
    // getUsers: async (req, res) => {
    //     try {
    //        let users = await User.find()
    //        res.json({success: true, response: users})
    //     }catch(e) {
    //         res.json({success: false, response: e})
    //     }
    // },

    getUser: async (req, res) => {
        try {
            let user = await User.findOne({_id: req.params.id})
            res.json({success: true, response: user})
        }catch(e){
            res.json({success: false, response: e})
        }
    },

    newUser: async (req, res) => {
        const {name, lastName, email, password, photoUser, admin, country, google} = req.body
        let encriptedPw = bcryptjs.hashSync(password, 10)
        let newUser = new User({
            name,
            lastName, 
            email,
            password: encriptedPw, 
            photoUser,
            admin,
            country,
            google
        })
        try {
            let repeatedUser = await User.findOne({email: email})
               if (repeatedUser) throw new Error("Error")
            let oneNewUser = await newUser.save()
            const token = jwt.sign({...oneNewUser}, process.env.SECRETORKEY)
            res.json({success: true, response: {name: oneNewUser.name, email: oneNewUser.email, photoUser: oneNewUser.photoUser, token}})
        }catch(e) {
            res.json({success: false, response: e.message})
        }
    },

    logUser : async (req, res) => {
        const {email, password, photoUser} = req.body
        try {
            let userOn = await User.findOne({email: email})
            if (!userOn) throw new Error("Error user")
            let pw = bcryptjs.compareSync(password, userOn.password)
            if (!pw) throw new Error("Error pw")
            const token = jwt.sign({...userOn}, process.env.SECRETORKEY)
            res.json({success: true, response: {name: userOn.name, email: userOn.email, photoUser: userOn.photoUser, _id: userOn._id, token}}) 
        }catch(e){
            res.json({success: false, response: e.message})
        }  
    },

    deleteUser: async (req, res) => {
        try {
            let userDeleted = User.findOneAndDelete({_id: req.params.id})
            res.json({success: true, response: userDeleted})
        }catch(e){
            res.json({success: false, reponse: e})
        }
    },
    
    modifyUser: async (req, res) => {
        try {
            let modifiedUser = await User.findOneAndUpdate({_id: req.params.id})
            res.json({success: true, response: modifiedUser})
        }catch(e){
            res.json({success: false, response: e})
        }
    },

    verifyToken: (req, res) => {
        res.json({name: req.user.name, photoUser: req.user.photoUser, email: req.user.email, _id: req.user._id})
    }
}

module.exports = usersControllers