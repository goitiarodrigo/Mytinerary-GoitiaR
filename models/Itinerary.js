const mongoose= require("mongoose")

const itinerarySchema = new mongoose.Schema({
    itinerary: {type: String, required: true},
    author: {type: Object, require: true},
    price: {type: Number, required: true, min: 1, max: 5},
    duration: {type: Number, required: true},
    likes: {type: Array},
    hashtag: {type: Array, required: true},
    comments: [{
        comment: {type: String},
        userId: {type:mongoose.Types.ObjectId, ref: "user"}
    }],
    photo: {type: String},
    description: {type: String},
    cityID: {type: mongoose.Types.ObjectId, ref: "city"}
}) 

const Itinerary = mongoose.model("itinerary", itinerarySchema)

module.exports = Itinerary 