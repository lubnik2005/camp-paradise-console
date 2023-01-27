import * as Yup from 'yup';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
import { countries } from '../../../../assets/data';
// components
import { CustomFile } from '../../../../components/upload';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
    displayName: string;
    email: string;
    photoURL: CustomFile | string | null;
    phoneNumber: string | null;
    country: string | null;
    address: string | null;
    state: string | null;
    city: string | null;
    zipCode: string | null;
    about: string | null;
    isPublic: boolean;
};

export default function AccountGeneral() {
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useAuthContext();

    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        photoURL: Yup.string().required('Avatar is required').nullable(true),
        phoneNumber: Yup.string().required('Phone number is required'),
        country: Yup.string().required('Country is required'),
        address: Yup.string().required('Address is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        zipCode: Yup.string().required('Zip code is required'),
        about: Yup.string().required('About is required'),
    });

    const defaultValues = {
        displayName: user?.displayName || '',
        email: user?.email || '',
        photoURL: user?.photoURL || null,
        phoneNumber: user?.phoneNumber || '',
        country: user?.country || '',
        address: user?.address || '',
        state: user?.state || '',
        city: user?.city || '',
        zipCode: user?.zipCode || '',
        about: user?.about || '',
        isPublic: user?.isPublic || false,
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
            console.log('DATA', data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('photoURL', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                        <RHFUploadAvatar
                            name="photoURL"
                            disabled
                            maxSize={3145728}
                            onDrop={handleDrop}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 2,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(3145728)}
                                </Typography>
                            }
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField disabled name="displayName" label="Name" />

                            <RHFTextField disabled name="email" label="Email Address" />
                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

                            <LoadingButton disabled type="submit" variant="contained" loading={isSubmitting}>
                                Save Changes
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
