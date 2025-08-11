import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';
import { SuppliersModule } from './module/suppliers.module';
import { AppDataSource } from './infrastructure/config/typeorm.config';
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Entities loaded:', AppDataSource.entityMetadatas.map(e => e.name));
  })
  .catch((err) => {
    console.error('❌ DataSource init error:', err);
  });@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SuppliersModule,
  ],
})
export class AppModule {}
