const router = require('express').Router()
const User = require('../model/User')
const Post = require('../model/Post')
const bcrypt = require('bcrypt')

//update
router.put('/:id', async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }
  if (req.file != null) {
    req.body.profilePic = req.file.filename
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    )
    res.status(200).json(updateUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    try {
      await Post.deleteMany({ username: user.username })

      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('user has been deleted...')
    } catch (error) {
      res.status(500).json(error)
    }
  } catch (error) {
    res.status(404).json('user not found...')
  }
})

//get user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    // const { password, ...other } = user._doc
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})
module.exports = router
