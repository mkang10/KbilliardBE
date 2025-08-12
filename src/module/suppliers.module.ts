import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suppliers } from 'src/domain/entities/entities/suppliers.entity';
import { SuppliersController } from 'src/interfaces/controllers/suppliers.controller';
import { SuppliersService } from 'src/application/services/suppliers.service';
import { SuppliersRepository } from 'src/infrastructure/repositories/suppliers.repository';
import { SUPPLIERS_REPOSITORY_TOKEN } from 'src/domain/repositories/suppliers.repository.interface';
import { UNIT_OF_WORK_TOKEN } from 'src/domain/repositories/unitofwork.repository.interfaces';
import { UnitOfWorkModule } from './unitofwork.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Suppliers]),
    UnitOfWorkModule,
  ],
  controllers: [SuppliersController],
  providers: [
    SuppliersService,
    {
      provide: SUPPLIERS_REPOSITORY_TOKEN,
      useClass: SuppliersRepository,
    },
  ],
  exports: [SuppliersService],
})
export class SuppliersModule {}
