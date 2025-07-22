import { Module } from '@nestjs/common';
import { VitalSignsService } from './vital-signs.service';
import { VitalSignsController } from './vital-signs.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VitalSignsController],
  exports: [VitalSignsService],
  providers: [VitalSignsService, PrismaService],
})
export class VitalSignsModule {}
