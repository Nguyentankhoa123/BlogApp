const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      profilePic: req.body.profilePic,
    })

    const token = jwt.sign(
      {
        email: newUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET
    )

    newUser.token = token
    newUser.profilePic = req.file.filename
    const user = await newUser.save()
    res.status(200).json({ user: user, token: token })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/login', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })

    if (!existingUser) {
      return res.status(400).json('User not found')
    }

    const validate = await bcrypt.compare(
      req.body.password,
      existingUser.password
    )

    if (!validate) {
      return res.status(400).json('Invalid Credentials!')
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET
    )
    return res.status(200).json({ user: existingUser, token: token })
  } catch (error) {
    console.log(error)
    return res.status(500).json('Something went wrong')
  }
})

module.exports = router
