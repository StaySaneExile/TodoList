import React from 'react';
import '../TodoList.css';
import TodoTask from "../Tasks/TodoTask";

class TodoTasks extends React.Component {
    render = () => {
        let tasksElement = this.props.task.map(task => {
            return (
                <TodoTask task={task}
                          onDeleteTask={this.props.onDeleteTask}
                          changeTitle={this.props.changeTitle}
                          changeStatus={this.props.changeStatus}/>
            )
        });

        return (
            <div className="todoList-tasks">
                {tasksElement}
            </div>

        );
    }
}

export default TodoTasks;


