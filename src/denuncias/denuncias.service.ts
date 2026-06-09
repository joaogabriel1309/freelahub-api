import { Injectable } from '@nestjs/common';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { UpdateDenunciaDto } from './dto/update-denuncia.dto';

@Injectable()
export class DenunciasService {
  create(createDenunciaDto: CreateDenunciaDto) {
    return 'This action adds a new denuncia';
  }

  findAll() {
    return `This action returns all denuncias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} denuncia`;
  }

  update(id: number, updateDenunciaDto: UpdateDenunciaDto) {
    return `This action updates a #${id} denuncia`;
  }

  remove(id: number) {
    return `This action removes a #${id} denuncia`;
  }
}
