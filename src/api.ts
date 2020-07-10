import axios from "axios";
import {TaskType, TodoListType} from "./Types/enteties";

export const instance = axios.create ({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
})

type CommonResponseType<T, G> = {
    resultCode: number
    messages: Array<string>
    data: T
}
type TaskDataType<T> = {
    error?: number
    items: T
    totalCount: number
}

export const api = {
    changeTitleTodo (todoId: string, title: string) {
        return instance.put<CommonResponseType<{}, {}>>(`todo-lists/${todoId}`, {title: title})
    },
    getTodolists() {
        return instance.get<Array<TodoListType>>("todo-lists")
    },
    getTasks (todoId: string) {
        return instance.get<TaskDataType<Array<TaskType>>>(`todo-lists/${todoId}/tasks`,)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item: TodoListType}, {}>>("todo-lists", {title: title})
    },
    deleteTodolist(Id: string) {
        return instance.delete<CommonResponseType<{}, {}>>(`todo-lists/${Id}`)
    },
    createTask (todoId: string, newTitle: string) {
        return instance.post<CommonResponseType<{item: TaskType}, {}>>(`todo-lists/${todoId}/tasks`,{title: newTitle},)
    },
    deleteTask(todoId: string, taskId: string) {
      return instance.delete<CommonResponseType<{}, {}>>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    changeTask(todoId: string, taskId: string, task: TaskType) {
        return instance.put<CommonResponseType<{item: TaskType}, {}>>(`todo-lists/${todoId}/tasks/${taskId}`, task)
    }
}