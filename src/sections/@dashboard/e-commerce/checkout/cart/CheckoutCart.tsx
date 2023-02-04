import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// @types
import { IProductCheckoutState } from '../../../../../@types/product';
// components
import Iconify from '../../../../../components/iconify';
import EmptyContent from '../../../../../components/empty-content';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutCartProductList from './CheckoutCartProductList';
import { useCallback, useEffect, useState } from 'react';
// utils
import axios from '../../../../../../src/utils/axios';
import localStorageAvailable from '../../../../../../src/utils/localStorageAvailable';
import { connectFirestoreEmulator } from 'firebase/firestore';

// ----------------------------------------------------------------------

type Props = {
    checkout: IProductCheckoutState;
    onNextStep: VoidFunction;
    onApplyDiscount: (value: number) => void;
    onDeleteCart: (productId: string) => void;
    onIncreaseQuantity: (productId: string) => void;
    onDecreaseQuantity: (productId: string) => void;
};

export default function CheckoutCart({
    checkout,
    onNextStep,
    onApplyDiscount,
    onDeleteCart,
    onIncreaseQuantity,
    onDecreaseQuantity,
}: Props) {
    const { cart, total, discount, subtotal } = checkout;
    const totalItems = sum(cart.map((item) => item.quantity));
    const isEmptyCart = !cart.length;
    type Form = {
        formId: number,
        campId: number,
        campName: string
    }
    const [forms, setForms] = useState<Form[] | null>(null);
    const storageAvailable = localStorageAvailable();


    const fetchForms = useCallback(async () => {
        if (cart.length === 0) {
            setForms([]);
            return;
        };
        const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
        try {
            const { data } = await axios.get(`/verify-forms?token=${accessToken}`, { params: { cart } });
            setForms(data);
        }
        catch (error) {
            console.log(error);
        }
    }, [cart, storageAvailable]);

    useEffect(() => {
        fetchForms();
    }, [fetchForms]);


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Card sx={{ mb: 3 }}>
                    <CardHeader
                        title={
                            <Typography variant="h6">
                                Cart
                                <Typography component="span" sx={{ color: 'text.secondary' }}>
                                    &nbsp;({totalItems} item)
                                </Typography>
                            </Typography>
                        }
                        sx={{ mb: 3 }}
                    />

                    {!isEmptyCart ? (
                        <CheckoutCartProductList
                            products={cart}
                            onDelete={onDeleteCart}
                            onIncreaseQuantity={onIncreaseQuantity}
                            onDecreaseQuantity={onDecreaseQuantity}
                        />
                    ) : (
                        <EmptyContent
                            title="Cart is empty"
                            description="Look like you have no items in your shopping cart."
                            img="/assets/illustrations/illustration_empty_cart.svg"
                        />
                    )}
                </Card>

                <Button
                    component={RouterLink}
                    to={PATH_DASHBOARD.general.camps}
                    color="inherit"
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                >
                    Back to Camps
                </Button>
            </Grid>

            <Grid item xs={12} md={4}>
                <CheckoutSummary
                    enableDiscount
                    total={total}
                    discount={discount}
                    subtotal={subtotal}
                    onApplyDiscount={onApplyDiscount}
                />
                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={forms === null}
                    disabled={!cart.length || forms?.length !== 0}
                    onClick={onNextStep}
                >
                    Check Out
                </LoadingButton>
                {forms !== null && forms.length > 0 && <Typography variant="caption" color="error" >Please fill out <Link component={RouterLink} to={PATH_DASHBOARD.general.form(forms[0].formId, forms[0].campId)} color="error" style={{ textDecoration: 'underline' }}> Health Form for {forms[0].campName}</Link> to checkout.</Typography>}
            </Grid>
        </Grid>
    );
}
