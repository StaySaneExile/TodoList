export const CREATE_TODOLIST = 'TodoAPP/CREATE_TODOLIST'
export const DELETE_TODO_LIST = 'TodoAPP/DELETE_TODO_LIST'
export const SET_TODOLIST = 'TodoAPP/SET_TODOLIST'
export const ADD_TASK = 'TodoAPP/ADD_TASK'
export const DELETE_TASK = 'TodoAPP/DELETE_TASK'
export const SET_TASKS = 'TodoAPP/SET_TASKS'
export const CHANGE_TASK = 'TodoAPP/CHANGE-TASK'
export const CHANGE_STATUS_TASK = "TodoList/Reducer/CHANGE_STATUS_TASK";


const initialState = {
    todolists: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TODOLIST:
            return {
                ...state, todolists: [...state.todolists, {...action.newTodoList}]}
        case DELETE_TODO_LIST:
            return {
                ...state,
                todolists: state.todolists.filter( td => td.id !== action.newTodoList)
            }
        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists.map(td => ({...td, tasks: []}))
            }
        case SET_TASKS:
            return {
               ...state,
               todolists: state.todolists.map ( td => {
                   if(td.id !== action.todolistId ) {
                       return td
                   } else {
                       return {...td, tasks: action.tasks}
                   }})}
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
                                task.id !== action.taskId)}}})
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
                }})
        }
        default:
            return state
    }
}
export const createTodoListAC = (newTodoList) => {
    return {type: CREATE_TODOLIST, newTodoList}
}
export const deleteTodoListAC = (newTodoList) => {
    return {type: DELETE_TODO_LIST, newTodoList}
}
export const setTodoListsAC = (todolists) => {
    return {type: SET_TODOLIST, todolists}
}
export const setTasksAC = (todolistId, tasks) => {
    return {type: SET_TASKS, todolistId, tasks}
}
export const addTaskAC = (todolistId, newTask) => {
    return {type: ADD_TASK, todolistId, newTask}
}
export const deleteTaskAC = (todoListId, taskId) => {
    return {type: DELETE_TASK, todoListId, taskId}
}
export const changeTaskAC = (task) => ({type: CHANGE_TASK, task})
