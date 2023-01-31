import { useState } from 'react';
// @mui
import {
    Grid,
    Card,
    Button,
    Typography,
    Stack,
    Box,
    CardHeader,
    CardContent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// 
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';// @types
import { ICheckoutBillingAddress, IProductCheckoutState } from '../../../../../@types/product';
// _mock
// components
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
import { countries } from '../../../../../assets/data';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';
import SvgColor from '../../../../../../src/components/svg-color';

import FormProvider, {
    RHFCheckbox,
    RHFSelect,
    RHFTextField,
    RHFRadioGroup,
} from '../../../../../components/hook-form';


// ----------------------------------------------------------------------

type Props = {
    checkout: IProductCheckoutState;
    onBackStep: VoidFunction;
    onNextStep: VoidFunction;
    onCreateBilling: (address: ICheckoutBillingAddress) => void;
};

export default function CheckoutBillingAddress({ checkout, onBackStep, onNextStep, onCreateBilling }: Props) {
    const { total, discount, subtotal } = checkout;


    const NewAddressSchema = Yup.object().shape({
        receiver: Yup.string().required('Fullname is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        zipCode: Yup.string().required('Zip code is required'),
    });

    const defaultValues = {
        addressType: 'Home',
        receiver: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    };

    interface FormValuesProps extends ICheckoutBillingAddress {
        address: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    }


    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(NewAddressSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            onCreateBilling({
                receiver: data.receiver,
                phoneNumber: data.phoneNumber,
                line1: data.address,
                city: data.city,
                state: data.state,
                countryCode: data.country,
                zipCode: data.zipCode,
                fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
                addressType: data.addressType,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardHeader title={<>Billing Address</>} />

                            <CardContent >
                                <Stack spacing={3}>
                                    <RHFRadioGroup
                                        row
                                        name="addressType"
                                        options={[
                                            { label: 'Home', value: 'Home' },
                                            { label: 'Office', value: 'Office' },
                                        ]}
                                    />

                                    <Box
                                        rowGap={3}
                                        columnGap={2}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(2, 1fr)',
                                        }}
                                    >
                                        <RHFTextField name="receiver" label="Full Name" />

                                        <RHFTextField name="phoneNumber" label="Phone Number" />
                                    </Box>

                                    <RHFTextField name="address" label="Address" />

                                    <Box
                                        rowGap={3}
                                        columnGap={2}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(3, 1fr)',
                                        }}
                                    >
                                        <RHFTextField name="city" label="Town / City" />

                                        <RHFTextField name="state" label="State" />

                                        <RHFTextField name="zipCode" label="Zip/Code" />
                                    </Box>

                                    <RHFSelect native name="country" label="Country">
                                        <option value="" />
                                        {countries.map((country) => (
                                            <option key={country.code} value={country.code}>
                                                {country.label}
                                            </option>
                                        ))}
                                    </RHFSelect>

                                </Stack>
                            </CardContent>
                        </Card>
                        <Stack direction="row" justifyContent="space-between">
                            <Button
                                size="small"
                                color="inherit"
                                onClick={onBackStep}
                                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                            >
                                Back
                            </Button>
                        </Stack>
                    </Grid>



                    <Grid item xs={12} md={4}>
                        <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            //disabled={!cart.length}
                            loading={isSubmitting}
                        >
                            Continue to Review
                        </LoadingButton>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    );
}

// ----------------------------------------------------------------------
