const express = require("express");
const router = express.Router();
const Authentication = require('../Authentication/auth');
const GallaryController = require('../Controllers/gallary');

router.post('/api/add',Authentication.adminFacultyAuth,GallaryController.addImage)
router.get('/api/get',GallaryController.getAllGallary)

router.delete('/api/delete/:id',Authentication.adminFacultyAuth,GallaryController.deleteImageById)

module.exports = router;