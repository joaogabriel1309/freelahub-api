import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
  @IsEmail({}, { message: "O email deve ser válido" })
  @IsNotEmpty({ message: "O email é obrigatório" })
  email!: string;

  @IsNotEmpty({ message: "O campo senha é obrigatório" })
  @IsString({ message: "A senha deve ser um texto" })
  senha!: string;
}
