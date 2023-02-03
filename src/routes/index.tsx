import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
    // Auth
    LoginPage,
    RegisterPage,
    VerifyJwtPage,
    NewPasswordPage,
    NewPasswordJwtEmailSentPage,
    ResetPasswordPage,
    // Dashboard: General
    BuildingsPage,
    CotsPage,
    CabinsPage,
    DormsPage,
    VipsPage,
    RvsPage,
    TentsPage,
    CampsPage,
    GuidelinesPage,
    MapPage,
    FormPage,
    FormsPage,
    ReservationsPage,
    UserAccountPage,
    EcommerceCheckoutPage,
    Page500,
    Page403,
    Page404,
    ResendVerificationPage,
    ComingSoonPage,
    MaintenancePage,
    VerificationEmailSentPage
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        // Auth
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <LoginPage />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <GuestGuard>
                            <RegisterPage />
                        </GuestGuard>
                    ),
                },
                { path: 'login-unprotected', element: <LoginPage /> },
                { path: 'register-unprotected', element: <RegisterPage /> },
                {
                    element: <CompactLayout />,
                    children: [
                        { path: 'reset-password', element: <ResetPasswordPage /> },
                        { path: 'new-password', element: <NewPasswordPage /> },
                        { path: 'reset-password-email-sent', element: <NewPasswordJwtEmailSentPage /> },
                        { path: 'verify', element: <VerifyJwtPage /> },
                        { path: 'resend', element: <ResendVerificationPage /> },
                        { path: 'verification-email-sent', element: <VerificationEmailSentPage /> },
                    ],
                },
            ],
        },

        // Dashboard
        {
            path: '/',
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
                { path: 'camps/:campId', element: <BuildingsPage /> },
                { path: 'camps/:campId/cabins', element: <CabinsPage /> },
                { path: 'camps/:campId/dorms', element: <DormsPage /> },
                { path: 'camps/:campId/vips', element: <VipsPage /> },
                { path: 'camps/:campId/rvs', element: <RvsPage /> },
                { path: 'camps/:campId/tents', element: <TentsPage /> },
                { path: 'camps/:campId/:roomId/cots', element: <CotsPage /> },
                { path: 'guidelines/:campId', element: <GuidelinesPage /> },
                { path: 'guidelines', element: <GuidelinesPage /> },
                { path: 'camps', element: <CampsPage /> },
                { path: 'forms', element: <FormsPage /> },
                { path: 'forms/:formId', element: <FormPage /> },
                { path: 'reservations', element: <ReservationsPage /> },
                { path: 'map', element: <MapPage /> },
                {
                    path: 'e-commerce',
                    children: [
                        { path: 'checkout', element: <EcommerceCheckoutPage /> },
                    ],
                },
                {
                    path: 'user',
                    children: [
                        { path: 'account', element: <UserAccountPage /> },
                    ],
                },
            ],
        },
        {
            element: <CompactLayout />,
            children: [
                { path: 'coming-soon', element: <ComingSoonPage /> },
                { path: 'maintenance', element: <MaintenancePage /> },
                { path: '500', element: <Page500 /> },
                { path: '404', element: <Page404 /> },
                { path: '403', element: <Page403 /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
