import React from 'react';
import './App.css';
import TodoHeader from "./TodoHeader";
import TodoTasks from "./TodoTasks";
import TodoFooter from "./TodoFooter"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    };

    state = {
        tasks:[
            {title:"jQuery", isDone:false, priority: " low"},
            {title:"JS", isDone:false, priority: " low"},
            {title:"ReactJS", isDone:true, priority: " hight"},
            {title:"Pattern", isDone:false, priority: " low"},
            {title:"CSS", isDone:true, priority: " low"},
        ],
        filterValue: "All"
    };


    onAddTaskClick = () => {
        let newTitle = this.newTaskTitleRef.current.value;
        this.newTaskTitleRef.current.value = "";
        let newTask = {title: newTitle, isDone: false, priority: ' low'};
        this.setState({tasks: [...this.state.tasks, newTask] });
    };


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                        <div className="todoList-header">
                            <h3 className="todoList-header__title">What to Learn</h3>
                            <div className="todoList-newTaskForm">
                                <input
                                    type="text"
                                    placeholder="New task name"
                                    ref={this.newTaskTitleRef} />
                                <button onClick={this.onAddTaskClick}>Add</button>
                            </div>
                        </div>
                    {/*<TodoHeader />*/}
                    <TodoTasks tasks={this.state.tasks} />
                    <TodoFooter filterValue={this.state.filterValue} />
                </div>
            </div>

        );
    }
}

export default App;

