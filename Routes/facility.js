const express = require("express")
const router= express.Router();
const Authentication = require('../Authentication/auth')
const FacilityController = require('../Controllers/facility')

router.post('/api/add',Authentication.adminFacultyAuth,FacilityController.addFacility);
router.put('/api/update/:id',Authentication.adminFacultyAuth,FacilityController.updateFacility)
router.get('/api/get',FacilityController.getAllFacility);
router.delete('/api/delete/:id',Authentication.adminFacultyAuth,FacilityController.deleteFacility)




module.exports = router