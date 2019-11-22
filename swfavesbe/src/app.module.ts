import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersController } from './characters/characters.controller';
import { CharactersService } from './characters/characters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCharacterSchema, UserFilmsSchema} from './schemas/favoritecharacters.schema';
import { FilmsService } from './films/films.service';
import { CookieMiddleware } from './cookie.middleware';
require('dotenv').config()

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO), 
            MongooseModule.forFeature([{ name: 'UserFilms', schema: UserFilmsSchema }]), 
            MongooseModule.forFeature([{ name: 'UserCharacters', schema: UserCharacterSchema }])],
  controllers: [AppController, CharactersController],
  providers: [AppService, CharactersService, FilmsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CookieMiddleware).forRoutes(CharactersController);
  }
}
