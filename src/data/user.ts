export interface User {
    id: number;
    username: string;
    password: string;
    fullName: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    currentUser: User | null;
}

export interface LoggedInUser {
    username: string;
    password: string;
}

export const getUsers: () => User[] = () => {
    const usersJson: string | null = localStorage.getItem('users');
    if (usersJson) return JSON.parse(usersJson);
    return null;
}

export const storeUsers: (users: User[]) => void = (users: User[]) => {
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users));
}