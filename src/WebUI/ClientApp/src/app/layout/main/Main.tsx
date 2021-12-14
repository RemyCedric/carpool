import { Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Evenement from '../../../features/event/Evenement';
import Events from '../../../features/event/Events';
import Header from './Header';
import NotFound from './NotFound';

export default function Main(): React.ReactElement {
    const sections = [{ title: 'Events', url: '/events' }];
    return (
        <>
            <Header sections={sections} />
            <Container component="main" maxWidth="lg">
                <Routes>
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:eventId" element={<Evenement />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Container>
        </>
    );
}
