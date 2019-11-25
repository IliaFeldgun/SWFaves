import { Test, TestingModule } from '@nestjs/testing';
import { RecommendedFilmsController as RecommendedFilmsController } from './recommendedfilms.controller';
import { RecommendedFilmsService } from './recommendedfilms.service';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCharacterSchema } from '../schemas/favoritecharacters.schema';
import { CharactersService } from '../characters/characters.service';
import { FilmsService } from '../films/films.service';

jest.setTimeout(30000);
describe('Recommendedfilms Controller', () => {
  let controller: RecommendedFilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendedFilmsController],
      providers: [RecommendedFilmsService, CharactersService, FilmsService],
      imports: [AppModule,MongooseModule.forRoot(process.env.MONGO), 
        MongooseModule.forFeature([{ name: 'UserCharacters', schema: UserCharacterSchema }])]
    }).compile();

    controller = module.get<RecommendedFilmsController>(RecommendedFilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of suggested films', async () => {
    let userID = 609074512;
    expect(controller.getUserFilmsByCharacters(userID)).toHaveLength(7);
  })
  it('should return an empty array (nonexistent ID)', async () => {
    let userID = 11;
    expect(controller.getUserFilmsByCharacters(userID)).toHaveLength(0);
  })
  it('should return an empty array (null ID)', async () => {
    let userID = null;
    expect(controller.getUserFilmsByCharacters(userID)).toHaveLength(0);
  })
});
