import React from 'react';


class TodoHeader extends React.Component {

    onClickDeleteTodoList = () => {
        this.props.onDeleteTodoList(this.props.todoListId)
    }

    render = () => {
        return (
                <div className="header_tasks">
                    <h3 className="header_title">{this.props.title}</h3>
                    <button onClick={this.onClickDeleteTodoList} className='deleteTodoList'/>
                </div>

        );
    }
}


export default TodoHeader;

