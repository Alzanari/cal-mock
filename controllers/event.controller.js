const db = require("../models");
const Event = db.Event;
const User = db.User;

const createEvent = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    const eve = await user.createEvent({
      title: req.body.title,
      comment: req.body.comment,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay,
    });
    res.status(200).send({
      message: "event created successfully",
      data: eve,
    });
  } catch (error) {
    return res.status(400).send({
      message: "event could not be created",
      errors: error,
    });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const event = await Event.findAll({
      include: {
        model: User,
        attributes: ["username"],
        required: true,
      },
    });
    return res.status(200).send({
      message: "events fetched successfully",
      data: event,
    });
  } catch (error) {
    return res.status(400).send({
      message: "events could not be fetched",
      errors: error,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.update(
      {
        title: req.body.title,
        comment: req.body.comment,
        start: req.body.start,
        end: req.body.end,
        allDay: req.body.allDay,
        status: req.body.status,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    return res.status(200).send({
      message: "event updated successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "event could not be updated",
      errors: error,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    let color = "";
    switch (req.body.status) {
      case "pending":
        color = "#FF6F0E";
        break;

      case "validated":
        color = "#0CB100";
        break;

      case "rejected":
        color = "#DA0303";
        break;
      default:
        break;
    }
    const event = await Event.update(
      {
        status: req.body.status,
        color: color,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    return res.status(200).send({
      message: "event's status updated successfully",
      data: event,
    });
  } catch (error) {
    return res.status(400).send({
      message: "event's status could not be updated",
      errors: error,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.destroy({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).send({
      message: "event deleted successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "event could not be deleted",
      errors: error,
    });
  }
};

module.exports = { createEvent, updateStatus, getAllEvent, updateEvent, deleteEvent };
