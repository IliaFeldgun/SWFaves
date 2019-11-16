import React from 'react';
import './Characters.css';
import { getAllPeople } from './Access'
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
            <li key={this.props.name} className="character">
                <h1 className="character-name">
                {this.props.name}
                </h1>
                <input className="character-checkbox" type="checkbox" value={this.props.name}/>
            </li>
        )
    }
}

interface ICharacterListState {
    list: string[],
}

class CharacterList extends React.PureComponent<{},ICharacterListState>{
    constructor (props: Readonly<{}>)
    {
        super (props);
        this.state = {list: []}
    }

    componentDidMount() {
        this.loadPeople()
    }

    loadPeople() {
        getAllPeople().then((result) => this.setState({list: result}) )
    }
    render() {
        const characterList = this.state.list.map(
            item => (
                <CharacterItem name={item}/>
            )
        )

        console.log(this.state.list)
        return (
            <ol>
                {characterList}
            </ol>
        )
    }
}
export default CharacterList;