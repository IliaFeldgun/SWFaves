import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCharacterSchema } from '../schemas/favoritecharacters.schema';
jest.setTimeout(30000);
describe('Characters Controller', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService],
      imports: [AppModule,MongooseModule.forRoot(process.env.MONGO), 
        MongooseModule.forFeature([{ name: 'UserCharacters', schema: UserCharacterSchema }])]
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return an array of films', async () => {
    expect(await controller.getAllCharacters()).toHaveLength(87);
  });
});
