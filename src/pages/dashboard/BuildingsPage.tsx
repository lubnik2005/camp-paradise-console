import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Box, Stack, Button, IconButton, Typography, StackProps } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// navigate
import { useLocation, Link, Navigate } from 'react-router-dom'
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
//import logo from '../../../../camp-paradise-console.old/src/logo.png';

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
    const { user } = useAuthContext();
    const location = useLocation();
    const camp = location.state?.camp;

    const theme = useTheme();

    const { themeStretch } = useSettingsContext();
    if (!camp) return <Navigate to={'/dashboard/camps'} />
    return (
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} >
                        <AppWelcome
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
                            action={<></>}
                        />
                    </Grid>

                    {/* <Grid item xs={12} md={4}>
                        <AppFeatured list={_appFeatured} />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={4}>
                        <AnalyticsWidgetSummary
                            title="Registered Attendees"
                            total={234}
                            color="info"
                            icon="material-symbols:directions-run"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Link to={"cabins"} state={{ camp }} >
                            <Button variant="outlined" color="inherit" >
                                Cabins
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button variant="outlined" color="inherit" >
                            Dorms
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button variant="outlined" color="inherit" >
                            VIP
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button variant="outlined" color="inherit" >
                            RV
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button variant="outlined" color="inherit" >
                            Tents
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
