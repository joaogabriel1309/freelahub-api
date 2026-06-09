import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
