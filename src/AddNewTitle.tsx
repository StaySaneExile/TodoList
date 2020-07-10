import React, {ChangeEvent, KeyboardEvent} from 'react';
import './App.css';

type OwnPropsType = {
    addItem: (title: string) => void
    inputStyleErr?: string
    inputStyleDef?: string
    buttonStyle?: string
    buttonTitle?: string
    holder?: string
    style?: string
}

type StateType = {
    error: boolean
    inputValue: string
}



class AddNewTitle extends React.Component<OwnPropsType, StateType> {
    state: StateType = {
        error: false,
        inputValue: ""
    }
    onAddItemClick = () => {
        let newTitle = this.state.inputValue.trim();
        if (newTitle === "") {
            this.setState({error: true})
        } else {
            this.props.addItem(newTitle)
            this.setState({
                error: false,
                inputValue: ""
            })
        }
    }
    titleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            inputValue: e.currentTarget.value
        })
    }
    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    }
    render = () => {
        let error = this.state.error ? this.props.inputStyleErr : this.props.inputStyleDef;
        return (
            <div className={this.props.style}>
                <input className={error}
                       onChange={this.titleChange}
                       onKeyPress={this.onKeyPress}
                       value={this.state.inputValue}
                       type="text"
                       placeholder={this.props.holder}/>
                <button className={this.props.buttonStyle}
                        onClick={this.onAddItemClick}>{this.props.buttonTitle}</button>
            </div>
        );
    }
}


export default AddNewTitle;

