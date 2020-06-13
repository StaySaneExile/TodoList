import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewTitle from "./AddNewTitle";
import {connect} from "react-redux";
import { createTodoListAC, deleteTodoListAC, setTodoListsAC} from "./reducer";
import axios from "axios";



class App extends React.Component {
  /*  state = {
        todoList: [],
    }
    nextIdTodoList = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('stateTodoList' + this.props.id , stateAsString)
    }
    /!*
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
    }*!/*/
    componentDidMount() {
        this.restoreState();
    }
    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {withCredentials: true})
            .then(res => {
                this.props.setTodolists(res.data);
            });
    }
    addTodoList = (title) => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title},
            {withCredentials: true,
                headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
            }).then(res => {
            if(res.data.resultCode === 0) {
                this.props.createtodolists(res.data.data.item)
            }
        });
        }

    onDeleteTodoList = (Id) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${Id}`,
            {withCredentials: true,
                headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
            }).then(res => {

            if(res.data.resultCode === 0) {
                this.props.deleteTodoList(Id)
            }});
    }

    render = () => {
        const todoLists = this.props.todolists.map
        (t => <TodoList key={t.id}
                        id={t.id}
                        title={t.title}
                        onDeleteTodoList={this.onDeleteTodoList}
                        tasks={t.tasks}/>)

        return (
            <div className='App'>
                <div className='main-header'>
                    <span className='title'>Which task my lord</span>
                    <AddNewTitle inputStyleErr={'input-error'}
                                 inputStyleDef={'input'}
                                 buttonStyle={'header-button'}
                                 buttonTitle={'Order'}
                                 style={'add-title'}
                                 addItem={this.addTodoList}/>
                </div>
                <div className='Appp'>
                    {todoLists}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createtodolists: (newTodoList)=> {
            dispatch(createTodoListAC(newTodoList))
        },
        deleteTodoList: (newTodoList) => {

            dispatch(deleteTodoListAC(newTodoList))
        },
        setTodolists: (todolists)=> {
            dispatch(setTodoListsAC(todolists))
        }
    }

}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;



