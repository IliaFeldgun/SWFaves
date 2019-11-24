import { Test, TestingModule } from '@nestjs/testing';
import { RecommendedfilmsController } from './recommendedfilms.controller';

describe('Recommendedfilms Controller', () => {
  let controller: RecommendedfilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendedfilmsController],
    }).compile();

    controller = module.get<RecommendedfilmsController>(RecommendedfilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
