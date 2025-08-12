import { IUnitOfWork } from "src/domain/repositories/unitofwork.repository.interfaces";
import { BadRequestException } from '@nestjs/common';

export class TransactionalHandler {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async run<T>(operation: () => Promise<T>, errorMessage = 'Transaction failed'): Promise<T> {
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
