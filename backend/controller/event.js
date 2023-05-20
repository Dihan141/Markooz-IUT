const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const product = await Event.create(eventData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//post upvote
router.post(
  "/post-upvote/:id/:uid",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.params.uid;

      // Check if the user exists in the downvote array
      const event = await Event.findOne({ _id: eventId, downvotes: { $in: [userId] } });

      // Check if the user exists in the upvote array
      const event1 = await Event.findOne({ _id: eventId, upvotes: { $in: [userId] } });

      if (event) {
        // User exists in the downvote array, cannot be added to upvote
        return res.status(400).json({
          success: "downvoted but not upvoted",
          message: "User has already downvoted the event.",
        });
      }

      if (event1) {
        // User exists in the upvoted array, cannot be added to upvote
        return res.status(400).json({
          success: "upvoted already",
          message: "User has already upvoted the event.",
        });
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $push: { upvotes: userId } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        event: updatedEvent,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//remove upvote
router.post(
  "/remove-upvote/:id/:uid",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.params.uid;

      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $pull: { upvotes: userId } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        event: updatedEvent,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//remove downvote
router.post(
  "/remove-downvote/:id/:uid",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.params.uid;

      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $pull: { downvotes: userId } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        event: updatedEvent,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);



//post downvote
router.post(
  "/post-downvote/:id/:uid",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.params.uid;

      // Check if the user exists in the upvote array
      const event = await Event.findOne({ _id: eventId, upvotes: { $in: [userId] } });

      // Check if the user exists in the downvote array
      const event1 = await Event.findOne({ _id: eventId, downvotes: { $in: [userId] } });

      if (event) {
        // User exists in the upvote array, cannot be added to upvote
        return res.status(400).json({
          success: "upvoted but not downvoted",
          message: "User has already voted the event.",
        });
      }

      if (event1) {
        // User exists in the downvote array, cannot be added to upvote
        return res.status(400).json({
          success: "downvoted already",
          message: "User has already voted the event.",
        });
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $push: { downvotes: userId } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        event: updatedEvent,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get upvote status
router.get(
  "/status-upvote/:id/:uid",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.params.uid;

      // Check if the user exists in the upvote array
      const event = await Event.findOne({ _id: eventId, upvotes: { $in: [userId] } });

      if (event) {
        // User exists in the upvote array, cannot be added to upvote
        return res.status(200).json({
          success: true,
        });
      }

      res.status(201).json({
        success: false,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get downvote status
router.get(
  "/status-downvote/:id/:uid",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.params.uid;

      // Check if the user exists in the upvote array
      const event = await Event.findOne({ _id: eventId, downvotes: { $in: [userId] } });

      if (event) {
        // User exists in the downvote array, cannot be added to upvote
        return res.status(200).json({
          success: true,
        });
      }

      res.status(201).json({
        success: false,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const eventData = await Event.findById(productId);

      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const event = await Event.findByIdAndDelete(productId);

      if (!event) {
        return next(new ErrorHandler("Event not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
