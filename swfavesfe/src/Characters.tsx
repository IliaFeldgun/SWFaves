import React from 'react';
import './Characters.css';
import { getAllPeople, getRecommendedMovies } from './Access'
//import { isTemplateElement } from '@babel/types';

interface ICharacterProps { //TODO: change from string to a class
    name: string,
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}
interface ICharacterState {
    checked: boolean,
}
class CharacterItem extends React.PureComponent<ICharacterProps, ICharacterState>{
    constructor(props: ICharacterProps)
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
                <input type="checkbox" value={this.props.name} checked={this.state.checked} onChange={this.handleCheckChange}/>
                <h2 className="character-name">
                {this.props.name}
                </h2>
                </label>
            </div>
        )
    }
}

interface ICharacterListProps {
    listSource: Promise<string[]>,
}
interface ICharacterListState {
    list: string[],
    filteredList: string[],
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
                <CharacterItem key={item} name={item} onChange={this.handleCheckChange}/>
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

/*interface ICheckedCharacterListProps {
    list: string[],
}
class CheckedCharacterList extends React.PureComponent<ICheckedCharacterListProps,{}>{
    constructor (props: ICheckedCharacterListProps)
    {
        super (props);
        this.state = {
            list: [],
        }
    }
}*/

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
        getRecommendedMovies(this.props.FavoritesList);
    }
    render() {
        return(
            <div id="aroundbutton">
                <button id="suggestbutton" onClick={this.handleClick}>Suggest me some movies!</button>
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

function characterFilter(list: string[], filter :string)
{
    let newlist = list.filter(element => {
        return element.toLowerCase().indexOf(filter) != -1;
    })

    return newlist;
}
export default FavoriteCharacters;