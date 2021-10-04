const Activity = require("../models/Activities")

const activitiesControllers = {
    getActivities: async (req, res) => {
        try {
            const activities = await Activity.find({itineraryID: req.params.id})
            res.json({success: true, response: activities})
        }catch(e){
            res.json({success: false, response: e})
        }
    },

    newActivity: async (req, res) => {
        const newAct = new Activity({...req.body})
        try {
            const newActivity = await newAct.save()
            res.json({success: true, response: newActivity})
        }catch(e){
            res.json({success: false, response: e})
        }
    },

    

}

module.exports = activitiesControllers