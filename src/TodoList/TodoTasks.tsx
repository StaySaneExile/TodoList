import React from 'react';
import '../TodoList.css';
import TodoTask from "../Tasks/TodoTask";
import {TaskType} from "../Types/enteties";

type OwnType = {
    task: Array<TaskType>
    onDeleteTask: (taskId: string) =>void
    changeTitle: (task: TaskType, title: string) => void
    changeStatus: (newTask: TaskType, status: boolean) => void
}

class TodoTasks extends React.Component<OwnType> {
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


