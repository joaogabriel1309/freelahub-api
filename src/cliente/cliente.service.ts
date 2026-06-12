import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClienteService {

  constructor(private readonly prisma: PrismaService) { }

  async create(ususarioId: string, createClienteDto: CreateClienteDto) {
    return await this.prisma.cliente.create({
      data: {
        documento: createClienteDto.documento,
        empresa: createClienteDto.empresa,
        telefone: createClienteDto.telefone,
        usuario: {
          connect: {
            id: ususarioId,
          },
        },
      }
    });
  }

  async findAll() {
    return await this.prisma.cliente.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    return await this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.cliente.delete({
      where: { id },
    });
  }
}
