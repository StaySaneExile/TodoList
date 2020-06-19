import axios from "axios";

export const instance = axios.create ({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '55c7683d-910d-4237-970d-b8f19c995706'}
})

export const api = {
    changeTitleTodo (todoId, title) {
        return instance.put(`todo-lists/${todoId}`,
            {title: title})
            .then(res => res.data)
    },
    getTodolists() {
        return instance.get("todo-lists")
            .then(res => res.data);
    },
    createTodolist(title) {
        return instance.post("todo-lists",
            {title: title})
            .then(res => res.data);
    },
    deleteTodolist(Id) {
        return instance.delete(`todo-lists/${Id}`)
            .then(res => res.data)
    },
    getTasks (todoId) {
        return instance.get(`todo-lists/${todoId}/tasks`,)
            .then(res => res.data);
    },
    createTask (todoId, newTitle) {
        return instance.post(`todo-lists/${todoId}/tasks`,{title: newTitle},)
            .then(res => res.data);
    },
    deleteTask(todoId, taskId) {
      return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`)
          .then(res => res.data)
    },
    changeTask(todoId, taskId, task) {
        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`,
            task,)
            .then(res => res.data);
    }
}