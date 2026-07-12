import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUsers, type AuthState, type LoggedInUser, type User } from "../data/user";

const initialState: AuthState = {
    isLoggedIn: false,
    currentUser: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        login(
            state,
            action: PayloadAction<LoggedInUser>
        ) {
            const users: User[] = getUsers();
            if(!users) return;
            const user = users.find(x =>
                x.username === action.payload.username &&
                x.password === action.payload.password
            );
            if (user) {

                state.isLoggedIn = true;
                state.currentUser = user;

            }
        },

        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = null;
        }

    }
});

export const {
    login,
    logout
} = authSlice.actions;

export default authSlice.reducer;