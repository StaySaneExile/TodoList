import {api} from "./api";
import {ChangeTitleTodoListType, TaskType, TodoListType} from "./Types/enteties";
import {Dispatch} from "redux";

export const CREATE_TODOLIST = 'TodoAPP/CREATE_TODOLIST'
export const DELETE_TODO_LIST = 'TodoAPP/DELETE_TODO_LIST'
export const SET_TODOLIST = 'TodoAPP/SET_TODOLIST'
export const ADD_TASK = 'TodoAPP/ADD_TASK'
export const DELETE_TASK = 'TodoAPP/DELETE_TASK'
export const SET_TASKS = 'TodoAPP/SET_TASKS'
export const CHANGE_TASK = 'TodoAPP/CHANGE-TASK'
export const CHANGE_TITLE_TODOLIST = "TodoList/Reducer/CHANGE_TITLE_TODOLIST";

type initialStateType = {
    todolists: Array<TodoListType>
}

const initialState: initialStateType = {
    todolists: []
}


export const reducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
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
                    if (todo.id !== action.todoId) {
                        return todo
                    } else {
                        debugger
                        return {...todo, title: action.title}
                    }
                })
            }
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
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

type ActionsTypes =
    deleteTasksType
    | addTaskType
    | ChangeTitleTodo
    | changeTaskType
    | createTodoListType
    | deleteTodoListType
    | setTodoListsType
    | setTaskType


type ChangeTitleTodo = {
    type: typeof CHANGE_TITLE_TODOLIST
    todoId: string
    title: string
}
type changeTaskType = {
    type: typeof CHANGE_TASK
    todoId: string
    taskId: string
    task: TaskType
}
type createTodoListType = {
    type: typeof CREATE_TODOLIST
    newTodoList: TodoListType
}
type deleteTodoListType = {
    type: typeof DELETE_TODO_LIST
    newTodoList: string
}
type setTodoListsType = {
    type: typeof SET_TODOLIST
    todolists: Array<TodoListType>
}
type setTaskType = {
    type: typeof SET_TASKS
    todolistId: string
    tasks: Array<TaskType>
}
type addTaskType = {
    type: typeof ADD_TASK
    todolistId: string
    newTask: TaskType
}
type deleteTasksType = {
    type: typeof DELETE_TASK
    todoListId: string
    taskId: string
}


const changeTasks = (todoId:string, taskId: string, task:TaskType):changeTaskType => ({type: CHANGE_TASK, todoId, taskId, task})
const changeTitleTodolist = (todoId: string, title: string): ChangeTitleTodo => ({type: CHANGE_TITLE_TODOLIST, todoId, title})
const createTodoList = (newTodoList: TodoListType): createTodoListType => ({type: CREATE_TODOLIST, newTodoList})
const deleteTodoList = (newTodoList: string): deleteTodoListType => ({type: DELETE_TODO_LIST, newTodoList})
const setTodoLists = (todolists: Array<TodoListType>): setTodoListsType => ({type: SET_TODOLIST, todolists})
const setTask = (todolistId: string, tasks: Array<TaskType>): setTaskType => ({type: SET_TASKS, todolistId, tasks})
const addTask = (todolistId: string, newTask: TaskType): addTaskType => ({type: ADD_TASK, todolistId, newTask})
const deleteTasks = (todoListId: string, taskId: string): deleteTasksType => ({type: DELETE_TASK, todoListId, taskId})


export const getTodolists = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.getTodolists()
            .then(res => {
                dispatch(setTodoLists(res.data))
            })
    }
}
export const getTasks = (todoId: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.getTasks(todoId)
            .then(res => {
                debugger
                if (!res.data.error) {
                    dispatch(setTask(todoId, res.data.items))
                }
            })
    }
}
export const createTodolists = (title: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(createTodoList(res.data.data.item))
                }
            });
    }
}
export const deleteTodolist = (Id: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.deleteTodolist(Id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTodoList(Id))
                }
            });
    }
}
export const createTask = (todoId: string, newTitle: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.createTask(todoId, newTitle)
            .then(res => {
                debugger
                if (res.data.resultCode === 0) {
                    dispatch(addTask(todoId, res.data.data.item))
                }
            })
    }
}
export const deleteTask = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.deleteTask(todoId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTasks(todoId, taskId))
                }
            })
    }
}
export const changeTask = (todoId: string, taskId: string, task:TaskType) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.changeTask(todoId, taskId, task)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTasks(todoId, taskId, res.data.data.item ))
                }
            })
    }
}
export const changeTitleTodo = (todoId: string, title: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        api.changeTitleTodo(todoId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTitleTodolist(todoId, title))
                }
            })
    }

}
