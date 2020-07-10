import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewTitle from "./AddNewTitle";
import {connect} from "react-redux";
import {
    createTodolists,
    deleteTodolist, getTodolists,
} from "./reducer";
import {AppStateType} from "./Store";
import {TodoListType} from "./Types/enteties";


type MapStatePropsType = {
    todolists: Array<TodoListType>
}
type MapDispatchPropsType = {
    getTodolists: ()=> void
    deleteTodolist: (Id: string)=> void
    createTodolists: (title: string)=> void
}


class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        this.restoreState();
    }
    restoreState = () => {
        this.props.getTodolists()
    }
    addTodoList = (title: string) => {
        this.props.createTodolists(title)
    }
    onDeleteTodoList = (Id: string) => {
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

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        todolists: state.reducer.todolists
    }
}


const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    deleteTodolist,
    createTodolists,
    getTodolists
})(App);
export default ConnectedApp;



