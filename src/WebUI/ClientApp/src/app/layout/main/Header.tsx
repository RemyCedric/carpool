import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Typography, Button, Link } from '@mui/material';
import { useAppDispatch } from '../../store';
import { signOut } from '../../../features/account/AccountSlice';

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
}

export default function Header({ sections }: HeaderProps): React.ReactElement {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(signOut());
        navigate('/login');
    };

    return (
        <>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Avatar variant="square" src="/assets/carpool.png" sx={{ border: 0, objectFit: 'cover' }} />
                <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
                    Carpool PTC
                </Typography>
                <Button size="small" color="inherit">
                    <AccountCircle />
                </Button>
                <Button variant="outlined" onClick={handleLogOut} color="inherit" size="small">
                    Logout
                </Button>
            </Toolbar>
            <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'center', overflowX: 'auto' }}>
                {sections.map((section) => (
                    <Link
                        component={RouterLink}
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        to={section.url}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </>
    );
}
