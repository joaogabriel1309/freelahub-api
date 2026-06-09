import { Injectable } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';

@Injectable()
export class ArquivosService {
  create(createArquivoDto: CreateArquivoDto) {
    return 'This action adds a new arquivo';
  }

  findAll() {
    return `This action returns all arquivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} arquivo`;
  }

  update(id: number, updateArquivoDto: UpdateArquivoDto) {
    return `This action updates a #${id} arquivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} arquivo`;
  }
}
