import React from 'react';
import './TodoList.css';

class TodoTask extends React.Component {
    state = {
        isEditMode: false
    }
    activatedEditMode =()=> {
        this.setState({isEditMode: true})
    };
    deActivatedEditMode =()=> {
        this.setState({isEditMode: false})
    }
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    };
    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    };
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id)
    }

    render = () => {
        let classDone = this.props.task.isDone ? "todoList-task done" : "todoList-task";
        return (
            <div className={classDone}>
                <span className='delete' onClick={this.onDeleteTask}/>
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={this.onIsDoneChanged}/>

                {this.state.isEditMode
                    ? <input value={this.props.task.title}
                             onChange={this.onTitleChanged}
                             autoFocus={true}
                             onBlur={this.deActivatedEditMode}/>
                    : <span onClick={this.activatedEditMode}>
                        {this.props.task.id}:
                        {this.props.task.title}: </span>
                }
                <span> - {this.props.task.priority}</span>

            </div>

        );
    }
}

export default TodoTask;

