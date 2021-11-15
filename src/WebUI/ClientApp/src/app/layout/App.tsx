import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Weather from '../../features/weather/weather';

function App(): React.ReactElement {
    return (
        <>
            <Container>
                <Routes>
                    <Route path="/" element={<Weather />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
