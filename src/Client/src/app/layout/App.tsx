import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sample from '../../features/sample/sample';

function App(): React.ReactElement {
    return (
        <>
            <Container>
                <Routes>
                    <Route path="/" element={<Sample />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
