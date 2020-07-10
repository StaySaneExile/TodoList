import React, {ChangeEvent} from 'react';

type StateType = {
    editMode: boolean
    title: string
}
type OwnTypes = {
    title: string
    changeTitleTodo: (todoId: string , title: string)=> void
    onDeleteTodoList: (Id: string)=> void
    todoListId: string
}
type MapDispatchType = {
    onDeleteTodoList: (id: string)=> void
    changeTitleTodo: (id: string, title: string)=> void
}

class TodoHeader extends React.Component<MapDispatchType & OwnTypes, StateType> {

    state: StateType = {
        editMode: false,
        title: this.props.title
    };

    onClickDeleteTodoList = () => {
        this.props.onDeleteTodoList(this.props.todoListId)
    }
    currentTargetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        this.setState({
            title: e.currentTarget.value
        })
    }

    editModeIsOFF = () => {
        debugger
        this.setState({editMode: false})
        this.props.changeTitleTodo(this.props.todoListId, this.state.title)
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

