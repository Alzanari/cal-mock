const db = require("../models");
const config = require("../config/auth");
const User = db.User;

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        });
        res.status(200).send({
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        return res.status(400).send({
            message: "User could not be fetched",
            errors: error
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).send({
            message: "users fetched successfully",
            data: user
        })
    } catch (error) {
        return res.status(400).send({
            message: "users could not be fetched",
            errors: error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.update({
            title: req.body.title,
            comment: req.body.comment,
            date: req.body.date,
        });
        res.status(200).send({
            message: "User updated successfully",
            data: user
        })
    } catch (error) {
        return res.status(400).send({
            message: "User could not be updated",
            errors: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: id
            }
        });
        res.status(200).send({
            message: "User deleted successfully"
        })
    } catch (error) {
        return res.status(400).send({
            message: "User could not be deleted",
            errors: error
        })
    }
}

module.exports = { getUser , getAllUser, updateUser, deleteUser };