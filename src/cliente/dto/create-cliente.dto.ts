import { IsEmpty, IsOptional, IsString } from "class-validator";

export class CreateClienteDto {
  @IsOptional()
  @IsString({ message: "O campo documento deve ser uma texto" })
  documento?: string;

  @IsOptional()
  @IsString({ message: "O campo empresa deve ser uma texto" })
  empresa?: string;

  @IsOptional()
  @IsString({ message: "O campo telefone deve ser uma texto" })
  telefone?: string;
}
