import { ICharacter } from './ICharacter'

export interface IFilm {
    title: string,
    episode_id: number,
    release_date: string,
    score: number,
    favoriteCharacters: ICharacter[],
}