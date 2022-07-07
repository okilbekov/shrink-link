const router = require('express').Router()
const Link = require('../models/Link')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

router.post('/generate', async (request, response) => {
  const { from } = request.body
  const baseUrl = process.env.BASE_URL
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if(!decodedToken.userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const code = shortid.generate()
  const existing = await Link.findOne({ from, owner: decodedToken.userId })

  if(existing) {
    return response.json({ link: existing })
  }

  const to = baseUrl + '/t/' + code

  const link = new Link({
    code, from, to, owner: decodedToken.userId
  })

  // console.log(link.to)

  await link.save()

  response.status(201).json({ link })
})

router.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if(!decodedToken.userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const links = await Link.find({ owner: decodedToken.userId })
  response.json(links)
})

router.get('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if(!decodedToken.userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const link = await Link.findById(request.params.id)
  response.json(link)
})


module.exports = router