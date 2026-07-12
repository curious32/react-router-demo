import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getUsers, storeUsers, type User } from "../data/user";

interface UserState {
    users: User[];
}

const initialState: UserState = { users: getUsers() || [] };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
            storeUsers(state.users);
        },
        removeUser(state, action: PayloadAction<User>) {
            state.users.splice(state.users.findIndex(user => user.id == action.payload.id));
            storeUsers(state.users);
        }
    }
});

export const {addUser, removeUser} = usersSlice.actions;
export default usersSlice.reducer;