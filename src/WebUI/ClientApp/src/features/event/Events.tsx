/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getEvents } from './EventSlice';

export default function Events(): React.ReactElement {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { events, loading } = useAppSelector((state) => state.event);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {events != null && events.length > 0 && (
                        <>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    backgroundColor: 'grey.800',
                                    color: '#fff',
                                    mb: 4,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundImage: `url(${events[0]?.url})`,
                                }}
                                onClick={() => navigate(`/events/${events[0]?.id}`)}
                            >
                                <img style={{ display: 'none' }} src={`${events[0]?.url}`} alt={events[0]!.name} />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        backgroundColor: 'rgba(0,0,0,.3)',
                                    }}
                                />
                                <Grid container>
                                    <Grid item md={6}>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                p: { xs: 3, md: 6 },
                                                pr: { md: 0 },
                                            }}
                                        >
                                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                                {events[0]!.name}
                                            </Typography>
                                            <Typography variant="h5" color="inherit" paragraph>
                                                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                                                consectetur, adipisci velit Neque porro quisquam est qui dolorem ipsum
                                                quia dolor sit amet, consectetur, adipisci velit Neque porro quisquam
                                                est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <CardActionArea component="a" href="#">
                                <Card sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 320, display: { xs: 'none', sm: 'block' } }}
                                        image={events[0]?.url}
                                        alt={events[0]?.name}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h5">
                                            {events[0!].name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {events[0].date}
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
                                            adipisci velit Neque porro quisquam est qui dolorem ipsum
                                        </Typography>
                                        <Typography variant="subtitle1" color="primary">
                                            Continue reading...
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>

                            <Grid container spacing={4}>
                                {events!.map((event) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        key={event.url}
                                        onClick={() => navigate(`/events/${event?.id}`)}
                                    >
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="250"
                                                    image={`${event.url}?w=248&fit=crop&auto=format`}
                                                    alt={event.name}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {event.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                                                        consectetur, adipisci velit
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </>
            )}
        </>
    );
}
