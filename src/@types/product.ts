// ----------------------------------------------------------------------

export type IProductReview = {
    id: string;
    name: string;
    avatarUrl: string;
    comment: string;
    rating: number;
    isPurchased: boolean;
    helpful: number;
    postedAt: Date | string | number;
};

export type IProduct = {
    id: string;
    cover: string;
    images: string[];
    name: string;
    price: number;
    code: string;
    sku: string;
    tags: string[];
    priceSale: number | null;
    totalRating: number;
    totalReview: number;
    ratings: {
        name: string;
        starCount: number;
        reviewCount: number;
    }[];
    reviews: IProductReview[];
    colors: string[];
    status: string;
    inventoryType: string;
    sizes: string[];
    available: number;
    description: string;
    sold: number;
    createdAt: Date | string | number;
    category: string;
    gender: string;
};

export type IProductFilter = {
    gender: string[];
    category: string;
    colors: string[];
    priceRange: number[];
    rating: string;
    sortBy: string;
};

// ----------------------------------------------------------------------

export type ICheckoutCartItem = {
    id: string;
    cot_id: number;
    room_id: number;
    event_id: number;
    name: string;
    cover: string;
    title: string;
    subtitle: string;
    available: number;
    price: number;
    colors: string[];
    size: string;
    quantity: number;
    subtotal: number;
};

export type ICheckoutBillingAddress = {
    receiver: string;
    phoneNumber: string;
    line1: string;
    city: string;
    state: string;
    countryCode: string;
    zipCode: string;
    fullAddress: string;
    addressType: string;
};

export type ICheckoutDeliveryOption = {
    value: number;
    title: string;
    description: string;
};

export type ICheckoutPaymentOption = {
    value: string;
    title: string;
    description: string;
    icons: string[];
};

export type ICheckoutCardOption = {
    value: string;
    label: string;
};

// ----------------------------------------------------------------------

export type IProductCheckoutState = {
    activeStep: number;
    cart: ICheckoutCartItem[];
    subtotal: number;
    total: number;
    discount: number;
    shipping: number;
    billing: ICheckoutBillingAddress | null;
    totalItems: number;
};

export type IProductState = {
    isLoading: boolean;
    error: Error | string | null;
    products: IProduct[];
    product: IProduct | null;
    checkout: IProductCheckoutState;
};
