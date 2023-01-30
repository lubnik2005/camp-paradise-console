import { Helmet } from 'react-helmet-async';

// @mui
import { useEffect, useState, useCallback } from 'react';
import LoadingScreen from 'src/components/loading-screen';
import { LoadingButton } from '@mui/lab';
import {
    Container,
    Grid,
    Button,
    Typography,
    Chip,
    Card, CardActions, CardContent

} from '@mui/material';
// redux
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
// utils
import axios from "../../utils/axios";
import localStorageAvailable from "../../utils/localStorageAvailable";
// navigate
import {
    resetCart,
    addToCart,
    getCart,
} from "../../redux/slices/product";
import { useDispatch, useSelector } from "../../redux/store";
// @types
import { ICheckoutCartItem } from '../../@types/product';
// routes
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import { Camp, Room, Cot } from "../../@types/camp";


// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
    AppWelcome,
} from '../../sections/@dashboard/general/app';


// assets

// ----------------------------------------------------------------------

export default function CotsPage() {
    const { user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const { campId, roomId } = useParams();
    const [room, setRoom] = useState<Room | undefined>();
    const [camp, setCamp] = useState<Camp | undefined>();
    const [cots, setCots] = useState<Array<Cot> | undefined>();
    const storageAvailable = localStorageAvailable();
    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => state.product);
    const { cart, billing, activeStep } = checkout;
    if (!(campId && roomId)) navigate(PATH_DASHBOARD.general.camps);

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
            const { data } = await axios.get(`rooms?token=${accessToken}&event_id=${campId}`)
            console.log(data.find((r: Room) => r.id === parseInt(roomId ?? '', 10)));
            setRoom(data.find((r: Room) => r.id === parseInt(roomId ?? '', 10)));
            // console.log((data.find((room: Room) => room.id === roomId));
            // setRoom((data.find((room: Room) => room.id === roomId));
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable, campId, roomId]);

    const getCamps = useCallback(async () => {
        try {
            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const { data } = await axios.get(`/upcoming_events?token=${accessToken}`)
            const find = data.find((c: Camp) => c.id === parseInt(campId ?? '', 10));
            setCamp(find);
        } catch (error) {
            console.log(error);
        }
    }, [storageAvailable, campId]);


    const getCots = useCallback(async () => {
        console.log('CAMPID');
        console.log(campId);
        if (campId) {
            try {
                const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
                const { data } = await axios.get(`cots`, {
                    params: {
                        room_id: roomId,
                        event_id: campId,
                        token: accessToken
                    }
                })
                setCots(data);
            } catch (error) {
                console.log(error);
            }
        }
    }, [storageAvailable, roomId, campId]);

    const { themeStretch } = useSettingsContext();

    // if (!campId) return <Navigate to={PATH_DASHBOARD.general.camps} />
    useEffect(() => {
        getRooms();
    }, [getRooms, campId]);

    useEffect(() => {
        getCamps();
    }, [getCamps, campId]);

    useEffect(() => {
        getCots();
    }, [getCots, campId, roomId]);


    const AddToCartButton = ({ cot }: { cot: Cot }) => {
        const isSubmitting = true;
        if (!cot || !camp || !room) return <LoadingButton
            type="button"
            variant="contained"
            loading={isSubmitting}
        >
            Post
        </LoadingButton>;
        if (cot.first_name || cot.last_name) return <Button size="small" disabled>Reserved</Button>;
        if (camp.reservations.length > 0) return <Button size="small" disabled>Purchase limit reached</Button>;
        console.log(camp);
        console.log(cot)
        if (!camp || !roomId) navigate(PATH_DASHBOARD.general.camps);
        return !cart.find((product: ICheckoutCartItem) => product.cot_id === cot.id) ?
            <Button size="small" onClick={() => handleAddCart({
                id: cot.id.toString(),
                cot_id: cot.id,
                room_id: room.id,
                event_id: camp.id,
                name: `${camp.name} ${room.name} ${cot.description}`,
                cover: '/temp',
                available: 1,
                price: cot.price / 100,
                colors: ['sm'],
                size: 'sm',
                quantity: 1,
                subtotal: cot.price / 100,
            })}>Add to cart</Button> :
            <Button size="small" disabled>In Cart</Button>
    }

    return (
        <>
            <Helmet>
                <title> Cots | Camp Paradise</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} >
                        {camp && room ? <AppWelcome
                            title={camp.name}
                            description={`${camp.start_on.slice(0, 10).replace(/-/g, '/')} — ${camp.end_on.slice(0, 10).replace(/-/g, '/')}`}
                            img={<img
                                alt="undraw_into_the_night_vumi"
                                style={{
                                    padding: '1.2em',
                                    width: 360,
                                }}
                                src="/assets/undraw_into_the_night_vumi.svg" />}
                            action={<>{room?.name}</>}
                        /> : <LoadingScreen />}
                    </Grid>
                    {cots !== undefined ? cots.map((cot: Cot) =>
                        <Grid item xs={12} sm={6} md={4} key={`cot-${cot.id}`}>
                            <Card >
                                {/* <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image="/assets/undraw_cabin_hkfr.svg"
                                /> */}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {cot.description} {(!cot.first_name && !cot.last_name) ? <Chip label={`$${cot.price / 100}`} /> : null}
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
