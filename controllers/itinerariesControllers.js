const Itinerary = require("../models/Itinerary")

const itinerariesControllers = {
    getItineraries: async (req, res) => {
        try {
            let itineraries = await Itinerary.find()
            res.json({success: true, response: itineraries})
        }catch(error){
            res.json({success: false, response: error})
        }
    },
    
    getItineraryById: async (req, res) => {
        let itinerary = await Itinerary.findOne({_id : req.params.id})
        res.json({success: true, response: itinerary})
    },

    getItinerariesBcity: async (req, res) => {
        try {
            let cityItinerary  = await Itinerary.find({cityID : req.params.id}).populate('comments.userId', {name: 1, photoUser: 1})
            res.json({success: true, response: cityItinerary})
        }catch(error){
        res.json({success: false, response: error})
    }
    },

    newItinerary: async (req, res) => {
        let newItinerary = new Itinerary({ ...req.body
            // itinerary: req.body.itinerary,
            // author: req.body.author,
            // price: req.body.price,
            // duration: req.body.duration,
            // likes: req.body.likes,
            // hashtag: req.body.hashtag
        }) 
        try {
            const itineraryN = await newItinerary.save()
            res.json({success: true, response: itineraryN})    
        }catch(error){
        res.json({success: false, response: error})
    }
    },

    deleteItinerary: async (req, res) => {
        try {
            let itineraryDeleted = await Itinerary.findOneAndDelete({_id: req.params.id})
            res.json({success: true, response: itineraryDeleted})
        }catch(error){
        res.json({success: false, response: error})
    }
    },

    changeItinerary: async (req, res) => {
        try {
            let itineraryChanged = await Itinerary.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new : true})
            res.json({success: true, response: itineraryChanged})
        }catch(error){
        res.json({success: false, response: error})
    }
    },


    likeOnItinerary:(req,res) =>{
        Itinerary.findOne({_id: req.params.id})
        .then((itinerary) =>{
            if(itinerary.likes.includes(req.user._id)){
               Itinerary.findOneAndUpdate({_id:req.params.id}, {$pull:{likes:req.user.id}},{new:true})
               .then((newItinerary)=> res.json({success:true, response:newItinerary.likes}))
               .catch((error) => console.log(error))
            }else{
                Itinerary.findOneAndUpdate({_id: req.params.id}, {$push:{likes:req.user.id}},{new:true})
                .then((newItinerary) => res.json({success:true, response:newItinerary.likes}))
                .catch((error) => console.log(error))
            }
        })
        .catch((error) => res.json({success:false, response:error}))
    },   

    // likeOnItinerary: (req, res) =>{
        
    //     Itinerary.findOne({_id: req.params.id})
    //     .then((itinerary) => {
    //         if(itinerary.likes.includes(req.user._id)){
    //             Itinerary.findOneAndUpdate({_id: req.params.id},{$pull:{likes: req.user._id}})
    //             .then((newItinerary) => res.json({success: true, response: newItinerary.likes}))    
    //         }else{
    //             Itinerary.findOneAndUpdate({_id: req.params.id},{$push:{likes: req.user._id}}) 
    //             .then((newItinerary) =>res.json({success: true, response: newItinerary.likes}))        
    //         }
    //     })
    //     .catch((error) => res.json({success: false, response: error}))    
    // },

    modifyCommentOnItinerary: async (req, res)=>{
        switch(req.body.type){
            case "addComment":
                try {
                    const newComment = await Itinerary.findOneAndUpdate({_id: req.params.id}, {$push: {comments: {comment: req.body.comment, userId: req.user._id}}}, {new: true}).populate('comments.userId', {name: 1, photoUser: 1})
                    if (newComment) {
                        res.json({success: true, response: newComment.comments})
                    }else {
                        throw new Error("error")
                    }
                }catch(e){
                    res.json({success: false, response: e.message})
                }
                break
            case "deleteComment":
                try {
                    const oldComment = await Itinerary.findOneAndUpdate({"comments._id": req.body.idComment}, {$pull: {comments: {_id: req.body.idComment}}})
                        res.json({success: true})
                        
                }catch(e){
                    res.json({success: false, response: e.messagge})
                }
                break
            case "modifyComment":
                try {
                    const editComment = await Itinerary.findOneAndUpdate({"comments._id": req.params.id}, {$set:{"comments.$.comment": req.body.comment}}, {new: true})
                    res.json({success: true, response: editComment.comments})
                }catch(e){
                    res.json({success: false, response: e.message})
                }
                break
         }
        }
    }



module.exports = itinerariesControllers