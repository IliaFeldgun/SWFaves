import { Controller, Get, Param } from '@nestjs/common';
import { RecommendedFilmsService } from './recommendedfilms.service';

@Controller('recommendedfilms')
export class RecommendedFilmsController {
    constructor(private readonly recommendedFilmsService: RecommendedFilmsService){}
    
    @Get(':id')
    async getUserFilmsByCharacters(@Param('id') userId: number) {
        return this.recommendedFilmsService.getUserFilmsByCharacters(userId);
    }
}
