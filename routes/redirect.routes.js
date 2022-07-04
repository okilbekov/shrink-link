const router = require('express').Router()
const Link = require('../models/Link')

router.get('/:code', async (request, response) => {
  
  const link = await Link.findOne({ code: request.params.code })

  if(link) {
    link.clicks++
    await link.save()
    return response.redirect(link.from)
  }

  response.status(404).json('Link is not found')
})

module.exports = router