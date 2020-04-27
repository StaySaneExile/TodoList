import React from 'react';
import './App.css';
import TodoHeader from "./TodoHeader";
import TodoTasks from "./TodoTasks";
import TodoFooter from "./TodoFooter"
import PropTypes from 'prop-types';

class App extends React.Component {

    state = {
        tasks: [
            {title: "jQuery", isDone: false, priority: " low"},
            {title: "JS", isDone: false, priority: " low"},
            {title: "ReactJS", isDone: true, priority: " hight"},
            {title: "Pattern", isDone: false, priority: " low"},
            {title: "CSS", isDone: true, priority: " low"},
        ],
        filterValue: "All"
    };


    addTask = (newTitle) => {
        let newTask = {title: newTitle, isDone: false, priority: ' low'};
        this.setState({tasks: [...this.state.tasks, newTask]});
    };
    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map ( t => {
            if(t === task) {
                return {...t, isDone: isDone}
            }
            return t;
        })
        this.setState({tasks: newTasks})
    };

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
            <div className="App">
                <div className="todoList">

                    <TodoHeader addTask={this.addTask} />
                    <TodoTasks tasks={filtredTasks}
                               changeStatus={this.changeStatus}/>
                    <TodoFooter filterValue={this.state.filterValue}
                                changeFilter={this.changeFilter}/>
                </div>
            </div>

        );
    }
}

export default App;



