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

export async function getUsers(): Promise<User[]> {
    const usersJson: string | null = await localStorage.getItem('users');
    if (usersJson) return JSON.parse(usersJson) as User[];
    return [];
}

export async function storeUsers(users: User[]): Promise<void> {
    await localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users));
}

export function getAuth(): AuthState | null {
    const authJson: string | null = localStorage.getItem('auth');
    if (authJson) return JSON.parse(authJson) as AuthState;
    return null;
}

export const storeAuth: (auth: AuthState) => void = (auth: AuthState) => {
    localStorage.removeItem('auth');
    localStorage.setItem('auth', JSON.stringify(auth));
}

export const removeAuth: () => void = () => {
    localStorage.removeItem('auth');
}

export const isLoggedIn = () => {
    const auth: AuthState | null = getAuth();
    if (auth) return true;
    return false;
}