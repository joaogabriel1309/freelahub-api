import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.usuario.create({
      data: createUserDto,
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      }
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      }
    });
  }

  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      }
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      }
    });
  }

  remove(id: string) {
    return this.prisma.usuario.delete({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      }
    });
  }
}
