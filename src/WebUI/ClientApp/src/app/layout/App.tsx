import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';

function App(): React.ReactElement {
    return (
        <>
            <Container>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
