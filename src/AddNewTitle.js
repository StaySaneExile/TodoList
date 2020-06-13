import React from 'react';
import './App.css';

class AddNewTitle extends React.Component {
    state = {
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
    titleChange = (e) => {
        this.setState({
            error: false,
            inputValue: e.currentTarget.value
        })
    }
    onKeyPress = (e) => {
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
                <button className={this.props.buttonStyle} onClick={this.onAddItemClick}>{this.props.buttonTitle}</button>
            </div>
        );
    }
}


export default AddNewTitle;

