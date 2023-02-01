// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    verify: path(ROOTS_AUTH, '/verify'),
    resend: path(ROOTS_AUTH, '/resend'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    newPassword: path(ROOTS_AUTH, '/new-password'),
    newPasswordEmailSent: path(ROOTS_AUTH, '/reset-password-email-sent'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    page403: '/403',
    page404: '/404',
    page500: '/500',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
    blank: path(ROOTS_DASHBOARD, '/blank'),
    general: {
        // cots: path(ROOTS_DASHBOARD, '/cots'),
        cots: (campId: number, roomId: number) => path(ROOTS_DASHBOARD, `/camps/${campId}/${roomId}/cots`),
        camps: path(ROOTS_DASHBOARD, '/camps'),
        // buildings: path(ROOTS_DASHBOARD, '/buildings'),
        buildings: (campId: number) => path(ROOTS_DASHBOARD, `/camps/${campId}`),
        // cabins: path(ROOTS_DASHBOARD, '/cabins'),
        cabins: (campId: number) => path(ROOTS_DASHBOARD, `/camps/${campId}/cabins`),
        dorms: (campId: number) => path(ROOTS_DASHBOARD, `/camps/${campId}/dorms`),
        vips: (campId: number) => path(ROOTS_DASHBOARD, `/camps/${campId}/vips`),
        rvs: (campId: number) => path(ROOTS_DASHBOARD, `/camps/${campId}/rvs`),
        tents: (campId: number) => path(ROOTS_DASHBOARD, `/camps/${campId}/tents`),
        forms: path(ROOTS_DASHBOARD, '/forms'),
        reservations: path(ROOTS_DASHBOARD, '/reservations'),
        map: path(ROOTS_DASHBOARD, '/map'),
        form: (formId: number) => path(ROOTS_DASHBOARD, `/forms/${formId}`),
        // vips: path(ROOTS_DASHBOARD, '/vips'),
        guidelines: path(ROOTS_DASHBOARD, '/guidelines'),
        camp_guidelines: (campId: number) => path(ROOTS_DASHBOARD, `/guidelines/${campId}`)
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user/account'),
        account: path(ROOTS_DASHBOARD, '/user/account'),
    },
    eCommerce: {
        root: path(ROOTS_DASHBOARD, '/e-commerce'),
        shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
        list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
        checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
        new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
        view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
        edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
        demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
        demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    },

};

export const PATH_DOCS = {
    root: 'https://docs.minimals.cc',
    changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
    'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
