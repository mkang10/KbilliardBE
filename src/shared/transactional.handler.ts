import {
  UNIT_OF_WORK_TOKEN,
  type IUnitOfWork,
} from 'src/domain/repositories/unitofwork.repository.interfaces';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
@Injectable()
export class TransactionalHandler {
  constructor(
    @Inject(UNIT_OF_WORK_TOKEN)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async run<T>(
    operation: () => Promise<T>,
    errorMessage = 'Transaction failed',
  ): Promise<T> {
    await this.unitOfWork.start();
    try {
      const result = await operation();
      await this.unitOfWork.complete();
      return result;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw new BadRequestException(errorMessage);
    } finally {
      await this.unitOfWork.release();
    }
  }
}
