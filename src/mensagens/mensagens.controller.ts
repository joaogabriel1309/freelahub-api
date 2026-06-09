import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MensagensService } from './mensagens.service';
import { CreateMensagenDto } from './dto/create-mensagen.dto';
import { UpdateMensagenDto } from './dto/update-mensagen.dto';

@Controller('mensagens')
export class MensagensController {
  constructor(private readonly mensagensService: MensagensService) {}

  @Post()
  create(@Body() createMensagenDto: CreateMensagenDto) {
    return this.mensagensService.create(createMensagenDto);
  }

  @Get()
  findAll() {
    return this.mensagensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mensagensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMensagenDto: UpdateMensagenDto) {
    return this.mensagensService.update(+id, updateMensagenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mensagensService.remove(+id);
  }
}
