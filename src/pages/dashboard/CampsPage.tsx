// react
import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// axios
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
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
    AppWidget,
    AppWelcome,
    AppFeatured,
    AppNewInvoice,
    AppTopAuthors,
    AppTopRelated,
    AppAreaInstalled,
    AppWidgetSummary,
    AppCurrentDownload,
    AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
//import logo from '../../../../camp-paradise-console.old/src/logo.png';
// storage
import localStorageAvailable from '../../utils/localStorageAvailable';

// ----------------------------------------------------------------------

export default function CampsPage() {
    //const { user } = useAuthContext();
    const { user } = useAuthContext();

    const storageAvailable = localStorageAvailable();

    const theme = useTheme();

    const { themeStretch } = useSettingsContext();

    const [camps, setCamps] = useState([]);

    const getCamps = useCallback(async () => {
        try {
            //const response = await axios.get('https://www.your-domain.com/api/product');
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`http://localhost:8000/api/upcoming_events` + `?token=${accessToken}`)
            console.log(response.data);
            console.log(response.data.camps);
            setCamps(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getCamps();
    }, []);




    return (camps ?
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    {camps.map(camp => <Grid
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
                            action={<RouterLink to={"/dashboard/buildings"} state={{ camp }}><Button variant="contained">Register</Button></RouterLink>}
                        />
                    </Grid>)}
                </Grid>
            </Container>
        </> : <></>
    );
}
