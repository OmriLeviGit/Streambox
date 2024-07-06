const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  settings: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);

//   history: [{ type: mongoose.Schema.Types.ObjectId, ref: "video" }],
//   settings: {
//     type: Object,
//     required: true,
//   },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//   settings: {
//     type: Object,
//     required: true,
//   },
//   dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
//   settings: {
//     type: Object,
//     required: true,
//   },
// });
