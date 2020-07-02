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




class TodoList extends React.Component {
    state = {
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
    addTask = (newTitle) => {
        this.props.createTask(this.props.id, newTitle)
    };

    onDeleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }
    changeTask = (task) => {
        this.props.changeTask(this.props.id, task.id, task)
    }
    changeTitleTodo = (title) => {
        this.props.changeTitleTodo({id: this.props.id, title: title})
    }


    changeStatus = (newTask, status) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0});
    }
    changeTitle = (task, title) => {
        this.changeTask({...task, title: title})
    }
    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };




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


const ConnectedTodoList = connect(null, {changeTask, changeTitleTodo, createTask, deleteTask, getTasks})(TodoList);
export default ConnectedTodoList;
