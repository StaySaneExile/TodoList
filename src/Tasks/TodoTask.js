import React from 'react';
import './TodoTask.css';

class TodoTask extends React.Component {
    state = {
        isEditMode: false,
        title: this.props.task.title
    }
    activatedEditMode = () => {
        this.setState({isEditMode: true})
    };
    deActivatedEditMode = () => {
        this.setState({isEditMode: false})
        this.props.changeTitle(this.props.task, this.state.title)
    }
    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    };
    onTitleChanged = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    };
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id)
    }


    render = () => {

        let classDone = this.props.task.status === 2 ? "todoList-task_done" : "todoList-task";

        return (
            <div className='task'>
                <div className={classDone}>
                    <input type="checkbox"
                           className='checkbox'
                           checked={this.props.task.status === 2}
                           onChange={this.onIsDoneChanged}/>

                    {this.state.isEditMode
                        ? <input value={this.state.title}
                                 onChange={this.onTitleChanged}
                                 autoFocus={true}
                                 onBlur={this.deActivatedEditMode}/>
                        :
                        <div className={'title_task'}>
                        <span onClick={this.activatedEditMode}>
                        {this.props.task.title}</span>
                        </div>
                    }
                    {/*<span> - {this.props.task.priority}</span>*/}
                    <span className='delete' onClick={this.onDeleteTask}/>
                </div>
            </div>

        );
    }
}


export default TodoTask;

