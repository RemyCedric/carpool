/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginQuery } from '../../app/api/web-api-dtos';
import agent from '../../app/api/agent';

interface ICopyrightProps {
    sx: {
        mt: number;
        mb: number;
    };
}

function Copyright({ sx }: ICopyrightProps) {
    return (
        <>
            <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
                {'Copyright © '}
                <Link color="inherit" href="https://positivethinking.tech/fr/" target="_blank">
                    Positive Thinking company
                </Link>{' '}
                {new Date().getFullYear()}.
            </Typography>
        </>
    );
}

const theme = createTheme();

export default function Login(): React.ReactElement {
    const [loginQuery, setLoginQuery] = useState<LoginQuery>({ email: '', password: '' });

    const handleFormChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setLoginQuery({ ...loginQuery, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        agent.Account.login(loginQuery);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={loginQuery.email}
                            onChange={handleFormChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={loginQuery.password}
                            onChange={handleFormChange}
                            autoComplete="current-password"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link component={RouterLink} to="/reset-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    Don&apos;t have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
