const { Schema, model, Types } = require('mongoose')

const LinkSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    default: 0
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

LinkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Link', LinkSchema)