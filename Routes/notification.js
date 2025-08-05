const express = require("express");
const router = express.Router();
const Authentication = require('../Authentication/auth');
const NotificationController = require('../Controllers/notification');

router.post("/api/add",Authentication.adminFacultyAuth,NotificationController.addNotification);
router.get("/api/get",NotificationController.getNotifications);
router.delete("/api/delete/:id",Authentication.adminFacultyAuth,NotificationController.deleteNotificationById)




module.exports = router;