import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PrismaService],
  imports: [AuthModule],
  exports: [PrismaService],
})
export class PrismaModule {}
