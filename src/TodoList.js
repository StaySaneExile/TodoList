import React from 'react';
import './TodoList.css';
import TodoHeader from "./TodoHeader";
import TodoTasks from "./TodoTasks";
import TodoFooter from "./TodoFooter"
import AddNewTitle from "./AddNewTitle";
import {connect} from "react-redux";
import {
    addTaskAC,
     changeTaskAC,

    deleteTaskAC,
    setTasksAC,
} from "./reducer";
import axios from "axios";

class TodoList extends React.Component {

    state = {
        tasks: [],
        filterValue: "All"
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
            }).then(res => {
            if (!res.data.error) {
                this.props.setTasks(this.props.id, res.data.items)}});
    }

    addTask = (newTitle) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newTitle},
            {
                withCredentials: true,
                headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
            }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.addTask(this.props.id, res.data.data.item)}});
    };

    onDeleteTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
            }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.deleteTask(this.props.id, taskId)}})
    }

    changeTask = (task) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            task,
            {
                withCredentials: true,
                headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
            }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.changeTask(res.data.data.item)
            }
        });
    }

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeStatus = (newTask, status) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0});
    }

    changeTitle = (task, title) => {
        this.changeTask({...task, title: title})
    }

    render = () => {
        let {tasks = []} = this.props
        let filtredTasks = tasks.filter(t => {
            switch (this.state.filterValue) {
                case 'Active':
                    return t.status === false;
                case 'Completed':
                    return t.status === true;
                case 'All':
                    return true;
            }
        })

        return (
            <div className="todoList">
                <TodoHeader title={this.props.title}
                            onDeleteTodoList={this.props.onDeleteTodoList}
                            todoListId={this.props.id}/>
                <AddNewTitle style={'add-task'} addItem={this.addTask} holder={'new task me'}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistId, newTask) => {
            dispatch(addTaskAC(todolistId, newTask))
        },
        deleteTask: (todoListId, taskId) => {
            dispatch(deleteTaskAC(todoListId, taskId))
        },
        setTasks: (todolistId, tasks) => {
            dispatch(setTasksAC(todolistId, tasks))
        },
        changeTask: (task) => {
            dispatch(changeTaskAC(task))
        }
    }
}


const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;
