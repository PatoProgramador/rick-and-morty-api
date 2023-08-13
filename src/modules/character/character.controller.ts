import { AppResponse } from '../../application/models/app.response'
import { Router } from 'express'
// services
import characterService from './services/character.service'
// utils
import { PaginateResult, Document } from 'mongoose'
// dtos
import { ICharacterInfoDto } from './services/dtos/character-info.dto'
import { ICharacterFilters } from './services/dtos/charater-filters.dto'

export const characterController = async ({ api, router }: { api: string; router: Router }) => {
  const route = `${api}/characters`

  router
    .get(`${route}/getAllCharacters`, async (req, res) => {
      const result = new AppResponse<PaginateResult<Document<any, any, ICharacterInfoDto>>>()
      const filters = req.query as ICharacterFilters
      try {
        result.response = await characterService.getAllCharacters(filters)

        return res.status(200).json(result)
      } catch (err) {
        result.message = String(err)

        return res.status(500).json(result)
      }
    })

    .get(`${route}/getCharacterById/:id`, async (req, res) => {
      const result = new AppResponse<Document<ICharacterInfoDto>>()
      const { id } = req.params

      try {
        result.response = await characterService.getCharacterById(id)

        return res.status(200).json(result)
      } catch (err) {
        result.message = String(err)

        return res.status(500).json(result)
      }
    })

    .post(`${route}/createCharacter`, async (req, res) => {
      const result = new AppResponse<Document<ICharacterInfoDto>>()

      if (!req.body) {
        result.message = 'Debes llenar los campos necesarios para crear al personaje'
      }
      console.log(req.body)
      try {
        result.response = await characterService.createCharacter(req.body)

        return res.status(200).json(result)
      } catch (err) {
        result.message = String(err)

        return res.status(500).json(result)
      }
    })
}
