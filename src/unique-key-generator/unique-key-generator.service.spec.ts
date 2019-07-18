import { Test, TestingModule } from '@nestjs/testing';
import { UniqueKeyGeneratorService } from './unique-key-generator.service';

describe('UniqueKeyGeneratorService', () => {
  let service: UniqueKeyGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueKeyGeneratorService],
    }).compile();

    service = module.get<UniqueKeyGeneratorService>(UniqueKeyGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
