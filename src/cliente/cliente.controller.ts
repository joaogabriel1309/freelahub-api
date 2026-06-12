import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ConflictException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PapelUsuario } from '@prisma/client';
import { Prisma } from '@prisma/client';

type RequestComUsuario = Request & {
  user: {
    id: string;
    email: string;
    papel: PapelUsuario;
  }
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Post()
  @Roles(PapelUsuario.CLIENTE)
  create(@Body() createClienteDto: CreateClienteDto, @Req() req: RequestComUsuario) {
    try {
      return this.clienteService.create(req.user.id, createClienteDto);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Cliente já cadastrado para esse usuário');
      }

      throw error;
    }

  }

  @Roles(PapelUsuario.ADMIN)
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Roles(PapelUsuario.CLIENTE, PapelUsuario.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Roles(PapelUsuario.CLIENTE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Roles(PapelUsuario.CLIENTE, PapelUsuario.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
