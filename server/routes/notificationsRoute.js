const router = require("express").Router();
const Notification = require("../models/notificationsModel");
const authMiddleware = require("../middlewares/authMiddleware");

//add a notification
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const newNotifications = new Notification(req.body);
    await newNotifications.save();
    res.send({
      success: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
// get all notification by user id
router.get("/get-all-notifications", authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
// delete notification
router.delete("/delete-notification/:id", authMiddleware, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
// read all notifications
router.put("/read-all-notifications", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.body.userId, seen: false },
      { $set: { seen: true } }
    );
    res.send({
      success: true,
      message: "Notification are marked as read",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
