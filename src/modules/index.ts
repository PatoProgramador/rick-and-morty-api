import { Router } from 'express'
import { characterController } from './character/character.controller'
import { episodeController } from './episode/episode.controller'
import { locationController } from './location/location.controller'

const router = Router()
const api = '/api'

characterController({ api, router })
episodeController({ api, router })
locationController({ api, router })

export { router }
