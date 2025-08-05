const express = require("express");
const router = express.Router();
const Authentication = require('../Authentication/auth');
const HistoryController = require('../Controllers/history')

router.post('/api/add',Authentication.adminFacultyAuth,HistoryController.addHistory)
router.get('/api/get-history',Authentication.adminFacultyAuth,HistoryController.getHistoryByDate)
router.get('/api/get',Authentication.studentAuth,HistoryController.getStudentHistory)

module.exports = router;