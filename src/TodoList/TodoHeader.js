import React from 'react';


class TodoHeader extends React.Component {

    state = {
        editMode: false,
        title: this.props.title
    };

    onClickDeleteTodoList = () => {
        this.props.onDeleteTodoList(this.props.todoListId)
    }
    currentTargetTitle = (e) => {
        debugger
        this.setState({
            title: e.currentTarget.value
        })
    }

    editModeIsOFF = () => {
        debugger
        this.setState({editMode: false})
        this.props.changeTitleTodo(this.state.title)
    }

    editModeIsON = () => {
        debugger
        this.setState({editMode: true})
    }


    render = () => {
        return (
            <div>
            {this.state.editMode
                    ?
                        <input onBlur={this.editModeIsOFF}
                               onChange={this.currentTargetTitle}
                               value={this.state.title}/>
                    :
                    <div className="header_tasks">
                        <h3 onClick={this.editModeIsON} className="header_title">{this.props.title}</h3>
                        <button onClick={this.onClickDeleteTodoList} className='deleteTodoList'/>
                    </div>
            }
            </div>
        );
    }
}


export default TodoHeader;

