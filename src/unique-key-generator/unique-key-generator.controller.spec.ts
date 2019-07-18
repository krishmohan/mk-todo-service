import { Test, TestingModule } from '@nestjs/testing';
import { UniqueKeyGeneratorController } from './unique-key-generator.controller';

describe('UniqueKeyGenerator Controller', () => {
  let controller: UniqueKeyGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniqueKeyGeneratorController],
    }).compile();

    controller = module.get<UniqueKeyGeneratorController>(UniqueKeyGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
