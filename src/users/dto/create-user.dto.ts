import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'jhondoe@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The password of the user', example: 'password' })
  password: string;

  @IsUUID()
  @ApiProperty({
    description: 'The role id of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  roleId: string;
}
