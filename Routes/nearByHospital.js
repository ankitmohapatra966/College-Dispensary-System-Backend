const express = require("express");
const router = express.Router();
const Authentication = require('../Authentication/auth');
const HospitalController = require('../Controllers/nearByHospital');

router.post("/api/add",Authentication.adminFacultyAuth,HospitalController.addNearByHospital)
router.get("/api/get",HospitalController.getHospitals);

router.put('/api/update/:id',Authentication.adminFacultyAuth,HospitalController.updateHospitalById)
router.delete("/api/delete/:id", Authentication.adminFacultyAuth, HospitalController.deleteHospitalById)



module.exports = router;