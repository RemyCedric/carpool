/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import { EventDto } from '../../app/api/web-api-dtos';

interface EventState {
    events: EventDto[] | null;
    selectedEvent: EventDto | null;
    loading: boolean;
}

const initialState: EventState = {
    events: null,
    selectedEvent: null,
    loading: true,
};

export const getEvents = createAsyncThunk<EventDto[]>('event/getEvents', async (_, thunkAPI: any) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const events = await agent.Event.get();
        if (events.length > 1) {
            // eslint-disable-next-line prefer-destructuring
            thunkAPI.dispatch(setSelectedEvent(events[0]));
        }
        return events;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.events = action.payload;
            state.loading = false;
        });
        builder.addCase(getEvents.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { setLoading, setSelectedEvent } = eventSlice.actions;
