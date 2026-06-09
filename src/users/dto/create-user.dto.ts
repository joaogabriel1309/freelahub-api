import { PapelUsuario } from '@prisma/client';

export class CreateUserDto {
  nome!: string;
  email!: string;
  senha!: string;
  papel?: PapelUsuario;
}
