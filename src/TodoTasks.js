import React from 'react';
import './App.css';
import TodoTask from "./TodoTask"

class TodoTasks extends React.Component {
    render = () => {
        let tasksElement = this.props.tasks.map(task => {
            return (
                <TodoTask title={task.title} isDone={task.isDone} priority={task.priority} />
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

