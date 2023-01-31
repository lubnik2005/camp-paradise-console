import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField, RHFCodes } from '../../components/hook-form';
// axios
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

type FormValuesProps = {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function AuthNewPasswordForm({ token }: { token: string }) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = useState(false);

    const emailRecovery =
        typeof window !== 'undefined' ? sessionStorage.getItem('email-recovery') : '';

    const VerifyCodeSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const defaultValues = {
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
        email: emailRecovery || '',
        password: '',
        confirmPassword: '',
    };

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await axios.post('/new-password', { ...data, token });
            console.log('DATA:', {
                email: data.email,
                code: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
                password: data.password,
            });
            sessionStorage.removeItem('email-recovery');
            enqueueSnackbar('Successfully changed password!');
            navigate(PATH_AUTH.login);
        } catch (error) {
            Object.keys(error.error).forEach(key => {
                const message = error.error[key];
                enqueueSnackbar(message, { variant: 'error' });
                navigate(PATH_AUTH.resetPassword);
            });
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField
                    name="email"
                    label="Email"
                    disabled={!!emailRecovery}
                    InputLabelProps={{ shrink: true }}
                />

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

                <RHFTextField
                    name="confirmPassword"
                    label="Confirm New Password"
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
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ mt: 3 }}
                >
                    Update Password
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
