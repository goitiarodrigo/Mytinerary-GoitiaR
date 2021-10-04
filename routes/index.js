const express = require("express")
const citiesControllers = require("../controllers/citiesControllers")
const itinerariesControllers = require("../controllers/itinerariesControllers")
const usersControllers = require("../controllers/usersControllers")
const activitiesControllers = require("../controllers/activitiesControllers")
const router = express.Router()
const passport = require("passport")
const validation = require("../controllers/validator")


router.route("/cities")
.get(citiesControllers.obtenerTodasCiudades)
.post(citiesControllers.cargarNuevaCiudad)

router.route("/city/:id")
.get(citiesControllers.obtenerCiudad)
.put(citiesControllers.modificarCiudad)
.delete(citiesControllers.borrarCiudad)



router.route("/itineraries")
.get(itinerariesControllers.getItineraries)
.post(itinerariesControllers.newItinerary)


router.route("/itinerary/:id")
.delete(itinerariesControllers.deleteItinerary)
.put(itinerariesControllers.changeItinerary)
.get(itinerariesControllers.getItineraryById)

router.route("/itinerary/like/:id")
.put(passport.authenticate('jwt', { session : false }), itinerariesControllers.likeOnItinerary)

router.route("/itineraries/:id")
.get(itinerariesControllers.getItinerariesBcity)


router.route("/itineraries/comments/:id")
.put(passport.authenticate('jwt', { session : false }), itinerariesControllers.modifyCommentOnItinerary)


router.route("/signup")
.post(validation, usersControllers.newUser)

router.route("/user/:id")
.delete(usersControllers.deleteUser)
.put(usersControllers.modifyUser)
.get(usersControllers.getUser)

router.route("/login")
.post(usersControllers.logUser)


router.route("/verifyToken")
.get(passport.authenticate('jwt', { session : false }), usersControllers.verifyToken)


router.route("/activity")
.post(activitiesControllers.newActivity)

router.route("/activity/:id")
.get(activitiesControllers.getActivities)



module.exports = router