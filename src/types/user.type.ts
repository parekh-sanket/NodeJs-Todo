export type userRegistrationResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {username: string; _id: string}; error?: undefined}

export type userLoginResponse =
    | {error: {message: string; status: number}; data?: undefined}
    | {data: {username: string; _id: string}; error?: undefined}

export type user = { username: string, _id: string }

export type userRegistrationPayload = { username: string, password: string }

export type userLoginPayload = { username: string, password: string }

export type editUserServiceParams = { user : { username : String , _id : String } , email : String }