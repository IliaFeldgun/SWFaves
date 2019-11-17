import { Controller, Get} from '@nestjs/common';
import { getAllPeople } from './Access';

@Controller('characters')
export class CharactersController {
    @Get()
    async getAllCharacters() {
        return await getAllPeople()
    }
}
