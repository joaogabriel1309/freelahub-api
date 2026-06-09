import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PapelUsuario } from '@prisma/client';

describe('CreateUserDto', () => {
  it('deve validar um dto correto', async () => {
    const dto = new CreateUserDto();
    dto.nome = 'Joao';
    dto.email = 'joao@email.com';
    dto.senha = '123456';
    dto.papel = PapelUsuario.CLIENTE;

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('deve rejeitar nome vazio', async () => {
    const dto = new CreateUserDto();
    dto.nome = '';
    dto.email = 'joao@email.com';
    dto.senha = '123456';

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'nome')).toBe(true);
  });

  it('deve rejeitar email inválido', async () => {
    const dto = new CreateUserDto();
    dto.nome = 'Joao';
    dto.email = 'email-invalido';
    dto.senha = '123456';

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'email')).toBe(true);
  });

  it('deve rejeitar senha curta', async () => {
    const dto = new CreateUserDto();
    dto.nome = 'Joao';
    dto.email = 'joao@email.com';
    dto.senha = '123';

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'senha')).toBe(true);
  });
});