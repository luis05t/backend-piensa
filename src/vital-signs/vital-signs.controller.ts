// src/vital-signs/vital-signs.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VitalSignsService } from './vital-signs.service';
// Importa tu decorador Auth y enum de roles si deseas proteger endpoints
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/roles';
import { CreateVitalSignDto } from './dto/create-vital-signs.dto';

@Controller('vital-signs')
export class VitalSignsController {
  constructor(private readonly vitalSignsService: VitalSignsService) {}

  @Post()
  create(@Body() createVitalSignDto: CreateVitalSignDto) {
    return this.vitalSignsService.create(createVitalSignDto);
  }

  @Get()
  findAll() {
    return this.vitalSignsService.findAll();
  }

  @Get(':userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.vitalSignsService.findAllByUserId(userId);
  }
}
