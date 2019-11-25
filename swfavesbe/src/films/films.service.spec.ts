import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import {AppModule} from '../app.module'
jest.setTimeout(30000);
describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
      imports: [AppModule]
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return an array of films', async () => {
    expect(await service.getAllFilms()).toHaveLength(7);
  });
});
