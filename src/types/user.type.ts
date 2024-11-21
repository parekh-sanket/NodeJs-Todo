export type userRegistrationResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {username: string; _id: string}; error?: undefined}

export type userLoginResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {username: string; _id: string}; error?: undefined}
