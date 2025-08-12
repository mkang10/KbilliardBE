import { Module } from '@nestjs/common';
import { TransactionalHandler } from 'src/shared/transactional.handler';
import { UnitOfWorkModule } from './unit-of-work.module';

@Module({
  imports: [UnitOfWorkModule], // ✅ để có thể inject IUnitOfWork
  providers: [TransactionalHandler],
  exports: [TransactionalHandler],
})
export class SharedModule {}
