import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import {AppModule} from '../app.module'
import { MongooseModule } from '@nestjs/mongoose';
import { UserCharacterSchema } from '../schemas/favoritecharacters.schema';
jest.setTimeout(30000);
describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService],
      imports: [AppModule,MongooseModule.forRoot(process.env.MONGO), 
        MongooseModule.forFeature([{ name: 'UserCharacters', schema: UserCharacterSchema }])]
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should return an array of films', async () => {
    expect(await service.getAllCharacters()).toHaveLength(87);
  });

  it('Should return an array of films', async () => {
    let userID = 609074512;
    expect((await service.getUserCharacters(userID)).characters).toBeInstanceOf(Array);
  });
  
  /*it('Should return an array of films', async () => {
    expect(await service.putUserCharacters({_id: 1000, characters: ["Sky", "Walker"]})
  });*/
});
