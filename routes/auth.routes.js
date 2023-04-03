const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

router.post(
  '/signup',
  [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (request, response) => {
  const errors = validationResult(request)
  if(!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
      message: 'Invalid email or password, please try again'
    })
  }  

  const { email, password } = request.body

  const candidate = await User.findOne({ email })
  if(candidate) {
    console.log(candidate)
    return response.status(400).json({ message: 'The user with this email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = new User({ email, password: hashedPassword })
  await user.save()

  response.status(201).json({ message: 'The user has been created' })
})

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Please enter a password').exists(),
  ],
  async (request, response) => {

  const errors = validationResult(request)
  if(!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
      message: 'Invalid email or password, plase try again'
    })
  }  

  const { email, password } = request.body
  console.log(email)
  const user = await User.findOne({ email })

  if(!user) {
    return response.status(400).json({ message: 'The user with this email does not exist' })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    return response.status(400).json({ message: 'Invalid password' })
  }



  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  response.json({ token, userId: user.id })
  
})

module.exports = router