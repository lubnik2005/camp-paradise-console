import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField, RHFRadioGroup } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
import { PATH_DASHBOARD, PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
    email: string;
    password: string;
    gender: string;
    firstName: string;
    lastName: string;
    afterSubmit?: string;
};

export default function AuthRegisterForm() {
    const { register } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        gender: Yup.string().required('Gender is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: ''
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (register) {
                await register(data.email, data.password, data.firstName, data.lastName, data.gender);
                enqueueSnackbar('Registered. Please check your email.', { persist: true })
                navigate(PATH_AUTH.login);
            }
        } catch (error) {
            console.error(error);
            reset();
            setError('afterSubmit', {
                ...error,
                message: error.message,
            });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <RHFTextField name="firstName" label="First name" />
                    <RHFTextField name="lastName" label="Last name" />
                </Stack>

                <RHFRadioGroup name="gender" options={[{ label: 'Male', value: 'm' }, { label: 'Female', value: 'f' }]} label="Gender" row />

                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <LoadingButton
                    fullWidth
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitSuccessful || isSubmitting}
                    sx={{
                        bgcolor: 'text.primary',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        '&:hover': {
                            bgcolor: 'text.primary',
                            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        },
                    }}
                >
                    Create account
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
