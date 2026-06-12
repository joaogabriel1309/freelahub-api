import { Injectable, ConflictException } from '@nestjs/common';
import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FreelancersService {

  constructor(private readonly prisma: PrismaService) { }

  async create(usuarioId: string, createFreelancerDto: CreateFreelancerDto) {
    try {
      return await this.prisma.freelancer.create({
        data: {
          titulo: createFreelancerDto.titulo,
          biografia: createFreelancerDto.biografia,
          valorHora: createFreelancerDto.valorHora,
          telefone: createFreelancerDto.telefone,
          usuario: {
            connect: {
              id: usuarioId
            }
          }
        }
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Freelancer já cadastrado para esse usuário');
      }
    }
  }

  async findAll() {
    return await this.prisma.freelancer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.freelancer.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateFreelancerDto: UpdateFreelancerDto) {
    return await this.prisma.freelancer.update({
      where: {
        id
      },
      data: updateFreelancerDto
    })
  }

  remove(id: string) {
    return this.prisma.freelancer.delete({
      where: {
        id
      }
    })
  }
}
