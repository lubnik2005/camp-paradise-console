import { useState } from 'react';
// @mui
import { Grid, Card, CardHeader, CardContent, Button, Typography, Stack, Box } from '@mui/material';
// @types
import { ICheckoutBillingAddress, IProductCheckoutState } from '../../../../../@types/product';
// _mock
// components
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
//
import CheckoutSummary from '../CheckoutSummary';
import { useAuthContext } from "../../../../../auth/useAuthContext";
// ----------------------------------------------------------------------

type Props = {
    checkout: IProductCheckoutState;
    onBackStep: VoidFunction;
    onNextStep: VoidFunction;
    onCreateBilling: (address: ICheckoutBillingAddress) => void;
};

export default function CheckoutBillingAddress({ checkout, onBackStep, onNextStep, onCreateBilling }: Props) {
    const { total, discount, subtotal } = checkout;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { user } = useAuthContext();

    const { cart, billing, activeStep } = checkout;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item container spacing={3} xs={12} md={8}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title={<>
                                <Typography variant="h4">Contact Info</Typography>
                                <Typography variant="body2">Make sure this information is correct, as it will be used to send you details.</Typography>
                            </>} />
                            <CardContent>
                                Email: {user?.email ?? 'Email not found'}<br />
                                Name: {user?.first_name && user?.last_name ? `${user?.first_name} ${user?.last_name}` : 'Name not found'}<br />
                                Cart: {cart.map((product) => {
                                    return <>{product.name} @ ${product.price}<br /></>
                                })}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title={<Typography variant="h4">Billing Info</Typography>} />
                            <CardContent>
                                {billing?.receiver} &nbsp;
                                <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                                    ({billing?.addressType})
                                </Typography>

                                <Typography variant="body2" gutterBottom>
                                    {billing?.fullAddress}
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {billing?.phoneNumber}
                                </Typography>
                            </CardContent>
                        </Card >
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Button
                            size="small"
                            color="inherit"
                            onClick={onBackStep}
                            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={!cart.length}
                        onClick={onNextStep}
                    >
                        Confirm & Continue to Payment
                    </Button>
                </Grid>
            </Grid >
        </>
    );
}

// ----------------------------------------------------------------------
