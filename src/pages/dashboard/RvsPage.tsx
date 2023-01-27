import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import LoadingScreen from 'src/components/loading-screen';
import {
    Container,
    Grid,
    Box,
    Stack,
    Button,
    IconButton,
    Typography,
    StackProps,
    List,
    Paper,
    Avatar,
    Switch,
    Divider,
    Collapse,
    Checkbox,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    ListItemButton,
    ListItemAvatar,
    ListItemButtonProps,
    ListItemSecondaryAction,

} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// utils
import { useLocation, Link, Navigate } from 'react-router-dom';
import axios from '../../utils/axios';
import localStorageAvailable from '../../utils/localStorageAvailable';
// navigate
import Iconify from '../../components/iconify';
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

// ----------------------------------------------------------------------

export default function RvsPage() {
    const { user } = useAuthContext();
    const location = useLocation();
    const { campId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [camp, setCamp] = useState(null);
    const storageAvailable = localStorageAvailable();
    interface Camp {
        id: number;
        name: string;
        start_on: string;
        end_on: string;
    }

    const getRooms = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`rooms?token=${accessToken}&event_id=${campId}`)
            console.log(response);
            setRooms(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable, campId]);

    const getCamps = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`/upcoming_events?token=${accessToken}`)
            const camp = response.data.find((camp: Camp) => camp.id.toString() === campId?.toString());
            setCamp(camp);
            console.log('camp');
            console.log(camp);
            if (!campId || !camp) return <Navigate to={PATH_DASHBOARD.general.camps} />
        } catch (error) {
            console.log(error);
            if (!campId || !camp) return <Navigate to={PATH_DASHBOARD.general.camps} />
        }
    }, [storageAvailable, campId]);

    const theme = useTheme();

    const StyledListContainer = styled(Paper)(({ theme }) => ({
        width: '100%',
        border: `solid 1px ${theme.palette.divider}`,
    }));

    interface Room {
        id: number,
        type: string,
        name: string,
    }

    const { themeStretch } = useSettingsContext();

    if (!campId) return <Navigate to={PATH_DASHBOARD.general.camps} />
    useEffect(() => {
        getRooms();
    }, [getRooms, campId]);

    useEffect(() => {
        getCamps();
    }, [getCamps, campId]);


    return (
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} >
                        {camp ? <AppWelcome
                            title={camp.name}
                            description={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on.slice(0, 10).replace(/-/g, '/')}`}
                            img={<img
                                style={{
                                    padding: '1.2em',
                                    width: 360,
                                    margin: { xs: 'auto', md: 'inherit' },
                                }}
                                src="/assets/undraw_into_the_night_vumi.svg" />}
                            action={<>VIP Rooms</>}
                        /> : <LoadingScreen />}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box sx={{ width: '100%' }}>
                            <nav aria-label="main mailbox folders">
                                {rooms.length ? rooms.filter((room: Room) => room.type === 'rv').map((room: Room) =>
                                    <List key={`room-${room.id}`}>
                                        <ListItem>
                                            <ListItemButton component={RouterLink} to={PATH_DASHBOARD.general.cots(camp.id, room.id)} >
                                                <ListItemIcon />
                                                <ListItemText primary={room.name} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </List>) : <LoadingScreen />}
                            </nav>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
