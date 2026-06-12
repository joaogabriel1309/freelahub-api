import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFreelancerDto {

  @IsOptional()
  @IsString({ message: 'O campo titulo deve ser uma texto' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'O campo biografia deve ser uma texto' })
  biografia?: string;

  @IsOptional()
  @IsNumber()
  valorHora?: number;

  @IsOptional()
  @IsString({ message: 'O campo telefone deve ser uma texto' })
  telefone?: string;
}
