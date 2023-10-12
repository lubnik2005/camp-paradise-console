import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthNewPasswordForm from '../../sections/auth/AuthNewPasswordForm';
// assets
import { SentIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  const params = new URLSearchParams(window.location.search);
  const token: string = params.get('token') ?? '';
  return (
    <>
      <Helmet>
        <title> New Password | Camp Paradise</title>
      </Helmet>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Set New Password
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter your e-mail and new password.
      </Typography>

      <AuthNewPasswordForm token={token} />

      <Typography variant="body2" sx={{ my: 3 }}>
        Didn't receive an E-mail? &nbsp;
        <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.resetPassword}>
          Resend email
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}
