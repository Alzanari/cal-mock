const db = require("../models");
const User = db.User;
const Role = db.Role;
const user_roles = db.user_roles;

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    res.status(200).send({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).send({
      message: "User could not be fetched",
      errors: error,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      include: {
        model: Role,
        attributes: ["name"],
        through: {
          model: user_roles,
          attributes: [],
        },
      },
    });
    return res.status(200).send({
      message: "users fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).send({
      message: "users could not be fetched",
      errors: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.update({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.status(200).send({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).send({
      message: "User could not be updated",
      errors: error,
    });
  }
};

const setAdmin = async (req, res) => {
  try {
    await User.findOne({
      where: {
        id: req.body.id,
      },
    }).then((user) => {
      user.addRoles([1]).then(() => {
        res.send({ message: "User became admin successfully!" });
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: "User could not be added to Admins",
      errors: error,
    });
  }
};
const removeAdmin = async (req, res) => {
  try {
    await User.findOne({
      where: {
        id: req.body.id,
      },
    }).then((user) => {
      user.removeRoles([1]).then(() => {
        res.send({ message: "User removed from admins successfully!" });
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: "User could not be removed from Admins",
      errors: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "User could not be deleted",
      errors: error,
    });
  }
};

module.exports = { getUser, getAllUser, setAdmin, removeAdmin, updateUser, deleteUser };
