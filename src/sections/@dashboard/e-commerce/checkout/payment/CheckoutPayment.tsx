import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// config
import { Grid, Button } from '@mui/material';
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

export default function CheckoutPayment({
    checkout,
    onReset,
    onNextStep,
    onBackStep,
    onGotoStep,
    onApplyShipping,
}: Props) {
    const { total, discount, subtotal, shipping, billing, cart } = checkout;
    const { user } = useAuthContext();

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

    // const {
    //     handleSubmit,
    //     formState: { isSubmitting },
    // } = methods;

    const onSubmit = async () => {
        try {
            onNextStep();
            onReset();
        } catch (error) {
            console.error(error);
        }
    };
    const { enqueueSnackbar } = useSnackbar();
    const [isProcessing, setIsProcessing] = useState(false);
    const [elements, setElements] = useState(null);
    const [stripe, setStripe] = useState(null)
    const stripePromise = loadStripe(STRIPE.KEY);
    const navigate = useNavigate();
    /*
    const handleSubmitTemp = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            console.log(stripe);
            console.log(elements);
            if (!stripe || !elements) {
                return;
            }

            // try {


            //     const response = await axios.get('verify_reservation', { cart });

            // } catch (error) {
            //     console.log(error);
            //     //enqueueSnackbar(error.message, { variant: 'error' });
            //     //onReset();
            //     //navigate(PATH_DASHBOARD.general.camps, { replace: true });
            //     return;
            // }
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
            } else {
                onNextStep();
                onReset();
            }

        }
        catch (error) {
            console.log(error);
        }
    }



    const [clientSecret, setClientSecret] = useState("");

    const getClientSecret = useCallback(async () => {
        const storageAvailable = localStorageAvailable();
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
    }, []);

    useEffect(() => {
        getClientSecret();
    }, [getClientSecret]);
    */


    const PaymentCheckoutMethodsWrapper = () => {
        const stripe = useStripe();
        const elements = useElements();
        const [clientSecret, setClientSecret] = useState('');

        return (<CheckoutPaymentMethods
            cardOptions={CARDS_OPTIONS}
            paymentOptions={PAYMENT_OPTIONS}
            stripePromise={stripePromise}
            sx={{ my: 3 }}
        />

        );
    }


    return (
        <FormProvider methods={methods} onSubmit={ } >
            <Elements stripe={stripePromise} >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        {/*
                        <CheckoutDelivery onApplyShipping={onApplyShipping} deliveryOptions={DELIVERY_OPTIONS} />
                    */}
                        <PaymentCheckoutMethodsWrapper />
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
                            disabled={(!stripePromise || !clientSecret)}
                            //loading={isSubmitting}
                            style={{ display: isProcessing ? 'inherit' : 'inherit' }}
                        >
                            Complete Order
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Elements>
        </FormProvider >
    );
}
