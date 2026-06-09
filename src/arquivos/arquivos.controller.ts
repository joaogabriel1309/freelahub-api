import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArquivosService } from './arquivos.service';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';

@Controller('arquivos')
export class ArquivosController {
  constructor(private readonly arquivosService: ArquivosService) {}

  @Post()
  create(@Body() createArquivoDto: CreateArquivoDto) {
    return this.arquivosService.create(createArquivoDto);
  }

  @Get()
  findAll() {
    return this.arquivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arquivosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArquivoDto: UpdateArquivoDto) {
    return this.arquivosService.update(+id, updateArquivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arquivosService.remove(+id);
  }
}
