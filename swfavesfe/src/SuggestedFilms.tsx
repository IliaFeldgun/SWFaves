import React from 'react';
import './Films.css';
import { getSuggestedMovies, getQueryString } from './APIAccess'
import { IFilm } from './interfaces/IFilm'


interface IFilmItemProps {
    film: IFilm,
}
class FilmItem extends React.PureComponent<IFilmItemProps,{}>
{
    render() {
        const characterList = this.props.film.favoriteCharacters.map(
            item => (
                <li>{item}</li>
            )
        );

        return (
            <div className="film">
                <div className="title">
                    <h2>{this.props.film.title}</h2>
                </div>
                <div className="release-date">
                    <h3>{this.props.film.release_date}</h3>
                </div>
                <div className="favorite-characters">
                    <ul>{characterList}</ul>
                </div>
            </div>
        )
    }
}

interface IFilmListProps {
    listSource: Promise<IFilm[]>,
}
interface IFilmListState {
    list: IFilm[],
}
class FilmList extends React.PureComponent<IFilmListProps,IFilmListState>{
    constructor (props: IFilmListProps)
    {
        super (props);
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        this.props.listSource.then((result) => this.setState({list: result,}))
    }

    render() {
        const filmList = this.state.list.map(
            item => (
                <FilmItem key={item.episode_id} film={item} />
            )
        )
        return (
            <div id="filmlist">
                <div id="films">
                    {filmList}
                </div>
            </div>
        )
        
    }
}

class FilmSuggestions extends React.PureComponent<{},{}>{
    render() {
        return (
            <div id="filmsuggestions">
                <h1>Theses are the recommended films for 
                </h1>
                <FilmList listSource={getSuggestedMovies(+getQueryString('id'))}/>
            </div>
        )
    }
}

export default FilmSuggestions;