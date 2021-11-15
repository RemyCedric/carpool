/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
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
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm<LoginQuery>({ mode: 'onTouched' });

    async function submitForm(data: FieldValues) {
        await agent.Account.login(data as LoginQuery);
    }

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
                    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            autoFocus
                            {...register('email', {
                                required: 'email required',
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@test.com$/,
                                    message: `The email isn't valid, please enter an 'positivethinking.lu' email`,
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type="password"
                            {...register('password', {
                                required: 'password required',
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: `The password isn't valid, it should contain at least one upperase letter, one lowercase letter, one number thus one special character`,
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                        />
                        <LoadingButton
                            disabled={!isValid}
                            loading={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
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
