import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// config
import {
    Grid, Button, CardHeader,
    CardContent, Card
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { STRIPE } from '../../../../../config-global';
// routes
import { PATH_DASHBOARD } from '../../../../../../src/routes/paths';
// @mui
// @types
import {
    ICheckoutCardOption,
    ICheckoutPaymentOption,
    ICheckoutDeliveryOption,
    IProductCheckoutState,
} from '../../../../../@types/product';
// components
import Iconify from '../../../../../components/iconify';
import FormProvider from '../../../../../components/hook-form';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import { useSnackbar } from '../../../../../components/snackbar';
// stripe
// utils
import axios from '../../../../../utils/axios';
import localStorageAvailable from '../../../../../utils/localStorageAvailable';
import { useAuthContext } from '../../../../../../src/auth/useAuthContext';
// redux
import { useDispatch, useSelector } from '../../../../../../src/redux/store';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
    {
        value: 0,
        title: 'Email delivery (Free)',
        description: 'Delivered on Monday, August 12',
    },
    {
        value: 2,
        title: 'Fast delivery ($2,00)',
        description: 'Delivered on Monday, August 5',
    },
];

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
    {
        value: 'paypal',
        title: 'Pay with Paypal',
        description: 'You will be redirected to PayPal website to complete your purchase securely.',
        icons: ['/assets/icons/payments/ic_paypal.svg'],
    },
    {
        value: 'credit_card',
        title: 'Credit / Debit Card',
        description: 'We support Mastercard, Visa, Discover and Stripe.',
        icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
    },
    {
        value: 'cash',
        title: 'Cash on CheckoutDelivery',
        description: 'Pay with cash when your order is delivered.',
        icons: [],
    },
];

const CARDS_OPTIONS: ICheckoutCardOption[] = [
    { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
    { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
    { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

type Props = {
    checkout: IProductCheckoutState;
    onNextStep: VoidFunction;
    onBackStep: VoidFunction;
    onReset: VoidFunction;
    onGotoStep: (step: number) => void;
    onApplyShipping: (value: number) => void;
};

type FormValuesProps = {
    delivery: number;
    payment: string;
};

const CheckoutForm = ({
    checkout,
    onReset,
    onNextStep,
    onBackStep,
    onGotoStep,
    onApplyShipping,
}: Props) => {
    const { total, discount, subtotal, shipping, billing, cart } = checkout;
    const { user } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const PaymentSchema = Yup.object().shape({
        payment: Yup.string().required('Payment is required!'),
    });

    const defaultValues = {
        delivery: shipping,
        payment: '',
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(PaymentSchema),
        defaultValues,
    });
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const response = await axios.get('verify-reservation', { cart });
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.message, { variant: 'error' });
            setIsProcessing(false);
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/login`
            },
            redirect: "if_required"
        });
        if (error) {
            console.log(error);
            enqueueSnackbar(error.message, { variant: 'error' });
            setIsProcessing(false);
        } else {
            onNextStep();
            onReset();
        }
    };


    return (<FormProvider methods={methods} onSubmit={handleSubmit} >
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Card >
                    <CardHeader title="Payment options" />
                    <CardContent>
                        <PaymentElement />
                    </CardContent>
                </Card>
                {/*
                    <CheckoutPaymentMethods
                        cardOptions={CARDS_OPTIONS}
                        paymentOptions={PAYMENT_OPTIONS}
                        sx={{ my: 3 }}
                    />
    */}
                <Button
                    size="small"
                    color="inherit"
                    onClick={onBackStep}
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                >
                    Back
                </Button>
            </Grid>

            <Grid item xs={12} md={4}>
                <CheckoutBillingInfo onBackStep={onBackStep} billing={billing} />

                <CheckoutSummary
                    enableEdit
                    total={total}
                    subtotal={subtotal}
                    discount={discount}
                    shipping={shipping}
                    onEdit={() => onGotoStep(0)}
                />
                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isProcessing}
                >
                    Complete Order
                </LoadingButton>
            </Grid>
        </Grid>

    </FormProvider >
    );
}


export default function CheckoutPayment({
    checkout,
    onReset,
    onNextStep,
    onBackStep,
    onGotoStep,
    onApplyShipping,
}: Props) {

    const [clientSecret, setClientSecret] = useState("");
    const stripePromise = loadStripe(STRIPE.KEY);
    const { user } = useAuthContext();
    const { total, discount, subtotal, shipping, billing, cart } = checkout;

    const storageAvailable = localStorageAvailable();
    const fetchClientSecret = async () => {
        try {
            const token = storageAvailable ? localStorage.getItem('accessToken') : '';
            const { data } = await axios.post('create-payment-intent', {
                token,
                user_id: user.id,
                cart
            }, {
                headers: { 'Content-Type': 'text/json' }
            });
            console.log(data);
            console.log(data.clientSecret);
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchClientSecret();
    }, [storageAvailable]);

    return (clientSecret && stripePromise ? <Elements stripe={stripePromise} options={{ clientSecret }} >
        <CheckoutForm
            checkout={checkout}
            onReset={onReset}
            onNextStep={onNextStep}
            onBackStep={onBackStep}
            onGotoStep={onGotoStep}
            onApplyShipping={onApplyShipping} />
    </Elements> : <LoadingScreen />
    );
}
