export type addTodoResponse = {
    userId: string;
    title: string | null | undefined;
    description: string | null | undefined;
    dueDate: NativeDate | null | undefined;
    createdAt: NativeDate | null | undefined;
    updatedAt: NativeDate | null | undefined;
    _id: string;
}

export type editTodoPayload = { title: string | undefined | null , description: string | undefined | null, dueDate:  NativeDate | undefined | null, reminderTime : NativeDate | undefined | null } 

export type editTodoResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type editTodoServiceParam = {
    title: string | undefined | null
    description: string | undefined | null
    dueDate: NativeDate | undefined | null,
    reminderTime: NativeDate | undefined | null,
    user: {username: string; _id: string}
    todoId: string
}

export type deleteTodoServiceParam = {
    user: {username: string; _id: string}
    todoId: string
}

export type deleteTodoResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type markedTaskServiceParam = {
    user: {username: string; _id: string}
    todoId: string
} 
export type markedTaskResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type unMarkedTaskResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type unMarkedTaskServiceParam = {
    user: {username: string; _id: string}
    todoId: string
} 

export type getTodoListPayload = {date: string | undefined , month : string | undefined , year : string | undefined}

export type getTodoListServiceParam = {
    user: {username: string; _id: string}
    date: number,
    year: number,
    month : number
}

export type addTodoPayload = { title: string, description: string, dueDate:  NativeDate }

export type addTodoServiceParam = {
    title: string
    description: string
    dueDate: NativeDate
    user: {username: string; _id: string}
}