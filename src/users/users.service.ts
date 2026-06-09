import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const usuarioSelect = {
  id: true,
  nome: true,
  email: true,
  papel: true,
  criadoEm: true,
  atualizadoEm: true,
}

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    try {
      return await this.prisma.usuario.create({
        data: {
          ...createUserDto,
          senha: hashedPassword,
        },
        select: usuarioSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email ja cadastrado');
      }

      throw error;
    }
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      select: usuarioSelect,
    });
  }

  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: usuarioSelect,
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    try {
      return await this.prisma.usuario.update({
        where: { id },
        data: updateUserDto,
        select: usuarioSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email ja cadastrado');
      }

      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.usuario.delete({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
      },
    });
  }
}
