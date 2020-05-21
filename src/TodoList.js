import React from 'react';
import './TodoList.css';
import TodoHeader from "./TodoHeader";
import TodoTasks from "./TodoTasks";
import TodoFooter from "./TodoFooter"
import PropTypes from 'prop-types';
import AddNewTitle from "./AddNewTitle";

class TodoList extends React.Component {

    state = {
        tasks: [],
        filterValue: "All"
    };
    nextTaskId = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString)
    }
    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        }
        let stateAsString = localStorage.getItem('our-state-' + this.props.id);
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.tasks.forEach(t => {
                if (t.id >= this.nextTaskId) {
                    this.nextTaskId = t.id + 1
                }
            })
        });
    }

    componentDidMount() {
        this.restoreState();
    }

    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false,
            priority: ' low'
        };
        this.nextTaskId++;
        this.setState({tasks: [...this.state.tasks, newTask]}, this.saveState);

    };
    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }
    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    }
    changeTask = (taskId, newPropValue) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, ...newPropValue}
            }
            return t;
        })
        this.setState({tasks: newTasks}, this.saveState)
    }
    onDeleteTask = (Id) => {
        const filteredId = this.state.tasks.filter((t) => {
            return Id !== t.id
        })
        this.setState({
            tasks: filteredId
        })
    }

    render = () => {

        let filtredTasks = this.state.tasks.filter(t => {
            switch (this.state.filterValue) {
                case 'Active':
                    return t.isDone === false;
                case 'Completed':
                    return t.isDone === true;
                case 'All':
                    return true;
            }
        })

        return (
            <div className="TodoList">
                <div className="todoList">
                    <TodoHeader
                                title={this.props.title}/>
                    <AddNewTitle addItem={this.addTask} holder={'new task me'}/>

                    <TodoTasks tasks={filtredTasks}
                               onDeleteTask={this.onDeleteTask}
                               changeTitle={this.changeTitle}
                               changeStatus={this.changeStatus}/>
                    <TodoFooter filterValue={this.state.filterValue}
                                changeFilter={this.changeFilter}/>
                </div>
            </div>

        );
    }
}

export default TodoList;



