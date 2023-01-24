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
    Chip,
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
import { Link as RouterLink, useParams } from 'react-router-dom';
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
    const { campId, roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [camp, setCamp] = useState(null);
    const [cots, setCots] = useState([]);
    const storageAvailable = localStorageAvailable();
    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => state.product);
    const { cart, billing, activeStep } = checkout;

    const handleAddCart = (newProduct: ICheckoutCartItem) => {
        console.log(newProduct);
        dispatch(resetCart());
        dispatch(addToCart(newProduct));
    };

    useEffect(() => {
        dispatch(getCart(cart));
    }, [dispatch, cart]);

    
    const getRooms = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const {data} = await axios.get(`rooms?token=${accessToken}&event_id=${campId}`)
            console.log(data.find((room: Room) => room.id.toString() === roomId));
            setRoom(data.find((room: Room) => room.id.toString() === roomId));
            //console.log((data.find((room: Room) => room.id === roomId));
            //setRoom((data.find((room: Room) => room.id === roomId));
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
            //if (!campId || !camp) return <Navigate to={PATH_DASHBOARD.general.camps} />
        } catch (error) {
            console.log(error);
            //if (!campId || !camp) return <Navigate to={PATH_DASHBOARD.general.camps} />
        }
    }, [storageAvailable, campId]);


    const getCots = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const response = await axios.get(`cots` + `?room_id=${roomId}&event_id=${campId}&token=${accessToken}`)
            setCots(response.data);
            //if (!campId || !camp) return <Navigate to={PATH_DASHBOARD.general.camps} />
        } catch (error) {
            console.log(error);
            //if (!campId || !camp) return <Navigate to={PATH_DASHBOARD.general.camps} />
        }
    }, [storageAvailable, roomId]);


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

    interface Room {
        id: number,
        type: string,
        name: string,
    }

    interface Camp {
        id: number;
        name: string;
        start_on: string;
        end_on: string;
    }

    const { themeStretch } = useSettingsContext();

    //if (!campId) return <Navigate to={PATH_DASHBOARD.general.camps} />
    useEffect(() => {
        getRooms();
    }, [getRooms, campId]);

    useEffect(() => {
        getCamps();
    }, [getCamps, campId]);

    useEffect(() => {
        getCots();
    }, [getCots, campId, roomId]);


    const AddToCartButton = ({cot}) => {
        if (cot.first_name || cot.last_name) return <>Reserved</>;
        {console.log('cart');}
        {console.log(cart);}
        console.log(cot)
        return !cart.find((product) => product.id === cot.id) ?
            <Button size="small" onClick={() => handleAddCart({
                id: cot.id,
                name: `${camp.name} ${room.name} ${cot.description}`,
                cover: '/temp',
                available: '1',
                price: '150',
                colors: ['green'],
                size: 0,
                quantity: 1,
            })}>Add to cart</Button> :
            <Button size="small" disabled>In Cart</Button>
    }

    return (
        <>
            <Helmet>
                <title> General: App | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} >
                        {camp && room ? <AppWelcome
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
                        /> : <LoadingScreen/>}
                    </Grid>
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
                                    {cot.description} <Chip label="$150" />
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

                </Grid>
            </Container>
        </>
    );
}
