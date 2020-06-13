import React from 'react';
import './TodoList.css';

class TodoTask extends React.Component {
    state = {
        isEditMode: false,
        title: this.props.task.title
    }
    activatedEditMode =()=> {
        this.setState({isEditMode: true})
    };
    deActivatedEditMode =()=> {
        this.setState({isEditMode: false})
        this.props.changeTitle(this.props.task, this.state.title)
    }
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };
    onTitleChanged = (e) => {
      this.setState( {
          title: e.currentTarget.value
      })
    };
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id)
    }
    

    render = () => {

        let classDone = this.props.task.status === 2 ? "todoList-task done" : "todoList-task";

        return (
            <div className={classDone}>
                <span className='delete' onClick={this.onDeleteTask}/>
                <input type="checkbox"
                       checked={this.props.task.status === 2}
                       onChange={this.onIsDoneChanged}/>

                {this.state.isEditMode
                    ? <input value={this.state.title}
                             onChange={this.onTitleChanged}
                             autoFocus={true}
                             onBlur={this.deActivatedEditMode}/>
                    : <span onClick={this.activatedEditMode}>

                        {this.props.task.title}: </span>
                }
                <span> - {this.props.task.priority}</span>

            </div>

        );
    }
}



export default TodoTask;

