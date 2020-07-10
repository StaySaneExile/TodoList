import React from 'react';
import './TodoList.css';
import TodoHeader from "./TodoList/TodoHeader";
import TodoTasks from "./TodoList/TodoTasks";
import TodoFooter from "./TodoList/TodoFooter";
import AddNewTitle from "./AddNewTitle";
import {connect} from "react-redux";
import {
    changeTask, changeTitleTodo, createTask,
    deleteTask, getTasks,
} from "./reducer";
import {TaskType} from "./Types/enteties";
import {AppStateType} from "./Store";


type OwnTypes = {
    key: string
    id: string
    title: string
    onDeleteTodoList: (Id: string) => void
    tasks: Array<TaskType>
}
type StateType = {
    tasks: Array<TaskType>
    filterValue: string
    editMode: boolean
    title: string
}
type MapDispatchPropsType = {
    changeTask: (todoId: string, taskId: string, task: TaskType) => void
    changeTitleTodo: (id: string, title: string) => void
    createTask: (taskId: string, newTitle: string) => void
    deleteTask: (todoId: string, taskId: string) => void
    getTasks: (id: string) => void
}

class TodoList extends React.Component <MapDispatchPropsType & OwnTypes, StateType> {
    state: StateType = {
        tasks: [],
        filterValue: "All",
        editMode: false,
        title: ''
    };

    componentDidMount() {
        this.restoreState();
    }
    restoreState = () => {
        this.props.getTasks(this.props.id)
    }
    addTask = (newTitle: string) => {
        this.props.createTask(this.props.id, newTitle)
    };
    onDeleteTask = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId)
    }
    changeTitleTodo = (todoId: string , title: string) => {
        this.props.changeTitleTodo(todoId , title)
    }



    changeTask = (task: TaskType) => {
        this.props.changeTask(this.props.id, task.id, task)
    }

    changeStatus = (newTask: TaskType, status: boolean) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0});
    }



    changeTitle = (task: TaskType, title: string) => {
        this.changeTask({...task, title: title})
    }
    changeFilter = (newFilterValue: string) => {
        this.setState({filterValue: newFilterValue})
    };


    render = () => {
        let {tasks = []} = this.props
        let filtredTasks = tasks.filter(t => {
            switch (this.state.filterValue) {
                case 'Active':
                    return t.status === 0;
                case 'Completed':
                    return t.status === 2;
                case 'All':
                    return true;
            }
        })

        return (
            <div className="todoList">
                <TodoHeader title={this.props.title}
                            changeTitleTodo={this.changeTitleTodo}
                            onDeleteTodoList={this.props.onDeleteTodoList}
                            todoListId={this.props.id}/>
                <AddNewTitle buttonStyle={'taskButton'}
                             buttonTitle={'+ task'}
                             style={'add-task'}
                             addItem={this.addTask}
                             holder={'new task me'}/>
                <TodoTasks task={filtredTasks}
                           onDeleteTask={this.onDeleteTask}
                           changeTitle={this.changeTitle}
                           changeStatus={this.changeStatus}/>
                <TodoFooter filterValue={this.state.filterValue}
                            changeFilter={this.changeFilter}/>
            </div>

        );
    }
}


export default connect<{}, MapDispatchPropsType, OwnTypes, AppStateType>(null,
    {
    changeTask,
    changeTitleTodo,
    createTask,
    deleteTask,
    getTasks
})(TodoList);
