import { PartialType } from '@nestjs/swagger';
import { CreateVitalSignDto } from './create-vital-signs.dto';

export class UpdateVitalSignsDto extends PartialType(CreateVitalSignDto) {}
