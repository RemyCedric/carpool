/* eslint-disable no-empty */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { Sample } from '../../app/models/sample/sample';

export interface sampleState {
    value: number;
    samples: Sample[];
}

const initialState: sampleState = {
    value: 0,
    samples: [],
};

export const getSamplesAsync = createAsyncThunk<Sample[], void>('sample/getSamplesAsync', async () => {
    try {
        return await agent.Samples.List();
    } finally {
    }
});

export const sampleSlice = createSlice({
    name: 'sample',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSamplesAsync.fulfilled, (state, action) => {
            // eslint-disable-next-line no-debugger
            debugger;
            state.value = action.payload.length;
            state.samples = action.payload;
        });
    },
});

export const { increment, decrement, incrementByAmount } = sampleSlice.actions;

export default sampleSlice.reducer;
