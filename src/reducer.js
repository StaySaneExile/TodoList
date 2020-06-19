import {api} from "./api";

export const CREATE_TODOLIST = 'TodoAPP/CREATE_TODOLIST'
export const DELETE_TODO_LIST = 'TodoAPP/DELETE_TODO_LIST'
export const SET_TODOLIST = 'TodoAPP/SET_TODOLIST'
export const ADD_TASK = 'TodoAPP/ADD_TASK'
export const DELETE_TASK = 'TodoAPP/DELETE_TASK'
export const SET_TASKS = 'TodoAPP/SET_TASKS'
export const CHANGE_TASK = 'TodoAPP/CHANGE-TASK'
export const CHANGE_TITLE_TODOLIST = "TodoList/Reducer/CHANGE_TITLE_TODOLIST";


const initialState = {
    todolists: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODOLIST:
            return {
                ...state, todolists: [...state.todolists, {...action.newTodoList}]
            }
        case DELETE_TODO_LIST:
            return {
                ...state,
                todolists: state.todolists.filter(td => td.id !== action.newTodoList)
            }
        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists.map(td => ({...td, tasks: []}))
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(td => {
                    if (td.id !== action.todolistId) {
                        return td
                    } else {
                        return {...td, tasks: action.tasks}
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {...todo, tasks: [...todo.tasks, action.newTask]}
                    }
                })
            }
        case DELETE_TASK:
            return {
                ...state, todolists: state.todolists.map(todoList => {
                    if (todoList.id !== action.todoListId) {
                        return todoList
                    } else {
                        return {
                            ...todoList, tasks: todoList.tasks.filter(task =>
                                task.id !== action.taskId)
                        }
                    }
                })
            }
        case CHANGE_TITLE_TODOLIST:
            debugger
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id !== action.newTodo.id) {
                        return todo
                    } else {
                        debugger
                        return {...todo, title: action.newTodo.title}
                    }
                })
            }
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.task.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.task.id) {
                                    return t;
                                } else {
                                    return action.task;
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
        default:
            return state
    }
}

const changeTitleTodolist = (newTodo) => ({type: CHANGE_TITLE_TODOLIST, newTodo})
const changeTasks = (task) => ({type: CHANGE_TASK, task})
const createTodoList = (newTodoList) => ({type: CREATE_TODOLIST, newTodoList})
const deleteTodoList = (newTodoList) => ({type: DELETE_TODO_LIST, newTodoList})
const setTodoLists = (todolists) => ({type: SET_TODOLIST, todolists})
const setTask = (todolistId, tasks) => ({type: SET_TASKS, todolistId, tasks})
const addTask = (todolistId, newTask) => ({type: ADD_TASK, todolistId, newTask})
const deleteTasks = (todoListId, taskId) => ({type: DELETE_TASK, todoListId, taskId})



export const getTodolists = () => {
    return (dispatch) => {
        api.getTodolists()
            .then(res => {
                dispatch(setTodoLists(res))})}
}
export const getTasks = (todoId) => {
    return (dispatch) => {
        api.getTasks(todoId)
            .then(res => {
                if (!res.error) {
                    dispatch(setTask(todoId, res.items))
                }
            })
    }
}
export const createTodolists = (title) => {
    return (dispatch) => {
        api.createTodolist(title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(createTodoList(res.data.item))
                }
            });
    }
}
export const deleteTodolist = (Id) => {
    return (dispatch) => {
        api.deleteTodolist(Id)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(deleteTodoList(Id))
                }
            });
    }
}
export const createTask = (todoId, newTitle) => {
    return (dispatch) => {
        api.createTask(todoId, newTitle)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(addTask(todoId, res.data.item))
                }
            })
    }
}
export const deleteTask = (todoId, taskId) => {
    return (dispatch) => {
        api.deleteTask(todoId, taskId)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(deleteTasks(todoId, taskId))
                }
            })
    }
}
export const changeTask = (todoId, taskId, task) => {
    return (dispatch) => {
        api.changeTask(todoId, taskId, task)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(changeTasks(res.data.item))
                }
            })
    }
}
export const changeTitleTodo = (obj) => {
    return (dispatch) => {
        api.changeTitleTodo(obj.id, obj.title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(changeTitleTodolist({id: obj.id, title: obj.title}))
                }
            })
    }

}
