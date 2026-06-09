import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PapelUsuario } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;

  const usersServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    jest.clearAllMocks();
  });

  it('deve criar um novo usuário', () => {
    const dto = {
      nome: 'John Doe',
      email: 'n7PnI@example.com',
      senha: 'password123',
    };

    const usuarioCriado = {
      id: 'uuid',
      nome: dto.nome,
      email: dto.email,
      papel: 'CLIENTE',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    usersServiceMock.create.mockResolvedValue(usuarioCriado);

    expect(controller.create(dto)).resolves.toEqual(usuarioCriado);
    expect(usersServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('deve retornar todos os usuários', () => {
    const usuarios = [
      {
        id: 'uuid1',
        nome: 'John Doe',
        email: 'n7PnI@example.com',
        papel: 'CLIENTE',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
      {
        id: 'uuid2',
        nome: 'Jane Doe',
        email: 'oGx2y@example.com',
        papel: 'CLIENTE',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
    ];

    usersServiceMock.findAll.mockResolvedValue(usuarios);

    expect(controller.findAll()).resolves.toEqual(usuarios);
    expect(usersServiceMock.findAll).toHaveBeenCalled();
  });

  it('deve buscar um usuário por id', async () => {
    const usuario = {
      id: 'uuid',
      nome: 'Joao',
      email: 'joao@email.com',
      papel: PapelUsuario.CLIENTE,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    usersServiceMock.findOne.mockResolvedValue(usuario);

    await expect(controller.findOne('uuid')).resolves.toEqual(usuario);
    expect(usersServiceMock.findOne).toHaveBeenCalledWith('uuid');
  });

  it('deve atualizar um usuário', async () => {
    const dto = {
      nome: 'Joao Atualizado',
    };

    const usuario = {
      id: 'uuid',
      nome: dto.nome,
      email: 'joao@email.com',
      papel: PapelUsuario.CLIENTE,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    usersServiceMock.update.mockResolvedValue(usuario);

    await expect(controller.update('uuid', dto)).resolves.toEqual(usuario);
    expect(usersServiceMock.update).toHaveBeenCalledWith('uuid', dto);
  });

  it('deve remover um usuário', async () => {
    const usuario = {
      id: 'uuid',
      nome: 'Joao',
      email: 'joao@email.com',
      papel: PapelUsuario.CLIENTE,
    };

    usersServiceMock.remove.mockResolvedValue(usuario);

    await expect(controller.remove('uuid')).resolves.toEqual(usuario);
    expect(usersServiceMock.remove).toHaveBeenCalledWith('uuid');
  });
});
