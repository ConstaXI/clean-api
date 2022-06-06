import { LogErrorRepository } from '../../../../data/protocols/db/log/log-error-repository'
import TypeormHelper from '../helpers/typeorm-helper'
import LogEntity from '../entities/log.entity'

export class LogTypeormRepository implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    const logRepository = await TypeormHelper.getRepository(LogEntity)
    await logRepository.save({
      stack,
      date: new Date()
    })
  }
}
