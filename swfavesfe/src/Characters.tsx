import React from 'react';
import './SWFaves.css';
import { getAllPeople, postFavorites } from './APIAccess'
import { Link } from 'react-router-dom';
import { cookieName } from "./config"
import * as cookiesjs from "cookies-js" 
import { ICharacter } from "./interfaces/ICharacter"
import { Character } from "./basiccomponents/Character"
//import { isTemplateElement } from '@babel/types';

interface ICharacterItemProps {
    character: ICharacter,
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}
interface ICharacterItemState {
    checked: boolean,
}
class CharacterItem extends React.PureComponent<ICharacterItemProps, ICharacterItemState>{
    constructor(props: ICharacterItemProps)
    {
        super(props);
        this.state = { checked: false };
        this.handleCheckChange = this.handleCheckChange.bind(this)
    }

    handleCheckChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState( {
            checked: event.target.checked
        });

        this.props.onChange(event);
    }

    render() {
        return (
            <div className="character">
                <label>
                    <input type="checkbox" value={this.props.character.name} checked={this.state.checked} onChange={this.handleCheckChange}/>
                    <Character character={this.props.character}/>
                </label>
            </div>
        )
    }
}

interface ICharacterListProps {
    listSource: Promise<ICharacter[]>,
}
interface ICharacterListState {
    list: ICharacter[],
    filteredList: ICharacter[],
    checkedList: string[],
}
class CharacterList extends React.PureComponent<ICharacterListProps,ICharacterListState>{
    constructor (props: ICharacterListProps)
    {
        super (props);
        this.state = {
            list: [],
            filteredList: [],
            checkedList: [],
        }

        this.handleListChange = this.handleListChange.bind(this)
        this.handleCheckChange = this.handleCheckChange.bind(this)
    }

    componentDidMount() {
        this.props.listSource.then((result) => this.setState({list: result , filteredList: result,}))
            
        
    }
    handleListChange(event: React.ChangeEvent<HTMLInputElement>){
        let newList = characterFilter(this.state.list.slice(), event.target.value)

        this.setState({
            filteredList: newList,
        })
    }

    handleCheckChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        let newList = this.state.checkedList.slice();
        
        if (event.target.checked == true)
        {
            newList.push(event.target.value)
        }
        else
        {
            newList = newList.filter(element => {return element != event.target.value})
        }

        this.setState({
            checkedList: newList,
        })
    }
    render() {
        const characterList = this.state.filteredList.map(
            item => (
                <CharacterItem key={item.name} character={item} onChange={this.handleCheckChange}/>
            )
        )
        return (
            <div id="characterlist">
                <h3>Search here:</h3>
                <SearchBox onChange={this.handleListChange}/>
                <SuggestButton FavoritesList={this.state.checkedList}/>
                <div id="characters">
                    {characterList}
                </div>
            </div>
        )
    }
}

interface ISearchBoxProps {
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}
class SearchBox extends React.PureComponent<ISearchBoxProps,{}>{
    
    render() {
        return (
            <input className="search-box" type="text" 
            onChange={this.props.onChange}></input>
        )
    }
}

interface ISuggestButtonProps{
    FavoritesList: string[],
}
class SuggestButton extends React.PureComponent<ISuggestButtonProps,{}>{
    constructor (props: ISuggestButtonProps)
    {
        super (props);

        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(ev: React.MouseEvent)
    {
        postFavorites(this.props.FavoritesList, +cookiesjs.get(cookieName));
    }
    render() {
        const linkPath = "/suggestedfilms?id=" + +cookiesjs.get(cookieName)
        return(
            <div className="around-button">
                <Link to={linkPath}>
                    <button className="main-button" id="suggestbutton" onClick={this.handleClick}>Suggest me some movies!</button>
                </Link>
            </div>
        )
    }
}

class FavoriteCharacters extends React.PureComponent<{},{}>{
    render() {
        return (
            <div id="favoritecharacters">
                <h1>
                    Welcome!

                    Go ahead, pick you favorite Star Wars characters
                </h1>
                <CharacterList listSource={getAllPeople()}/>
            </div>
        )
    }
}

function characterFilter(list: ICharacter[], filter: string) : ICharacter[]
{
    let newlist = list.filter(element => {
        return element.name.toLowerCase().indexOf(filter) != -1;
    })

    return newlist;
}

export default FavoriteCharacters;