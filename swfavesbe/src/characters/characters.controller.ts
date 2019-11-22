import { Controller, Get, Post} from '@nestjs/common';
import { CharactersService } from './characters.service'

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) {}
    
    @Post()
    async getAllCharacters() {
        return this.charactersService.getAllCharacters();
    }

    @Get()
    async putUserCharacters() {
        await this.charactersService.putUserCharacters({characters: ["Luke", "Sky"], _id: 600})
    }
}
