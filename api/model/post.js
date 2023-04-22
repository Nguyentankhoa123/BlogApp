const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    desc: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    imageuser: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
      require: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', PostSchema)
