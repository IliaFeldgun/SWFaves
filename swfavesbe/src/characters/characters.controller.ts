import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { CharactersService } from './characters.service'
import { UserCharacters } from './UserCharacters.interface';

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) {}
    
    @Get()
    async getAllCharacters() {
        return this.charactersService.getAllCharacters();
    }  

    @Post()
    async putUserCharacters(@Body() body: UserCharacters) {
        await this.charactersService.putUserCharacters(body)
    }
}
