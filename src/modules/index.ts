import { Router } from 'express'
import { characterController } from './character/character.controller'
import { episodeController } from './episode/episode.controller'

const router = Router()
const api = '/api'

characterController({ api, router })
episodeController({ api, router })

export { router }
