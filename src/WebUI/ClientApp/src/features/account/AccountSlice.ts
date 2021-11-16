/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { LoginDto, UserDto } from '../../app/api/web-api-dtos';

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

export const fetchCurrentUser = createAsyncThunk<UserDto>('account/fetchCurrentUser', async (_, thunkAPI: any) => {
    try {
        const user = await agent.Account.currentUser();
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

// eslint-disable-next-line import/prefer-default-export
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
            // eslint-disable-next-line no-console
            console.log(action.payload);
        });
    },
});
