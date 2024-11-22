export type addTodoResponse = {
    userId: string;
    title: string | null | undefined;
    description: string | null | undefined;
    dueDate: NativeDate | null | undefined;
    createdAt: NativeDate | null | undefined;
    updatedAt: NativeDate | null | undefined;
    _id: string;
}

export type editTodoResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type deleteTodoResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type markedTaskResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type unMarkedTaskResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {message: string; }; error?: undefined}

export type addTodoPayload = { title: string, description: string, dueDate:  NativeDate }