const express = require("express");
const { createUser, createUserForLogin, getAllUsers, getUser, deleteUser, updateUser } = require("../controllers/Users");
const videoRouter = require("./videoRoutes");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", createUser);
userRouter.post("/login", createUserForLogin);
userRouter.get("/:userId", getUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

// userRouter.use("/:userId/videos", videoRouter);

module.exports = userRouter;

