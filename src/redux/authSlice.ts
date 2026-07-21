import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, getUsers, removeAuth, storeAuth, type AuthState, type LoggedInUser, type User } from "../data/user";
import { delay, log } from "../util/common";
import type { RootState } from "../app/store";

export const LoginMessageCode = {
    LOGIN_SUCCESS: {
        code: 'LOGIN_SUCCESS',
        message: 'Login successfull'
    },
    LOGIN_FAILED: {
        code: 'LOGIN_FAILED',
        message: 'Login failed',
    },
    LOGOUT_SUCCESS: {
        code: 'LOGOUT_SUCCESS',
        message: 'User logged-out',
    },
    EXCEPTION_OCCURED: {
        code: 'EXCEPTION_OCCURED',
        message: 'Exception occured',
    }
};

interface AuthSliceState {
    auth: AuthState | null;
    loading: boolean;
    code: string | null;
    message: string | null;
    pageRefreshed: boolean;
}

function getInitialState(): AuthSliceState {
    const value = getAuth();
    return {
        auth: value,
        loading: false,
        code: value ? LoginMessageCode.LOGIN_SUCCESS.code : null,
        message: value ? LoginMessageCode.LOGIN_SUCCESS.message : null,
        pageRefreshed: true
    };
}

export const login = createAsyncThunk(
    "auth/login",
    async (request: LoggedInUser, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            log('thunkAPI.getState(): ', state);
            if (state && !state.auth.auth) {
                await delay(5000);
                const users: User[] = await getUsers();
                if (!users) return;
                const user = users.find(x =>
                    x.username === request.username &&
                    x.password === request.password
                );
                if (user) {
                    const auth: AuthState = { isLoggedIn: true, currentUser: user };
                    return {
                        value: auth,
                        code: LoginMessageCode.LOGIN_SUCCESS.code,
                        message: LoginMessageCode.LOGIN_SUCCESS.message
                    };
                } else {
                    return {
                        value: null,
                        code: LoginMessageCode.LOGIN_FAILED.code,
                        message: LoginMessageCode.LOGIN_FAILED.message
                    };
                }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                (error as Error).message
            );
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState(),

    reducers: {
        logout(state) {
            if (state.auth) {
                state.auth.currentUser = null;
                state.auth.isLoggedIn = false;
                state.code = LoginMessageCode.LOGOUT_SUCCESS.code;
                state.message = LoginMessageCode.LOGOUT_SUCCESS.message;
                state.pageRefreshed = false;
                removeAuth();
            }
        }
    },

    extraReducers: builder => {
        builder
            // Login
            .addCase(
                login.pending,
                state => {
                    state.loading = true;
                    state.code = null;
                    state.message = null;
                    state.auth = null;
                    state.pageRefreshed = false;
                })
            .addCase(
                login.fulfilled,
                (state, action) => {
                    state.loading = false;
                    if (action.payload) {
                        if (action.payload.value) {
                            state.auth = { isLoggedIn: true, currentUser: action.payload.value.currentUser };
                            storeAuth(state.auth);
                        } else {
                            state.auth = { isLoggedIn: false, currentUser: null };
                        }
                        state.code = action.payload.code;
                        state.message = action.payload.message;
                        state.pageRefreshed = false;
                    }
                })
            .addCase(
                login.rejected,
                (state, action) => {
                    state.loading = false;
                    state.auth = null;
                    state.code = LoginMessageCode.EXCEPTION_OCCURED.code;
                    state.message =
                        action.error.message ?? LoginMessageCode.LOGIN_FAILED.message;
                    state.pageRefreshed = false;
                })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;