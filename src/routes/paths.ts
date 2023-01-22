// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

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
    newPasswordEmailSent: path(ROOTS_AUTH, '/new-password-email-sent'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page403: '/403',
    page404: '/404',
    page500: '/500',
    components: '/components',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    kanban: path(ROOTS_DASHBOARD, '/kanban'),
    calendar: path(ROOTS_DASHBOARD, '/calendar'),
    fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
    permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
    blank: path(ROOTS_DASHBOARD, '/blank'),
    general: {
        cots: path(ROOTS_DASHBOARD, '/cots'),
        camps: path(ROOTS_DASHBOARD, '/camps'),
        //buildings: path(ROOTS_DASHBOARD, '/buildings'),
        buildings: (campId: string) => path(ROOTS_DASHBOARD, `/camps/${campId}`),
        //cabins: path(ROOTS_DASHBOARD, '/cabins'),
        cabins: (campId: string) => path(ROOTS_DASHBOARD, `/camps/${campId}/cabins`),
        dorms: path(ROOTS_DASHBOARD, '/dorms'),
        vips: path(ROOTS_DASHBOARD, '/vips'),
        rvs: path(ROOTS_DASHBOARD, '/rvs'),
        tents: path(ROOTS_DASHBOARD, '/tents'),
        app: path(ROOTS_DASHBOARD, '/app'),
        ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
        analytics: path(ROOTS_DASHBOARD, '/analytics'),
        banking: path(ROOTS_DASHBOARD, '/banking'),
        booking: path(ROOTS_DASHBOARD, '/booking'),
        file: path(ROOTS_DASHBOARD, '/file'),
    },
    mail: {
        root: path(ROOTS_DASHBOARD, '/mail'),
        all: path(ROOTS_DASHBOARD, '/mail/all'),
    },
    chat: {
        root: path(ROOTS_DASHBOARD, '/chat'),
        new: path(ROOTS_DASHBOARD, '/chat/new'),
        view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        new: path(ROOTS_DASHBOARD, '/user/new'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        cards: path(ROOTS_DASHBOARD, '/user/cards'),
        profile: path(ROOTS_DASHBOARD, '/user/profile'),
        account: path(ROOTS_DASHBOARD, '/user/account'),
        edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
        demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
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
    blog: {
        root: path(ROOTS_DASHBOARD, '/blog'),
        posts: path(ROOTS_DASHBOARD, '/blog/posts'),
        new: path(ROOTS_DASHBOARD, '/blog/new'),
        view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
        demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
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
