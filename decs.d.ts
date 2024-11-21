type User = {
    _id: string;
    username: string;
    email ?: string;
};

declare namespace Express {
    interface Request {
        user?: User;
    }
}