import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoginDto } from './dto/createLogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './strategy/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { ValidRoles } from './interfaces/roles';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(loginDto: CreateLoginDto) {
    const { password, email } = loginDto;

    const user = await this.prisma.users.findUnique({
      where: { email },
      select: {
        email: true,
        password: true,
        userId: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credentials are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    const accessToken = this.getJwtToken(
      { id: user.userId },
      { expiresIn: '2d' },
    );

    return {
      userId: user.userId,
      accessToken,
    };
  }

  async register(tx: Prisma.TransactionClient, createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    const defaultRole = await tx.roles.findFirst({
      where: {
        roleName: ValidRoles.user,
      },
    });
    if (!defaultRole) {
      throw new Error('Default role not found');
    }

    try {
      const user = await tx.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          roleId: defaultRole.roleId,
        },
        select: {
          email: true,
          userId: true,
        },
      });

      const accessToken = this.getJwtToken(
        { id: user.userId },
        { expiresIn: '2d' },
      );

      return {
        userId: user.userId,
        accessToken,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload, options?: { expiresIn: string }) {
    const token = this.jwtService.sign(payload, options);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}