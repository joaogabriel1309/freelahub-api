import { Test, TestingModule } from '@nestjs/testing';
import { HabilidadesController } from './habilidades.controller';
import { HabilidadesService } from './habilidades.service';

describe('HabilidadesController', () => {
  let controller: HabilidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabilidadesController],
      providers: [HabilidadesService],
    }).compile();

    controller = module.get<HabilidadesController>(HabilidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
