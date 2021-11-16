/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import { LoginDto, RegisterDto, UserDto } from '../../app/api/web-api-dtos';

interface AccountState {
    user: UserDto | null;
}

const initialState: AccountState = {
    user: null,
};

export const signInUser = createAsyncThunk<UserDto, LoginDto>('account/signInUser', async (loginDto, thunkAPI: any) => {
    try {
        const user = await agent.Account.login(loginDto);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const registerUser = createAsyncThunk<UserDto, RegisterDto>(
    'account/registerUser',
    async (registerDto, thunkAPI: any) => {
        try {
            const user = await agent.Account.register(registerDto);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
);

export const fetchCurrentUser = createAsyncThunk<UserDto>(
    'account/fetchCurrentUser',
    async (_, thunkAPI: any) => {
        const token = localStorage.getItem('user');
        if (token) thunkAPI.dispatch(setUser(JSON.parse(token)));
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
            return true;
        },
    },
);

// eslint-disable-next-line import/prefer-default-export
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            toast.error('Session expired - please login again');
            state.user = null;
            localStorage.removeItem('user');
        });
        builder.addCase(signInUser.rejected, (_, action) => {
            // eslint-disable-next-line no-console
            console.log(action.payload);
            localStorage.removeItem('user');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
    },
});

export const { signOut, setUser } = accountSlice.actions;
