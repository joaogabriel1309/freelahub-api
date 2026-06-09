import { Injectable } from '@nestjs/common';
import { CreatePropostaDto } from './dto/create-proposta.dto';
import { UpdatePropostaDto } from './dto/update-proposta.dto';

@Injectable()
export class PropostaService {
  create(createPropostaDto: CreatePropostaDto) {
    return 'This action adds a new proposta';
  }

  findAll() {
    return `This action returns all proposta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proposta`;
  }

  update(id: number, updatePropostaDto: UpdatePropostaDto) {
    return `This action updates a #${id} proposta`;
  }

  remove(id: number) {
    return `This action removes a #${id} proposta`;
  }
}
