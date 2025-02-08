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
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { ValidRoles } from './interfaces/roles';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: CreateLoginDto) {
    const { password, email } = loginDto;

    const user = await this.prisma.users.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        password: true,
        userId: true,
        roleId: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credentials are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    const role = await this.prisma.roles.findUnique({
      where: { roleId: user.roleId },
      select: { roleName: true },
    });

    const accessToken = this.getJwtToken(
      {
        id: user.userId,
        name: user.name,
        email: user.email,
        role: role?.roleName,
      },
      { expiresIn: '2d' },
    );

    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: role?.roleName || null,
      accessToken,
    };
  }

  async register(tx: Prisma.TransactionClient, createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    let role;

    if (createUserDto.roleId) {
      role = await tx.roles.findUnique({
        where: { roleId: createUserDto.roleId },
      });

      if (!role) {
        throw new Error('Invalid roleId provided');
      }
    } else {
      role = await tx.roles.findFirst({
        where: { roleName: ValidRoles.user },
      });

      if (!role) {
        throw new Error('Default role not found');
      }
    }

    try {
      const user = await tx.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          roleId: role.roleId,
        },
        select: {
          email: true,
          userId: true,
          name: true,
        },
      });

      const accessToken = this.getJwtToken(
        {
          id: user.userId,
          name: user.name,
          email: user.email,
          role: role?.roleName,
        },
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
