import { Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { decrement, getWeathersAsync, increment } from './weatherSlice';

export default function Weather(): React.ReactElement {
    const { value, weatherForecasts } = useSelector((state: RootState) => state.weather);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWeathersAsync());
    }, [dispatch]);

    return (
        <>
            <Typography variant="h4">h4. Heading {value}</Typography>
            <Button variant="contained" onClick={() => dispatch(increment())}>
                Increment
            </Button>
            <Button variant="contained" onClick={() => dispatch(decrement())}>
                Decrement
            </Button>
            <ul>
                {weatherForecasts.map((weatherForecast) => (
                    <li key={weatherForecast.temperatureC}>${weatherForecast.summary}</li>
                ))}
            </ul>
        </>
    );
}
