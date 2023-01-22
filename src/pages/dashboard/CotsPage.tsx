import { Helmet } from 'react-helmet-async';

// @mui
import { useTheme } from '@mui/material/styles';
import { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import LoadingScreen from 'src/components/loading-screen';
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
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    ListItemButton,
    ListItemAvatar,
    ListItemButtonProps,
    ListItemSecondaryAction,

} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../src/redux/store';
import {
    resetCart,
    addToCart,
    getCart,
    nextStep,
    backStep,
    gotoStep,
    deleteCart,
    createBilling,
    applyShipping,
    applyDiscount,
    increaseQuantity,
    decreaseQuantity,
} from '../../../src/redux/slices/product';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// utils
import axios from '../../../src/utils/axios';
import localStorageAvailable from '../../../src/utils/localStorageAvailable';
// navigate
import { useLocation, Link, Navigate } from 'react-router-dom';
// @types
import { ICheckoutCartItem } from '../../@types/product';
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
    const { camp, room } = location.state;
    const [cots, setCots] = useState([]);
    const storageAvailable = localStorageAvailable();
    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => state.product);
    const { cart, billing, activeStep } = checkout;

    const handleAddCart = (newProduct: ICheckoutCartItem) => {
        console.log(newProduct);
        dispatch(addToCart(newProduct));
    };

    useEffect(() => {
        dispatch(getCart(cart));
    }, [dispatch, cart]);


    const getCots = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`cots` + `?room_id=${room.id}&event_id=${camp.id}&token=${accessToken}`)
            setCots(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable]);

    useEffect(() => {
        getCots();
    }, [getCots]);

    const theme = useTheme();

    const StyledListContainer = styled(Paper)(({ theme }) => ({
        width: '100%',
        border: `solid 1px ${theme.palette.divider}`,
    }));

    interface Cot {
        id: number,
        first_name?: string,
        last_name?: string,
        description?: string
    }

    const { themeStretch } = useSettingsContext();
    if (!camp) return <Navigate to={PATH_DASHBOARD.general.camps} />


    const AddToCartButton = (cot) => {
        if (cot.first_name || cot.last_name) return <>Reserved</>;
        return cart.length < 1 ?
            <Button size="small" onClick={() => handleAddCart({
                id: 1,
                name: 'temp',
                cover: '/temp',
                available: '10',
                price: '150',
                colors: ['green'],
                size: 10,
                quantity: 1,
            })}>Add to cart</Button> :
            <>Return maximum of 1 cot allowed per user per event.</>
    }

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
                            action={<>{room?.name}</>}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box sx={{ width: '100%' }}>
                            <nav aria-label="main mailbox folders">
                                {cots.length ? cots.map((cot: Cot) =>
                                    <Grid item xs={12} sm={6} md={4} key={`cot-${cot.id}`}>
                                        <Card >
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="140"
                                                image="/assets/undraw_cabin_hkfr.svg"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {cot.description} $150
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {!(cot.first_name || cot.last_name) ? <>Available</> : <>{cot.first_name} {cot.last_name}</>}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <AddToCartButton cot={cot} />
                                            </CardActions>
                                        </Card>
                                    </Grid>) : <LoadingScreen />}
                            </nav>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
