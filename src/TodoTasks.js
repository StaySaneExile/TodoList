import React from 'react';
import './TodoList.css';
import TodoTask from "./TodoTask"
import PropTypes from 'prop-types';
import TodoFooter from "./TodoFooter";

class TodoTasks extends React.Component {
    render = () => {
        let tasksElement = this.props.tasks.map(task => {
            return (
                <TodoTask task={task}
                          onDeleteTask={this.props.onDeleteTask}
                          changeTitle={this.props.changeTitle}
                          changeStatus={this.props.changeStatus} />
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
TodoTasks.propTypes = {
    tasks: PropTypes.array
}

