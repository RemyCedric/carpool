/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-empty */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherForecastClient, WeatherForecastDto } from '../../app/api/web-api-dtos';

export interface weatherState {
    value: number;
    weatherForecasts: WeatherForecastDto[];
}

const initialState: weatherState = {
    value: 0,
    weatherForecasts: [],
};

export const getWeathersAsync = createAsyncThunk<WeatherForecastDto[], void>('weather/getWeathersAsync', async () => {
    try {
        const weatherForecastClient = new WeatherForecastClient();
        return await weatherForecastClient.get();
    } finally {
    }
});

export const weatherSlice = createSlice({
    name: 'weather',
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
        builder.addCase(getWeathersAsync.fulfilled, (state, action) => {
            state.weatherForecasts = action.payload;
        });
    },
});

export const { increment, decrement, incrementByAmount } = weatherSlice.actions;

export default weatherSlice.reducer;
