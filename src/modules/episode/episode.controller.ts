import { AppResponse } from '../../application/models/app.response'
import { Router } from 'express'
// services
import episodeService from './services/episode.service'
// utils
import { PaginateResult, Document } from 'mongoose'
// dtos
import { IEpisodeInfoDto } from './services/dtos/episode-info.dto'

export const episodeController = async ({ api, router }: { api: string; router: Router }) => {
  const route = `${api}/episodes`

  router
    .get(`${route}/getAllEpisodes`, async (req, res) => {
      const result = new AppResponse<PaginateResult<Document<any, any, any>>>()
      try {
        result.response = await episodeService.getAllEpisodes()

        return res.status(200).json(result)
      } catch (err) {
        result.message = String(err)

        return res.status(500).json(result)
      }
    })

    .get(`${route}/getEpisodeById/:id`, async (req, res) => {
      const result = new AppResponse<Document<IEpisodeInfoDto>>()
      const { id } = req.params

      try {
        result.response = await episodeService.getEpisodeById(id)

        return res.status(200).json(result)
      } catch (err) {
        result.message = String(err)

        return res.status(500).json(result)
      }
    })
}
