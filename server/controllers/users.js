const User = require("../models/User");
const mongoose = require("mongoose");

//get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

//get a single user
const getUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: `User with id ${userId} not valid` });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: `User with id ${userId} not found` });
  }
  res.status(200).json(user);
};

//create a user
const createUser = async (req, res) => {
    //add doc to db
    try{
        const { username, password, firstName, middleName, lastName, birthdate, photo, videos, settings } = req.body
        const user = await User.create({ username, password, firstName, middleName, lastName, birthdate, photo, videos, settings })
        res.status(200).json(user)
    }catch(error){
    res.status(400).json({error: error.message})
    }
}

//update a user
const updateUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: `User with id ${userId} not valid` });
  }
  const user = await User.findByIdAndUpdate({ _id: userId }, { ...req.body }, { new: true });
  if (!user) {
    return res.status(400).json({ message: `User with id ${userId} not found` });
  }
  res.status(200).json(user);
};

//delete a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: `User with id ${userId} not valid` });
  }
  const user = await User.findByIdAndDelete({ _id: userId });
  if (!user) {
    return res.status(400).json({ message: `User with id ${userId} not found` });
  }
  res.status(200).json(user);
};

const createUserForLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (password !== user.password) {  // Compare plain text passwords
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '5h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    createUserForLogin
 }
