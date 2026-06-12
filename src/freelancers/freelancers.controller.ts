import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FreelancersService } from './freelancers.service';
import { CreateFreelancerDto } from './dto/create-freelancer.dto';
import { UpdateFreelancerDto } from './dto/update-freelancer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PapelUsuario } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';

type RequestComUsuario = Request & {
  user: {
    id: string;
    email: string;
    papel: PapelUsuario;
  }
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('freelancers')
export class FreelancersController {
  constructor(private readonly freelancersService: FreelancersService) { }

  @Roles(PapelUsuario.FREELANCER)
  @Post()
  create(@Body() createFreelancerDto: CreateFreelancerDto, @Req() req: RequestComUsuario) {
    return this.freelancersService.create(req.user.id, createFreelancerDto);
  }

  @Roles(PapelUsuario.ADMIN)
  @Get()
  findAll() {
    return this.freelancersService.findAll();
  }

  @Roles(PapelUsuario.FREELANCER, PapelUsuario.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancersService.findOne(id);
  }

  @Roles(PapelUsuario.FREELANCER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFreelancerDto: UpdateFreelancerDto) {
    return this.freelancersService.update(id, updateFreelancerDto);
  }

  @Roles(PapelUsuario.FREELANCER, PapelUsuario.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freelancersService.remove(id);
  }
}
