/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getEvents, setSelectedEvent } from './EventSlice';

export default function Events(): React.ReactElement {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { selectedEvent, events, loading } = useAppSelector((state) => state.event);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={8}
                        sx={{
                            backgroundPosition: '50% 5%',
                        }}
                    >
                        {selectedEvent && (
                            <div onClick={() => navigate(`/events/${selectedEvent?.id}`)} role="link" tabIndex={0}>
                                <img
                                    src={`${selectedEvent?.url}`}
                                    srcSet={`${selectedEvent?.url}`}
                                    alt={selectedEvent.name}
                                    loading="lazy"
                                    style={{
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                />
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={2}>
                        <ImageList sx={{ width: 250, height: `100%` }} cols={1}>
                            {events!.map((event) => (
                                <ImageListItem key={event.url}>
                                    <img
                                        src={`${event.url}?w=248&fit=crop&auto=format`}
                                        srcSet={`${event.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={event.name}
                                        loading="lazy"
                                        onMouseEnter={() =>
                                            dispatch(setSelectedEvent(events?.find((e) => e.url === event.url)))
                                        }
                                        onClick={() => navigate(`/events/${event?.id}`)}
                                    />
                                    <ImageListItemBar
                                        title={event.name}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${event.name}`}
                                            />
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
