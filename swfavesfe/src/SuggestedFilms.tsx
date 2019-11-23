import React from 'react';
import './SWFaves.css';
import { getSuggestedMovies, getQueryString } from './APIAccess'
import { IFilm } from './interfaces/IFilm'
import Modal from 'react-modal';


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
                <ShareButton />
            </div>
        )
    }
}

class ShareButton extends React.PureComponent<{},{modalIsOpen: boolean}>{
    constructor(props : {}) {
        super(props);
        
        this.state = {
            modalIsOpen: false
        };
        
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    afterOpenModal() {

    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
      return (
        <div className="around-button">
            <button className="main-button" onClick={this.openModal}>Share</button>
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Share"
            >
                <h1>Share this link:</h1>
                <input className="url-textbox" type="url" value={document.URL} />
            </Modal>
        </div>
      );
    }
  }

  const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default FilmSuggestions;