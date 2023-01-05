// react
import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// axios
import axios from "../../utils/axios";
// _mock_
import {
    _appFeatured,
    _appAuthors,
    _appInstalled,
    _appRelated,
    _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
    AppWelcome,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
// storage
import localStorageAvailable from '../../utils/localStorageAvailable';

// ----------------------------------------------------------------------

interface Camp {
    id: number;
    name: string;
    start_on: string;
    end_on: string;
}

export default function CampsPage() {
    const { user } = useAuthContext();

    const storageAvailable = localStorageAvailable();

    const theme = useTheme();

    const { themeStretch } = useSettingsContext();

    const [camps, setCamps] = useState([]);

    const getCamps = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`/upcoming_events?token=${accessToken}`)
            setCamps(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable]);

    useEffect(() => {
        getCamps();
    }, [getCamps]);




    return (camps ?
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    {camps.map((camp: Camp) => <Grid
                        key={`upcoming-camp-${camp.id}`}
                        item
                        xs={12}
                        md={12} >
                        <AppWelcome
                            style={{ padding: '3em' }}
                            title={camp.name}
                            description={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on.slice(0, 10).replace(/-/g, '/')}`}
                            img={
                                <SeoIllustration
                                    sx={{
                                        p: 3,
                                        width: 360,
                                        margin: { xs: 'auto', md: 'inherit' },
                                    }}
                                />
                            }
                            action={<RouterLink to={PATH_DASHBOARD.general.buildings} state={{ camp }}><Button variant="contained">Register</Button></RouterLink>}
                        />
                    </Grid>)}
                </Grid>
            </Container>
        </> : null );
}
