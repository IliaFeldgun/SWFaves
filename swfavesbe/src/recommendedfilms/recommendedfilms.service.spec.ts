import { Test, TestingModule } from '@nestjs/testing';
import { RecommendedFilmsService } from './recommendedfilms.service';
import {AppModule} from '../app.module'
import { CharactersService } from '../characters/characters.service';
import { FilmsService } from '../films/films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCharacterSchema } from '../schemas/favoritecharacters.schema';

jest.setTimeout(30000);
describe('RecommendedfilmsService', () => {
  let service: RecommendedFilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendedFilmsService, CharactersService, FilmsService],
      imports: [AppModule,MongooseModule.forRoot(process.env.MONGO), 
        MongooseModule.forFeature([{ name: 'UserCharacters', schema: UserCharacterSchema }])]
    }).compile();

    service = module.get<RecommendedFilmsService>(RecommendedFilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of suggested films', async () => {
    let userID = 609074512;
    expect(service.getUserFilmsByCharacters(userID)).toHaveLength(7);
  })
  it('should return an empty array (nonexistent ID)', async () => {
    let userID = 11;
    expect(service.getUserFilmsByCharacters(userID)).toHaveLength(0);
  })
});
