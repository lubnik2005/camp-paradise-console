import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Iconify from '../../../src/components/iconify';
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
    ListItemText,
    ListItemIcon,
    ListSubheader,
    ListItemButton,
    ListItemAvatar,
    ListItemButtonProps,
    ListItemSecondaryAction,

} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


// navigate
import { useLocation, Link, Navigate } from 'react-router-dom';
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

export default function CabinsPage() {
    const { user } = useAuthContext();
    const location = useLocation();
    const camp = location.state?.camp;

    const theme = useTheme();

    const StyledListContainer = styled(Paper)(({ theme }) => ({
        width: '100%',
        border: `solid 1px ${theme.palette.divider}`,
    }));

    const { themeStretch } = useSettingsContext();
    if (!camp) return <Navigate to={PATH_DASHBOARD.general.camps} />
    return (
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
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
                            action={<>Cabins</>}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <nav aria-label="main mailbox folders">
                                <StyledListContainer>
                                    <List>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Iconify icon="ic:baseline-image" width={24} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Iconify icon="ic:baseline-work" width={24} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Iconify icon="ic:round-beach-access" width={24} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                        </ListItemButton>
                                    </List>
                                </StyledListContainer>
                            </nav>
                            <Divider />
                            <nav aria-label="secondary mailbox folders">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary="Trash" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText primary="Spam" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
