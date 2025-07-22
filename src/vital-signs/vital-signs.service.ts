// src/vital-signs/vital-signs.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVitalSignDto } from './dto/create-vital-signs.dto';

@Injectable()
export class VitalSignsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVitalSignDto: CreateVitalSignDto) {
    const { patientId, timestamp, vitalSigns } = createVitalSignDto;

    const date = new Date(timestamp);

    const { BPM, temp, SpO2 } = vitalSigns;

    const newVitalSign = await this.prisma.vitalSigns.create({
      data: {
        userId: patientId,
        BPM,
        temp,
        SpO2,
        timestamp: date,
      },
    });

    return newVitalSign;
  }

  async findAllByUserId(userId: string) {
    return this.prisma.vitalSigns.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.vitalSigns.findMany({
      orderBy: { timestamp: 'desc' },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
