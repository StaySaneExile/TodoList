import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewTitle from "./AddNewTitle";
import {connect} from "react-redux";
import {
    createTodolists,
    deleteTodolist, getTodolists,
} from "./reducer";


class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTodolists()
    }
    addTodoList = (title) => {
        this.props.createTodolists(title)
    }
    onDeleteTodoList = (Id) => {
        this.props.deleteTodolist(Id)
    }


    render = () => {
        const todoLists = this.props.todolists.map
        (t => <TodoList key={t.id}
                        id={t.id}
                        title={t.title}
                        onDeleteTodoList={this.onDeleteTodoList}
                        tasks={t.tasks}/>)

        return (
            <div className='backgroung'>
                <div className='App'>
                    <div className='main-header'>
                        <span className='title'>Which task</span>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}


const ConnectedApp = connect(mapStateToProps, {deleteTodolist, createTodolists, getTodolists})(App);
export default ConnectedApp;



