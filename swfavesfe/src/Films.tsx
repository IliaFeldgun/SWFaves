import React from 'react';
import './Films.css';

interface IFilmListProps {
    listSource: Promise<string[]>,
}
interface IFilmListState {
    list: string[],
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
}

class FilmSuggestions extends React.PureComponent<{},{}>{
    render() {
        return (
            <div id="filmsuggestions">
                <h1>Theses are the recommended films for 
                </h1>
                {/*<FilmList listSource={[]}/>*/}
            </div>
        )
    }
}

export default FilmSuggestions;