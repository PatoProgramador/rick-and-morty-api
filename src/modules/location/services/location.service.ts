// schemas
import Location from '../../../application/repositories/schemas/Location'
// dtos
import { ILocationIndoDto } from './dtos/location-info.dto'
import { PaginateResult, Document } from 'mongoose'
// utils

class LocationService {
  async getAllLocations (): Promise<PaginateResult<Document<any, any, ILocationIndoDto>>> {
    const options = {
      page: 1,
      limit: 10
    }
    const res = await Location.paginate({}, options)
    if (res.docs.length === 0) throw new Error('Aún no hay locaciones en la base de datos')

    return res
  }

  async getLocationById (id: string): Promise<Document<ILocationIndoDto>> {
    const res = await Location.findById(id).exec()

    if (!res) throw new Error('Aún no hay episodios en la base de datos')

    return res
  }
}

export default new LocationService()
