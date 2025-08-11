import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import  { SuppliersService } from '../../application/services/suppliers.service';
import  { CreateSupplierDto } from '../../application/dtos/suppliers/create-supplier.dto';
import  { UpdateSupplierDto } from '../../application/dtos/suppliers/update-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return await this.suppliersService.create(createSupplierDto);
  }

  @Get()
  async findAll(@Query('name') name?: string) {
    if (name) {
      return await this.suppliersService.findByName(name);
    }
    return await this.suppliersService.findAll();
  }

  @Get('stats')
  async getStats() {
    return await this.suppliersService.getStats();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.suppliersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return await this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.suppliersService.delete(id);
  }
}