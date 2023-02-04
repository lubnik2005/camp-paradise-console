// react
import { useEffect, useState, useCallback } from 'react';
// @mui
import { Grid, Container, Button, Card, Typography, CardActions, CardContent, CardMedia, Box } from '@mui/material';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// navigate
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
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


// components
import { useSettingsContext } from '../../components/settings';
import { Camp } from '../../@types/camp';
// sections
import {
    AppWelcome,
} from '../../sections/@dashboard/general/app';


// assets
// storage
import localStorageAvailable from '../../utils/localStorageAvailable';

// ----------------------------------------------------------------------

export default function BuildingsPage() {
    const { user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    // const camp = location.state?.camp;
    const { campId } = useParams();
    const storageAvailable = localStorageAvailable();
    const [camps, setCamps] = useState([]);
    const [camp, setCamp] = useState<Camp | undefined>();
    const theme = useTheme();

    const { themeStretch } = useSettingsContext();
    const getCamps = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`/events?token=${accessToken}`)
            setCamps(response.data);
            console.log('data');
            console.log(response.data);
            setCamp(response.data.find((c: Camp) => c.id === parseInt(campId ?? '', 10)));
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable, campId]);
    useEffect(() => {
        getCamps();
    }, [getCamps]);


    if (!campId) navigate(PATH_DASHBOARD.general.camps)

    return (
        <>
            <Helmet>
                <title> {camp?.name ?? 'Camp'} | Camp Paradise</title>
            </Helmet>

            {camp ? <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} >
                        <AppWelcome
                            title={camp.name}
                            description={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on.slice(0, 10).replace(/-/g, '/')}`}
                            img={<Box sx={{ display: { xs: 'none', md: 'inherit' } }}>
                                <img
                                    alt="undraw_into_the_night_vumi"
                                    style={{
                                        padding: '1.2em',
                                        width: 360,
                                    }}
                                    src="/assets/undraw_into_the_night_vumi.svg" />


                            </Box>}
                            action={<CustomBreadcrumbs
                                links={[
                                    { name: 'All camps', href: PATH_DASHBOARD.general.camps },
                                    { name: camp.name },
                                ]}
                            />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            {/* <CardMedia
                                component="img"
                                alt="cabins"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Cabins
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    The cabins are located by the RV park.
                                    There are 12 cots per Cabin.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.cabins(camp.id)} >Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            {/* <CardMedia
                                component="img"
                                alt="dorm"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Dorms
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    The dorms are located behind the kitchen.
                                    The dorms have 20 rooms with 2-4 cots.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.dorms(camp.id)} >Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            {/* <CardMedia
                                component="img"
                                alt="vip"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    VIP
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    This building is located in the center of the camp.
                                    There are 16 rooms with  2-8 cots.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    component={RouterLink}
                                    to={PATH_DASHBOARD.general.vips(camp.id)}
                                    state={{ camp }}>
                                    Select
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            {/* <CardMedia
                                component="img"
                                alt="rv_parking_space"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    RV Parking Space
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    The RV parking is located next to the Cabins.
                                    The owner of the RV has to register his spot.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.rvs(camp.id)} state={{ camp }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card >
                            {/* <CardMedia
                                component="img"
                                alt="Tents"
                                height="140"
                                image="/assets/undraw_cabin_hkfr.svg"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Tents
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tents are for those who have a car equipped with a tent.
                                    There is a limited number of tent spaces.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={RouterLink} to={PATH_DASHBOARD.general.tents(camp.id)} state={{ camp }}>Select</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
            </Container> : null}
        </>
    );
}
