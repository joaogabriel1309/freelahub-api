import { StatusProjeto } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProjetoDto {

  @IsNotEmpty({ message: 'O campo titulo deve ser preenchido' })
  @IsString({ message: 'O campo titulo deve ser uma texto' })
  titulo?: string;

  @IsNotEmpty({ message: 'O campo descrição deve ser preenchido' })
  @IsString({ message: 'O campo descrição deve ser uma texto' })
  descricao?: string;

  @IsOptional()
  @IsNumber()
  orcamento?: number;

  @IsOptional()
  @IsEnum(StatusProjeto)
  status?: StatusProjeto;
}
