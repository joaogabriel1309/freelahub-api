import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async login(createAuthDto: CreateAuthDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: createAuthDto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(
      createAuthDto.senha,
      usuario.senha,
    );

    if (!senhaValida) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { sub: usuario.id, email: usuario.email, papel: usuario.papel };
    const token = await this.jwtService.sign(payload);

    return {
      token
    };
  }
}
