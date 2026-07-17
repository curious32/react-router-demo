import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, storeUsers, type User } from "../data/user";

export const RegisterMessageCode = {
    USER_ADDED: {
        code: 'USER_ADDED',
        message: 'User added successfully'
    },
    USER_NOT_ADDED: {
        code: 'USER_NOT_ADDED',
        message: 'Adding user failed'
    },
    EXCEPTION_OCCURED: {
        code: 'EXCEPTION_OCCURED',
        message: 'Exception occured'
    },
};

interface UserState {
    loading: boolean;
    code: string | null;
    message: string | null;
}

const initialState: UserState = { loading: false, code: null, message: null };

export const addUser = createAsyncThunk(
    "reg/adduser",
    async (request: User, thunkAPI) => {
        try {
            const users: User[] = await getUsers();
            const userIndex: number = users.findIndex(x => x.username === request.username);
            if (userIndex < 0) {
                const user: User = {
                    id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
                    fullName: request.fullName,
                    username: request.username,
                    password: request.password
                };
                users.push(user);
                await storeUsers(users);
                return {
                    code: RegisterMessageCode.USER_ADDED.code,
                    message: RegisterMessageCode.USER_ADDED.message
                };
            } else {
                return {
                    code: RegisterMessageCode.USER_NOT_ADDED.code,
                    message: RegisterMessageCode.USER_NOT_ADDED.message
                };
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                (error as Error).message
            );
        }
    }
)

const usersSlice = createSlice({
    name: "reg",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            // addUser
            .addCase(
                addUser.pending,
                state => {
                    state.loading = true;
                    state.code = null;
                    state.message = null;
                })
            .addCase(
                addUser.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.code = action.payload.code;
                    state.message = action.payload.message;
                }
            )

            .addCase(
                addUser.rejected,
                (state, action) => {
                    state.loading = false;
                    state.code = RegisterMessageCode.EXCEPTION_OCCURED.code;
                    state.message =
                        action.error.message ?? RegisterMessageCode.USER_NOT_ADDED.message;
                })
    }
});

export default usersSlice.reducer;