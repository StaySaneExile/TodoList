import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewTitle from "./AddNewTitle";


class App extends React.Component {
    state = {
        todoList: [],
    }
    nextIdTodoList = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('stateTodoList' + this.props.id , stateAsString)
    }
    restoreState = () => {
        let state = {
            todoList: [],
        }
        let stateAsString = localStorage.getItem('stateTodoList' + this.props.id);
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todoList.forEach(t => {
                if (t.id >= this.nextIdTodoList) {
                    this.nextIdTodoList = t.id + 1
                }
            })
        });
    }
    componentDidMount() {
        this.restoreState();
    }

    addTodoList = (newList) => {
        let newTodoList = {
            id: this.nextIdTodoList,
            title: newList};
        this.nextIdTodoList ++;
        this.setState({todoList: [...this.state.todoList, newTodoList]}, this.saveState)
    }

    render = () => {
        const todoLists = this.state.todoList.map(t => <TodoList key={t.id}
                                                                 id={t.id} title={t.title}/>)
        return (
            <div>
                <div>
                    <AddNewTitle addItem={this.addTodoList}/>
                </div>
                <div className='App'>
                    {todoLists}
                </div>
            </div>
        )
    }
}

export default App;



