import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UNIT_OF_WORK_TOKEN } from 'src/domain/repositories/unitofwork.repository.interfaces';
import { UnitOfWork } from 'src/infrastructure/repositories/unitofwork.repository';

@Module({
  imports: [TypeOrmModule], // Đảm bảo DataSource được inject
  providers: [
    {
      provide: UNIT_OF_WORK_TOKEN,
      useClass: UnitOfWork,
    },
  ],
  exports: [
    {
      provide: UNIT_OF_WORK_TOKEN,
      useClass: UnitOfWork,
    },
  ],
})
export class UnitOfWorkModule {}
