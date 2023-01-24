// react
import { useEffect, useState, useCallback } from 'react';
// @mui
import { Grid, Container, Box, Stack, Button, IconButton, Card, Typography, StackProps, CardActions, CardContent, CardMedia } from '@mui/material';
// navigate
import { Link as RouterLink, useLocation, Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
// axios
import axios from "../../utils/axios";
// _mock_
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
import {
    AnalyticsTasks,
    AnalyticsNewsUpdate,
    AnalyticsOrderTimeline,
    AnalyticsCurrentVisits,
    AnalyticsWebsiteVisits,
    AnalyticsTrafficBySite,
    AnalyticsWidgetSummary,
    AnalyticsCurrentSubject,
    AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';
// assets
import { SeoIllustration } from '../../assets/illustrations';
// storage
import localStorageAvailable from '../../utils/localStorageAvailable';

interface Camp {
    id: number;
    name: string;
    start_on: string;
    end_on: string;
}

// ----------------------------------------------------------------------

export default function BuildingsPage() {
    const { user } = useAuthContext();
    const location = useLocation();
    //const camp = location.state?.camp;
    const { campId } = useParams();
    const storageAvailable = localStorageAvailable();
    const [camps, setCamps] = useState([]);
    const [camp, setCamp] = useState(null);
    const theme = useTheme();

    const { themeStretch } = useSettingsContext();
    const getCamps = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`/upcoming_events?token=${accessToken}`)
            setCamps(response.data);
            console.log('data');
            console.log(response.data);
            setCamp(response.data.find((camp: Camp) => camp.id.toString() === campId?.toString()));
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable, campId]);
    if (!campId) return <Navigate to={PATH_DASHBOARD.general.camps} />
    useEffect(() => {
        getCamps();
    }, [getCamps]);



    return (
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            {camp ? <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} >
                        <AppWelcome
                            title={camp.name}
                            description={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on.slice(0, 10).replace(/-/g, '/')}`}
                            img={<img
                                style={{
                                    padding: '1.2em',
                                    width: 360,
                                    margin: { xs: 'auto', md: 'inherit' },
                                }}
                                src="/assets/undraw_into_the_night_vumi.svg" ></img>}
                            action={<></>}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Cabins
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.cabins(camp.id)} >Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Dorms
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.dorms(camp.id)} >Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    VIP
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.vips(camp.id)} state={{ camp }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    {/*
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    RV Parking Space
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.rvs} state={{ camp }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Tents
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.tents} state={{ camp }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                            */}
                </Grid>
            </Container> : null}
        </>
    );
}
