import React, { useState, useEffect, useContext, useCallback } from 'react'
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
    Box,
    Card,
    Grid,
    Radio,
    Stack,
    Paper,
    Button,
    TextField,
    CardProps,
    Typography,
    RadioGroup,
    CardHeader,
    CardContent,
    FormHelperText,
    FormControlLabel,
    Skeleton
} from '@mui/material';
// Stripe
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// config
import { STRIPE } from '../../../../../config-global';
// utils
import axios from '../../../../../utils/axios';
import localStorageAvailable from '../../../../../utils/localStorageAvailable';
// @types
import { ICheckoutCardOption, ICheckoutPaymentOption } from '../../../../../@types/product';
// components
import Image from '../../../../../components/image';
import Iconify from '../../../../../components/iconify';
// section
import { PaymentNewCardDialog } from '../../../../payment';


// ----------------------------------------------------------------------

interface Props extends CardProps {
    paymentOptions: ICheckoutPaymentOption[];
    cardOptions: ICheckoutCardOption[];
}

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions, ...other }: Props) {
    const { control } = useFormContext();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const stripe = useStripe();
    // const elements = useElements();

    const Checkout = () => {
        console.log(STRIPE);
        console.log(STRIPE.KEY);
        const stripePromise = loadStripe(STRIPE.KEY);
        const [clientSecret, setClientSecret] = useState("");

        // useEffect(() => {
        //     if (accessToken?.accessToken) {
        //         fetch(import.meta.env.VITE_APP_API_URL + `create-payment-intent?token=${accessToken?.accessToken}`, {
        //             method: "POST",
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 user_id: user.id,
        //                 cot_id: 1,
        //                 room_id: 2,
        //                 event_id: 4,
        //             })
        //         })
        //             .then(async (response) => {
        //                 const { clientSecret } = await response.json();
        //                 setClientSecret(clientSecret);
        //             })
        //     }
        // }, []);

        const getClientSecret = useCallback(async () => {
            console.log('temp');
            const storageAvailable = localStorageAvailable();
            try {
                const token = storageAvailable ? localStorage.getItem('accessToken') : '';
                console.log('temp2');
                const { data } = await axios.post('create-payment-intent', {
                    token,
                    user_id: 1,
                    cot_id: 1,
                    room_id: 1,
                    event_id: 1,
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

        return (
            <span>
                {stripePromise && clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentElement />
                    </Elements>
                ): <>
                <Grid
                    container
                    justifyContent={{
                        xs: 'center',
                        md: 'space-between',
                    }}
                    sx={{
                        textAlign: {
                        xs: 'center',
                        md: 'left',
                    },
                    }}
                >
                    <Grid item xs={12} sx={{px: 2}} >
                        <Skeleton animation="wave" height={80}/>
                    </Grid>
                    <Grid item xs={6} sx={{px: 2}}>
                        <Skeleton animation="wave" height={80}/>
                    </Grid>
                    <Grid item xs={6} sx={{px: 2}}>
                        <Skeleton animation="wave" height={80}/>
                    </Grid>
                    <Grid item xs={6} sx={{px: 2}}>
                        <Skeleton animation="wave" height={80}/>
                    </Grid>
                    <Grid item xs={6} sx={{px: 2}}>
                        <Skeleton animation="wave" height={80}/>
                    </Grid>
                </Grid>
                </>}
            </span>
        );
    };


    return (
        <>
            <Card {...other}>
                <CardHeader title="Payment options" />
                <CardContent>
                    <Checkout />
                    {/* 
                    <Controller
                        name="payment"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <RadioGroup row {...field}>
                                    <Stack spacing={3} sx={{ width: 1 }}>
                                        {paymentOptions.map((option) => (
                                            <PaymentOption
                                                key={option.title}
                                                option={option}
                                                cardOptions={cardOptions}
                                                hasChild={option.value === 'credit_card'}
                                                isSelected={field.value === option.value}
                                                isCreditMethod={
                                                    option.value === 'credit_card' && field.value === 'credit_card'
                                                }
                                                onOpen={handleOpen}
                                            />
                                        ))}
                                    </Stack>
                                </RadioGroup>

                                {!!error && (
                                    <FormHelperText error sx={{ pt: 1, px: 2 }}>
                                        {error.message}
                                    </FormHelperText>
                                )}
                            </>
                        )}
                    />
*/}
                </CardContent>
            </Card>

            <PaymentNewCardDialog open={open} onClose={handleClose} />
        </>
    );
}

// ----------------------------------------------------------------------

type PaymentOptionProps = {
    option: ICheckoutPaymentOption;
    cardOptions: ICheckoutCardOption[];
    hasChild: boolean;
    isSelected: boolean;
    isCreditMethod: boolean;
    onOpen: VoidFunction;
};

function PaymentOption({
    option,
    cardOptions,
    hasChild,
    isSelected,
    isCreditMethod,
    onOpen,
}: PaymentOptionProps) {
    const { value, title, icons, description } = option;

    return (
        <Paper
            variant="outlined"
            sx={{
                display: 'flex',
                alignItems: 'center',
                transition: (theme) => theme.transitions.create('all'),
                ...(isSelected && {
                    boxShadow: (theme) => theme.customShadows.z20,
                }),
                ...(hasChild && {
                    flexWrap: 'wrap',
                }),
            }}
        >
            <FormControlLabel
                value={value}
                control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
                label={
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle2">{title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    </Box>
                }
                sx={{ py: 3, pl: 2.5, flexGrow: 1, mr: 0 }}
            />

            <Stack
                direction="row"
                spacing={1}
                flexShrink={0}
                sx={{
                    pr: 2.5,
                    display: {
                        xs: 'none',
                        sm: 'inline-flex',
                    },
                }}
            >
                {icons.map((icon) => (
                    <Image key={icon} disabledEffect alt="logo card" src={icon} />
                ))}
            </Stack>

            {isCreditMethod && (
                <Stack
                    alignItems="flex-start"
                    sx={{
                        px: 3,
                        width: 1,
                    }}
                >
                    <TextField select fullWidth label="Cards" SelectProps={{ native: true }}>
                        {cardOptions.map((card) => (
                            <option key={card.value} value={card.value}>
                                {card.label}
                            </option>
                        ))}
                    </TextField>

                    <Button
                        size="small"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={onOpen}
                        sx={{ my: 3 }}
                    >
                        Add new card
                    </Button>
                </Stack>
            )}
        </Paper>
    );
}
