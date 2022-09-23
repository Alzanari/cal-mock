const db = require("../models");
const config = require("../config/auth");
const Event = db.Event;

const createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            title: req.body.title,
            comment: req.body.comment,
            date: req.body.date
        });
        res.status(200).send({
            message: "event created successfully",
            data: event
        })
    } catch (error) {
        return res.status(400).send({
            message: "event could not be created",
            errors: error
        })
    }
}

const getEvent = async (req, res) => {
    try {
        const event = await Event.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            message: "event fetched successfully",
            data: event
        })
    } catch (error) {
        return res.status(400).send({
            message: "event could not be fetched",
            errors: error
        })
    }
}

const getAllEvent = async (req, res) => {
    try {
        const event = await Event.findAll();
        res.status(200).send({
            message: "events fetched successfully",
            data: event
        })
    } catch (error) {
        return res.status(400).send({
            message: "events could not be fetched",
            errors: error
        })
    }
}

const updateEvent = async (req, res) => {
    try {
        const event = await Event.update({
            title: req.body.title,
            comment: req.body.comment,
            date: req.body.date,
            status: req.body.status
        });
        res.status(200).send({
            message: "event updated successfully",
            data: event
        })
    } catch (error) {
        return res.status(400).send({
            message: "event could not be updated",
            errors: error
        })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.destroy({
            where: {
                id: req.body.id
            }
        });
        res.status(200).send({
            message: "event deleted successfully"
        })
    } catch (error) {
        return res.status(400).send({
            message: "event could not be deleted",
            errors: error
        })
    }
}

module.exports = { createEvent, getEvent , getAllEvent , updateEvent, deleteEvent };