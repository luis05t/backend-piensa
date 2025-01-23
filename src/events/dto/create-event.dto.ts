import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty({ description: 'The name of the event', example: 'Event 1' })
  name: string;

  @IsDate()
  @ApiProperty({ description: 'The date of the event', example: '2021-11-02' })
  date: Date;

  @IsUUID()
  @ApiProperty({
    description: 'The user id of the event',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}
