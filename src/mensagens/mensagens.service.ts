import { Injectable } from '@nestjs/common';
import { CreateMensagenDto } from './dto/create-mensagen.dto';
import { UpdateMensagenDto } from './dto/update-mensagen.dto';

@Injectable()
export class MensagensService {
  create(createMensagenDto: CreateMensagenDto) {
    return 'This action adds a new mensagen';
  }

  findAll() {
    return `This action returns all mensagens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mensagen`;
  }

  update(id: number, updateMensagenDto: UpdateMensagenDto) {
    return `This action updates a #${id} mensagen`;
  }

  remove(id: number) {
    return `This action removes a #${id} mensagen`;
  }
}
