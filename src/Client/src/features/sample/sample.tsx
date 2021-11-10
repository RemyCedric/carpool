import { Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { decrement, getSamplesAsync, increment } from './sampleSlice';

export default function Sample(): React.ReactElement {
    const { value, samples } = useSelector((state: RootState) => state.sample);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSamplesAsync());
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
                {samples.map((sample) => (
                    <li key={sample.temperatureC}>${sample.summary}</li>
                ))}
            </ul>
        </>
    );
}
