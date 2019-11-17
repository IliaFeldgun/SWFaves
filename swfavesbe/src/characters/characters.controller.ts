import { Controller, Get} from '@nestjs/common';
import { CharactersService } from './characters.service'

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) {}
    
    @Get()
    async getAllCharacters() {
        return this.charactersService.getAllCharacters();
    }
}
