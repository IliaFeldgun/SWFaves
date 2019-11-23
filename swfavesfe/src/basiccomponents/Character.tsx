import React from 'react';
import { ICharacter } from "../interfaces/ICharacter"

export class Character extends React.PureComponent<{character: ICharacter}, {}>{
    render(){
        return (
            <h2 className="character-name">
                {this.props.character.name}
            </h2>
        )
    }
}