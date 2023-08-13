import { AppResponse } from '../../application/models/app.response'
import { Router } from 'express'
// services
import locationService from './services/location.service'
// utils
import { PaginateResult, Document } from 'mongoose'
// dtos
import { ILocationIndoDto } from './services/dtos/location-info.dto'

export const locationController = async ({ api, router }: { api: string; router: Router }) => {
  const route = `${api}/locations`

  router
    .get(`${route}/getAllLocations`, async (req, res) => {
      const result = new AppResponse<PaginateResult<Document<any, any, ILocationIndoDto>>>()
      try {
        result.response = await locationService.getAllLocations()

        return res.status(200).json(result)
      } catch (err) {
        result.message = String(err)

        return res.status(500).json(result)
      }
    })

    .get(`${route}/getLocationById/:id`, async (req, res) => {
      const result = new AppResponse<Document<ILocationIndoDto>>()
      const { id } = req.params

      try {
        result.response = await locationService.getLocationById(id)

        return res.status(200).json(result)
      } catch (err) {
        result.message = String(err)

        return res.status(500).json(result)
      }
    })
}
