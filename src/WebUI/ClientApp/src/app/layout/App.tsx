import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCurrentUser } from '../../features/account/AccountSlice';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import { useAppDispatch } from '../store';
import Header from './Header';
import RequireAuth from './RequireAuth';

function App(): React.ReactElement {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth={false} disableGutters>
                <ToastContainer position="bottom-right" theme="colored" hideProgressBar />
                <CssBaseline />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/home"
                        element={
                            <RequireAuth>
                                <Header />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
