// schemas
import Character from '../../../application/repositories/schemas/Character'
// dtos
import { ICharacterInfoDto } from './dtos/character-info.dto'
// utils
import { PaginateResult, Document } from 'mongoose'

interface CharacterFilters {
  page?: string;
  limit?: string;
  // Agrega otros campos de filtro aquí si los tienes
}

class CharacterService {
  async getAllCharacters (filters?: CharacterFilters): Promise<PaginateResult<Document<any, any, ICharacterInfoDto>>> {
    // Use of the Query to configure the paginate options
    const options = {
      page: filters?.page ? parseInt(filters.page) : 1,
      limit: filters?.limit ? parseInt(filters.limit) : 10
    }

    const res = await Character.paginate({ }, options)
    if (res.total === 0) throw new Error('No hay personajes bajo esta categoría')

    return res
  }

  async getCharacterById (id:string): Promise<Document<ICharacterInfoDto>> {
    const res = await Character.findById(id).exec()

    if (!res) throw new Error('Aún no hay cuentas en la base de datos')

    return res
  }

  async createCharacter (character: ICharacterInfoDto) {
    const res = await Character.create(character)
    return res
  }
}

export default new CharacterService()
