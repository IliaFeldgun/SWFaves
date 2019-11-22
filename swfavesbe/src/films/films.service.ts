import { Injectable } from '@nestjs/common';
import { getAllSWAPIFilms } from '../SWAPIAccess';

@Injectable()
export class FilmsService {
    async getAllFilms()
    {
        return getAllSWAPIFilms()
    }
}
