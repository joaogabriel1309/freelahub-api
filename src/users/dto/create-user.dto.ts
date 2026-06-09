import { PapelUsuario } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O campo nome deve ser preenchido' })
  @IsString()
  nome!: string;

  @IsNotEmpty({ message: 'O campo email deve ser preenchido' })
  @IsEmail({}, { message: 'O campo email deve ser um endereço de email válido' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo senha deve ser preenchido' })
  @MinLength(6)
  senha!: string;

  @IsOptional()
  @IsEnum(PapelUsuario)
  papel?: PapelUsuario;
}
