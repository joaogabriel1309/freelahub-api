import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { PapelUsuario } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;

  const prismaMock = {
    usuario: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: PrismaService,
        useValue: prismaMock,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('deve criar um novo usuário', () => {
    const dto = {
      nome: 'John Doe',
      email: 'n7PnI@example.com',
      senha: 'password123',
      papel: PapelUsuario.CLIENTE,
    };

    const usuarioCriado = {
      id: 'uuid',
      nome: dto.nome,
      email: dto.email,
      papel: dto.papel,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    prismaMock.usuario.create.mockResolvedValue(usuarioCriado);

    const resultado = service.create(dto);

    expect(resultado).resolves.toEqual(usuarioCriado);
    expect(prismaMock.usuario.create).toHaveBeenCalledWith({
      data: dto,
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  });

  it('deve retornar todos os usuários', () => {
    const usuarios = [
      {
        id: 'uuid1',
        nome: 'John Doe',
        email: 'n7PnI@example.com',
        papel: PapelUsuario.CLIENTE,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
      {
        id: 'uuid2',
        nome: 'Jane Doe',
        email: 'oGx2y@example.com',
        papel: PapelUsuario.CLIENTE,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      },
    ];

    prismaMock.usuario.findMany.mockResolvedValue(usuarios);

    const resultado = service.findAll();

    expect(resultado).resolves.toEqual(usuarios);
    expect(prismaMock.usuario.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  });

  it('deve retornar um usuário por ID', async () => {
    const usuario = {
      id: 'uuid',
      nome: 'John Doe',
      email: 'n7PnI@example.com',
      papel: PapelUsuario.CLIENTE,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    prismaMock.usuario.findUnique.mockResolvedValue(usuario);

    const resultado = await service.findOne('uuid');

    expect(resultado).toEqual(usuario);
    expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
      where: { id: 'uuid' },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  });

  it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
    prismaMock.usuario.findUnique.mockResolvedValue(null);

    await expect(service.findOne('uuid')).rejects.toThrow(
      'Usuário não encontrado',
    );
  });

  it('deve atualizar um usuario', async () => {
    const dto = {
      nome: 'Joao Atualizado',
    };

    const usuarioAtualizado = {
      id: 'uuid',
      nome: dto.nome,
      email: 'joao@email.com',
      papel: PapelUsuario.CLIENTE,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    prismaMock.usuario.update.mockResolvedValue(usuarioAtualizado);

    const resultado = await service.update('uuid', dto);

    expect(resultado).toEqual(usuarioAtualizado);
    expect(prismaMock.usuario.update).toHaveBeenCalledWith({
      where: { id: 'uuid' },
      data: dto,
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  });

  it('deve remover um usuario', async () => {
    const usuarioRemovido = {
      id: 'uuid',
      nome: 'Joao',
      email: 'joao@email.com',
      papel: PapelUsuario.CLIENTE,
    };

    prismaMock.usuario.delete.mockResolvedValue(usuarioRemovido);

    const resultado = await service.remove('uuid');

    expect(resultado).toEqual(usuarioRemovido);
    expect(prismaMock.usuario.delete).toHaveBeenCalledWith({
      where: { id: 'uuid' },
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  });
});
