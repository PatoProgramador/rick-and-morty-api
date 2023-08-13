// schemas
import Character from '../../../application/repositories/schemas/Character'
// dtos
import { ICharacterInfoDto } from './dtos/character-info.dto'
import { ICharacterFilters } from './dtos/charater-filters.dto'
// utils
import { PaginateResult, Document } from 'mongoose'

class CharacterService {
  async getAllCharacters (filters?: ICharacterFilters): Promise<PaginateResult<Document<any, any, ICharacterInfoDto>>> {
    let res
    let auxFilter = {}
    // Use of the Query to configure the paginate options
    const options = {
      page: filters?.page ? parseInt(filters.page) : 1,
      limit: filters?.limit ? parseInt(filters.limit) : 10
    }
    const dicFilters = {
      page: 'page',
      limit: 'limit',
      name: 'name',
      origin: 'origin',
      location: 'location'
    }
    // ---- filters logic ----
    for (const key in filters) {
      if (!Object.prototype.hasOwnProperty.call(dicFilters, key)) {
        auxFilter = {
          ...auxFilter,
          [key]: filters[key]
        }
      }
    }
    // special case origin-location
    if (filters?.origin) {
      const originName = filters.origin
      auxFilter = {
        ...auxFilter,
        'origin.name': originName
      }
    }
    if (filters?.location) {
      const locationName = filters.location
      auxFilter = {
        ...auxFilter,
        'location.name': locationName
      }
    }
    // regex in search by name
    if (filters?.name) {
      const name = filters.name
      const regex = new RegExp(name, 'i')
      res = await Character.paginate({ name: { $regex: regex }, ...auxFilter }, options)
    } else {
      // default case
      res = await Character.paginate(auxFilter, options)
    }
    if (res.total === 0) throw new Error('No hay personajes bajo esta categoría')

    return res
  }

  async getCharacterById(id: string): Promise<Document<ICharacterInfoDto>> {
    const res = await Character.findById(id).exec()

    if (!res) throw new Error('Aún no hay cuentas en la base de datos')

    return res
  }

  async createCharacter(character: ICharacterInfoDto) {
    const res = await Character.create(character)
    return res
  }
}

export default new CharacterService()
