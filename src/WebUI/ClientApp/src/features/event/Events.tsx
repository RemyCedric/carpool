import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getEvents } from './EventSlice';

export default function Event(): React.ReactElement {
    const dispatch = useAppDispatch();
    const { events, loading } = useAppSelector((state) => state.event);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <ul>{events && events.map((event) => <li key={event.id}>{event.nom}</li>)}</ul>
            )}
        </>
    );
}
