import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice'
import usersReducer from '../redux/usersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    }
});

export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;

export const selectAuth = (state: RootState) => state.auth;
export const selectUsers = (state: RootState) => state.users;