import { Test, TestingModule } from '@nestjs/testing';
import { RecommendedFilmsService } from './recommendedfilms.service';

describe('RecommendedfilmsService', () => {
  let service: RecommendedFilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendedFilmsService],
    }).compile();

    service = module.get<RecommendedFilmsService>(RecommendedFilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
