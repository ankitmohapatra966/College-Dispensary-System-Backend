const express = require("express");
const router = express.Router();
const Authentication = require('../Authentication/auth');
const MedicineController = require('../Controllers/medicine')

router.post('/api/add',Authentication.adminFacultyAuth,MedicineController.addMedicine)
router.get('/api/get',MedicineController.getMedicine);

router.get('/api/search-by-name',MedicineController.searchMedicine);
router.put('/api/update/:id',Authentication.adminFacultyAuth,MedicineController.updateMedicineById)
 
router.delete('/api/delete/:id',Authentication.adminFacultyAuth,MedicineController.deleteMedicineById)
 


module.exports = router;