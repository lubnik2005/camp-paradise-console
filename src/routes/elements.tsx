import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const VerifyJwtPage = Loadable(lazy(() => import('../pages/auth/VerifyJwtPage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const NewPasswordJwtEmailSentPage = Loadable(lazy(() => import('../pages/auth/NewPasswordJwtEmailSentPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD: GENERAL
export const BuildingsPage = Loadable(lazy(() => import('../pages/dashboard/BuildingsPage')));
export const CotsPage = Loadable(lazy(() => import('../pages/dashboard/CotsPage')));
export const CabinsPage = Loadable(lazy(() => import('../pages/dashboard/CabinsPage')));
export const DormsPage = Loadable(lazy(() => import('../pages/dashboard/DormsPage')));
export const VipsPage = Loadable(lazy(() => import('../pages/dashboard/VipsPage')));
export const RvsPage = Loadable(lazy(() => import('../pages/dashboard/RvsPage')));
export const TentsPage = Loadable(lazy(() => import('../pages/dashboard/TentsPage')));
export const CampsPage = Loadable(lazy(() => import('../pages/dashboard/CampsPage')));
export const GuidelinesPage = Loadable(lazy(() => import('../pages/dashboard/GuidelinesPage')));
export const FormsPage = Loadable(lazy(() => import('../pages/dashboard/FormsPage')));
export const FormPage = Loadable(lazy(() => import('../pages/dashboard/FormPage')));
export const ReservationsPage = Loadable(lazy(() => import('../pages/dashboard/ReservationsPage')));
export const EcommerceCheckoutPage = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckoutPage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));

