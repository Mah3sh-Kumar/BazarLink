export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    imageUrl: string;
}

export interface Category {
    name: string;
    description: string;
    imageUrl: string;
    products: Product[];
}

export interface Wholesaler {
    name: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    since: number;
    locations: string;
    tier: 'Premium Partner' | 'Verified';
    description: string;
    startingPrice: number;
    minOrder: number;
    products: Product[];
}

export interface UserProfile {
    fullName: string;
    businessName: string;
    email: string;
    phone: string;
    address: string;
    profileImageUrl?: string;
}

export interface Order {
    id: string;
    date: string;
    status: 'Delivered' | 'Processing' | 'Cancelled';
    total: number;
    items: {
        productName: string;
        quantity: number;
        price: number;
    }[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}


export type View = 'main' | 'login' | 'registration' | 'profile' | 'order_history' | 'all_wholesalers' | 'category_detail' | 'seller_dashboard' | 'cart' | 'wishlist' | 'wholesaler_detail';

export type UserType = 'buyer' | 'seller';