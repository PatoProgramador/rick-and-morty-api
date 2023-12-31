import mongoose, { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const userSchema = new Schema(
  {
    apiID: {
      type: Number
    },
    name: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    species: {
      type: String
    },
    gender: {
      type: String
    },
    origin: {
      id: {
        type: mongoose.Schema.Types.ObjectId
      },
      name: {
        type: String
      }
    },
    location: {
      id: {
        type: mongoose.Schema.Types.ObjectId
      },
      name: {
        type: String
      }
    },
    episodes: [Object],
    disabled: {
      type: Boolean,
      default: false
    }
  }, {
    versionKey: false,
    timestamps: true
  }
)

userSchema.plugin(mongoosePaginate)

export default model('character', userSchema)
