import React from 'react';


class AddNewTitle extends React.Component {
    state = {
        error: false,
        inputValue: ""
    }
    onAddItemClick = () => {
        let newTitle = this.state.inputValue.trim();
        if(newTitle === "") {
            this.setState({error: true})
        } else {
            this.props.addItem(newTitle)
            this.setState({error: false,
            inputValue: ""})
    }}
    titleChange = (e) => {
        this.setState({
            error: false,
            inputValue: e.currentTarget.value})
    }
    onKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.onAddItemClick();
        }
    }
    render = () => {
        let error = this.state.error ? "error" : "";
        return (
            <div className="todoList">
                <div className="todoList-header">
                    <div className="todoList-newTaskForm">
                        <input className={error}
                               onChange={this.titleChange}
                               onKeyPress={this.onKeyPress}
                               value={this.state.inputValue}
                               type="text"
                               placeholder={this.props.holder}/>
                        <button onClick={this.onAddItemClick}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddNewTitle;

