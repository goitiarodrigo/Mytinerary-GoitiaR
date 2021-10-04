const City = require("../models/City")

const citiesControllers = {

    obtenerTodasCiudades: async (req, res) => {
        try {
            const items = await City.find()
            res.json({success: true, response: items})
        }catch(error){
            res.json({success: false, response: error})
        }
    },

    obtenerCiudad: async (req, res) => {
        try {
            const ciudad = await City.findOne({_id: req.params.id})
            if (ciudad){
                res.json({success: true, response: ciudad})
            }else {
                throw new Error('Ciudad no encontrada')
            }
        }catch(error) {
            console.log(error.message)
            res.json({success: false, response: error.message})
        }
     },

    cargarNuevaCiudad: async (req, res) => {
        const ciudadNueva = new City({
            country: req.body.country,
            city: req.body.city,
            description: req.body.description,
            photo: req.body.photo,
            flag: req.body.flag
        })
        try {
            const newCity = await ciudadNueva.save()
            res.json({success : true, response: newCity})
        }
        catch(error) {
            res.json({success: false, response: error})
        }
        },
    
    borrarCiudad: async (req, res) => {
       try {
        const deleteCity = await City.findOneAndDelete({_id: req.params.id})
        res.json({success:true, response: deleteCity})
    }catch (error){
        res.json({success: false, response: error})
    }
    },

    modificarCiudad: async (req, res) => {
       try {
            const changeCity = await City.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new: true})
            res.json({succes: true, response: changeCity})
       }catch(error) {
        res.json({success: false, response: error})
       }
    }
    
}
module.exports = citiesControllers