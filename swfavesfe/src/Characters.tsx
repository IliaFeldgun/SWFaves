import React from 'react';
import './Characters.css';
import { listenerCount } from 'cluster';
//import { isTemplateElement } from '@babel/types';

interface ICharacterProps {
    name: string,
}
interface ICharacterState {
    checked: boolean,
}

class CharacterItem extends React.PureComponent<ICharacterProps, ICharacterState>{
    constructor(props: ICharacterProps)
    {
        super(props);
        this.state = { checked: false };
    }

    render() {
        return (
            <div className="character">
                <h1 className="character-name">
                {this.props.name}
                </h1>
                <input className="character-checkbox" type="checkbox" value={this.props.name}/>
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
}
class CharacterList extends React.PureComponent<ICharacterListProps,ICharacterListState>{
    constructor (props: ICharacterListProps)
    {
        super (props);
        this.state = {
            list: [],
            filteredList: [],
        }

        this.handleListChange = this.handleListChange.bind(this)
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
    
    render() {
        const characterList = this.state.filteredList.map(
            item => (
                <CharacterItem name={item}/>
            )
        )
        return (
            <div id="characterlist">
                <SearchBox onChange={this.handleListChange}/>
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

function characterFilter(list: string[], filter :string)
{
    let newlist = list.filter(element => {
        return element.toLowerCase().indexOf(filter) != -1;
    })

    return newlist;
}
export default CharacterList;