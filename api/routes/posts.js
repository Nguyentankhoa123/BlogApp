const router = require('express').Router()
const Post = require('../model/Post')
const fs = require('fs')
const authenToken = require('./authentoken')
const User = require('../model/User')

//creatpost
router.post('/', authenToken, async function (req, res) {
  const newPost = new Post(req.body)
  try {
    newPost.photo = req.file.filename
    newPost.categories = req.body.categories.split(', ')
    const savePost = await newPost.save()
    res.status(200).json(savePost)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

//update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userid')
    if (post.userid.id === req.body.userid) {
      if (req.file != null) {
        req.body.photo = req.file.filename
      }
      console.log(req.body.categories.split(', '))
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            categories: req.body.categories.split(', '),
          },
          {
            new: true,
          }
        )

        res.status(200).json(updatePost)
      } catch (error) {
        res.status(400).json(error)
      }
    } else {
      res.status(401).json('You can update only your post!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const fileName = post.photo
    const imagePath = './images/' + fileName
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id)
        fs.unlinkSync(imagePath)
        res.status(200).json('Post Has been delete!')
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(401).json('You can delete only your post!')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userid')
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json(error)
  }
})

// //get all post
router.get('/', async (req, res) => {
  const userid = req.query.user
  const catName = req.query.category

  try {
    let posts
    if (userid) {
      user = await User.findById(userid)
      posts = await Post.find({ userid: user }).populate('userid')
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: catName,
        },
      }).populate('userid')
    } else {
      posts = await Post.find().populate('userid', 'username profilePic')
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

router.post('/upload-image', async (req, res) => {
  const file = req.file
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }
  // Do something with the uploaded file, such as saving it to a database or returning the file URL in the response
  res.json({ url: `http://localhost:5000/images/${file.filename}` })
})
module.exports = router
