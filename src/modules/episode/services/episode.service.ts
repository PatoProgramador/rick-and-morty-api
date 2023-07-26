// schemas
import Episode from '../../../application/repositories/schemas/Episode'
// dtos
import { IEpisodeInfoDto } from './dtos/episode-info.dto'
import { PaginateResult, Document } from 'mongoose'
// utils

class EpisodeService {
  async getAllEpisodes (): Promise<PaginateResult<Document<any, any, any>>> {
    const options = {
      page: 1,
      limit: 10
    }
    const res = await Episode.paginate({}, options)
    if (res.docs.length === 0) throw new Error('Aún no hay episodios en la base de datos')

    return res
  }

  async getEpisodeById (id: string): Promise<Document<IEpisodeInfoDto>> {
    const res = await Episode.findById(id).exec()

    if (!res) throw new Error('Aún no hay episodios en la base de datos')

    return res
  }
}

export default new EpisodeService()
