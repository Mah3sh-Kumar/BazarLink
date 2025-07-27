
import React, { useState, useEffect, useRef } from 'react';
import { View, UserType, Category, Product, Wholesaler, Order, UserProfile, CartItem } from './types';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import WholesalerSection from './components/WholesalerSection';
import BuyerSection from './components/BuyerSection';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

// --- MOCK DATA ---
const categoriesWithProducts: Category[] = [
    { name: 'Vegetables', description: 'Fresh farm produce', imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=400&h=250', products: [
        { id: 'v1', name: 'Onion', price: 20, unit: 'kg', imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=300' },
        { id: 'v2', name: 'Tomato', price: 30, unit: 'kg', imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=300' },
        { id: 'v3', name: 'Potato', price: 25, unit: 'kg', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.Nl_hOvT9gghcuiXLfFFGwgHaE_?w=800&h=540&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 'v4', name: 'Garlic', price: 150, unit: 'kg', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.LIE5f1qGkJxfhTAAf5J4kwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 'v5', name: 'Cabbage', price: 15, unit: 'kg', imageUrl: 'https://en.bcdn.biz/Images/2017/7/14/ed69ca2d-b7a2-411a-9e80-5465c6190e21.jpg' },
        { id: 'v6', name: 'Bell Pepper', price: 60, unit: 'kg', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.7fCdAO_AGhWPZKTbKKh3eAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 'v7', name: 'Cauliflower', price: 25, unit: 'piece', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.Z2cHR6XfGWPyq9xEhcBrmwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
    ]},
    { name: 'Spices', description: 'Essential masalas', imageUrl: 'https://cdn.shopify.com/s/files/1/0604/6345/products/Red_Chilli_Powder.jpg?v=1514273566', products: [
        { id: 's1', name: 'Turmeric Powder', price: 50, unit: '250g', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.fNy4XeXx_M6iXeo2OQfeIgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 's2', name: 'Chilli Powder', price: 70, unit: '250g', imageUrl: 'https://cdn.shopify.com/s/files/1/0604/6345/products/Red_Chilli_Powder.jpg?v=1514273566' },
        { id: 's3', name: 'Coriander Powder', price: 60, unit: '250g', imageUrl: 'https://s3.amazonaws.com/images.ecwid.com/images/26388203/1637002882.jpg' },
        { id: 's4', name: 'Cumin Seeds', price: 80, unit: '250g', imageUrl: 'https://recipes.net/wp-content/uploads/2024/01/how-to-eat-raw-cumin-seeds-1706081825.jpeg' },
        { id: 's5', name: 'Black Pepper', price: 120, unit: '100g', imageUrl: 'https://static.fanpage.it/wp-content/uploads/sites/22/2020/11/iStock-469858939.jpg' },
    ]},
    { name: 'Rice', description: 'Staple grains', imageUrl: 'https://www.mashed.com/img/gallery/the-ultimate-guide-to-basmati-rice/l-intro-1677794298.jpg', products: [
        { id: 'r1', name: 'Basmati Rice', price: 120, unit: 'kg', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.Bxce6MgK0InXGt3KC-eSxQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 'r2', name: 'Sona Masoori Rice', price: 60, unit: 'kg', imageUrl: 'https://www.indianveggiedelight.com/wp-content/uploads/2020/04/instant-pot-sona-masoori-rice-recipe-featured-500x500.jpg' },
        { id: 'r3', name: 'Brown Rice', price: 150, unit: 'kg', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.XoGlMqyE4M20uhzlmP0yBQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' },
    ]},
    { name: 'Paper Products', description: 'Plates, glasses, utensils', imageUrl: 'https://img.freepik.com/premium-photo/disposable-biodegradable-tableware-craft-paper-plates-forks-spoons-glasses-bamboo-skewers_130716-3725.jpg?w=2000', products: [
        { id: 'p1', name: 'Paper Plates (100 pcs)', price: 120, unit: 'pack', imageUrl: 'https://d2j6dbq0eux0bg.cloudfront.net/images/39343030/2729798633.jpg' },
        { id: 'p2', name: 'Paper Cups (100 pcs)', price: 90, unit: 'pack', imageUrl: 'https://m.media-amazon.com/images/I/81YSfX1xWuL._AC_SL1500_.jpg' },
        { id: 'p3', name: 'Paper Napkins', price: 40, unit: 'pack', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.W0pLZUeXhDjuWqaP0oBRoAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 'p4', name: 'Wooden Spoons (100 pcs)', price: 110, unit: 'pack', imageUrl: 'https://tse1.explicit.bing.net/th/id/OIP.g4SxG4BookV6KCCpYbDfLQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3' },
    ]},
    { name: 'Oil & Ghee', description: 'Cooking essentials', imageUrl: 'https://cdn.shopify.com/s/files/1/0818/7575/articles/dka-Ghee_2048x.jpg?v=1563558558', products: [
        { id: 'o1', name: 'Sunflower Oil', price: 180, unit: 'litre', imageUrl: 'https://media6.ppl-media.com/mediafiles/blogs/sunflower_oil_07f668bdd1.jpg' },
        { id: 'o2', name: 'Ghee', price: 550, unit: 'litre', imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/933/280/non_2x/pure-tup-or-desi-ghee-also-known-as-clarified-liquid-butter-free-photo.jpg' },
        { id: 'o3', name: 'Mustard Oil', price: 210, unit: 'litre', imageUrl: 'https://tiimg.tistatic.com/fp/1/006/040/mustard-oil-548.jpg' },
        { id: 'o4', name: 'Coconut Oil', price: 250, unit: 'litre', imageUrl: 'https://www.healthbenefitstimes.com/9/gallery/coconut-oil/Coconut-oil-1.jpg' },
    ]},
    { name: 'Beverages', description: 'Drinks and mixes', imageUrl: 'https://image.freepik.com/free-photo/three-glasses-different-alcoholic-drinks-bar_1262-5904.jpg', products: [
        { id: 'b1', name: 'Soda Cans (24 pack)', price: 480, unit: 'pack', imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.HuiZ0wKn4fJzdUo9nFpqOQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 'b2', name: 'Bottled Water (12 pack)', price: 120, unit: 'pack', imageUrl: 'https://bodynutrition.org/wp-content/uploads/2018/06/bottled-water-feature-1200.jpg' },
        { id: 'b3', name: 'Juice Boxes (24 pack)', price: 600, unit: 'pack', imageUrl: 'https://goodmockups.com/wp-content/uploads/2020/11/Free-Juice-Cardboard-Box-Packaging-Mockup-PSD.jpg' },
    ]},
    { name: 'Packaging', description: 'Containers & boxes', imageUrl: 'https://m.media-amazon.com/images/I/71LFo9WDmsL._AC_SL1500_.jpg', products: [
        { id: 'pk1', name: 'Food Containers (50 pcs)', price: 350, unit: 'pack', imageUrl: 'https://m.media-amazon.com/images/I/81jsKwr-y5L._SL1500_.jpg' },
        { id: 'pk2', name: 'Plastic Cutlery (100 sets)', price: 200, unit: 'pack', imageUrl: 'https://media.timeout.com/images/105756794/image.jpg' },
        { id: 'pk3', name: 'Paper Bags (100 pcs)', price: 250, unit: 'pack', imageUrl: 'https://image.made-in-china.com/2f0j00SPgGnFpwZfcR/Eco-Friendly-Kraft-Paper-Bag-for-Clothing.jpg' },
    ]},
];

const allWholesalersData: Wholesaler[] = [
    { 
        name: 'Kerala Spice House', 
        imageUrl: 'https://malayali.ca/wp-content/uploads/kerala-grocery-malayali-food-hamilton-indian-spice-house-share.jpg', 
        rating: 4.8,
        reviews: 120,
        since: 2010,
        locations: 'Kochi, Bangalore',
        tier: 'Premium Partner',
        description: 'Authentic spices directly from the hills of Kerala. Trusted by top chefs.',
        startingPrice: 25, 
        minOrder: 10, 
        products: [
            { id: 's1', name: 'Turmeric Powder', price: 50, unit: '250g', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.fNy4XeXx_M6iXeo2OQfeIgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
            { id: 's5', name: 'Black Pepper', price: 120, unit: '100g', imageUrl: 'https://static.fanpage.it/wp-content/uploads/sites/22/2020/11/iStock-469858939.jpg' },
            { id: 's2', name: 'Chilli Powder', price: 70, unit: '250g', imageUrl: 'https://cdn.shopify.com/s/files/1/0604/6345/products/Red_Chilli_Powder.jpg?v=1514273566' },
        ]
    },
    { 
        name: 'Farm Fresh Mandi', 
        imageUrl: 'https://np.naukimg.com/cphoto/l4Gsy1gOf8N2DpVlPHBkVgTf1pje1C/RBzAghD1thSxJz0LTL15Ie1rUaW2fLXRo7oieCobG4ckYolq0OUHJToQaUjsY/Eh5n+kTjIIxifb8xwqIte0IODopvv2JnyNIgm', 
        rating: 4.6,
        reviews: 250,
        since: 2012,
        locations: 'Mumbai, Pune',
        tier: 'Verified',
        description: 'Your daily source for fresh vegetables directly from local farms. Quality guaranteed.',
        startingPrice: 15, 
        minOrder: 5, 
        products: [
            { id: 'v1', name: 'Onion', price: 20, unit: 'kg', imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=300' },
            { id: 'v2', name: 'Tomato', price: 30, unit: 'kg', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.JJhRCdcbDVHgd7cCnaz0_gHaEo?rs=1&pid=ImgDetMain&o=7&rm=3' },
            { id: 'v3', name: 'Potato', price: 25, unit: 'kg', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.Nl_hOvT9gghcuiXLfFFGwgHaE_?w=800&h=540&rs=1&pid=ImgDetMain&o=7&rm=3' },
        ]
    },
    { 
        name: 'Golden Grain Mills', 
        imageUrl: 'https://c8.alamy.com/comp/2K38W6K/farmer-hand-with-wheat-grain-harvest-handful-of-golden-grain-2K38W6K.jpg', 
        rating: 4.7,
        reviews: 180,
        since: 2008,
        locations: 'Punjab, Delhi',
        tier: 'Verified',
        description: 'Premium quality rice and grains sourced from the best fields in the country.',
        startingPrice: 40, 
        minOrder: 25, 
        products: [
            { id: 'r1', name: 'Basmati Rice', price: 120, unit: 'kg', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.Bxce6MgK0InXGt3KC-eSxQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
            { id: 'r2', name: 'Sona Masoori Rice', price: 60, unit: 'kg', imageUrl: 'https://www.indianveggiedelight.com/wp-content/uploads/2020/04/instant-pot-sona-masoori-rice-recipe-featured-500x500.jpg' },
        ]
    },
    { 
        name: 'EcoPack Solutions', 
        imageUrl: 'https://conceptcoffee.com.au/wp-content/uploads/2018/08/coffee-packaging.png', 
        rating: 4.5, 
        reviews: 95, 
        since: 2015, 
        locations: 'Bangalore', 
        tier: 'Verified', 
        description: 'Eco-friendly paper and packaging products for food vendors. Custom printing available.', 
        startingPrice: 5, 
        minOrder: 100, 
        products: [
            { id: 'p1', name: 'Paper Plates (100 pcs)', price: 120, unit: 'pack', imageUrl: 'https://d2j6dbq0eux0bg.cloudfront.net/images/39343030/2729798633.jpg' },
            { id: 'p2', name: 'Paper Cups (100 pcs)', price: 90, unit: 'pack', imageUrl: 'https://m.media-amazon.com/images/I/81YSfX1xWuL._AC_SL1500_.jpg' },
        ]
    },
    { 
        name: 'Liquid Gold Oils', 
        imageUrl: 'https://cdn.shopify.com/s/files/1/0818/7575/articles/dka-Ghee_2048x.jpg?v=1563558558', 
        rating: 4.9,
        reviews: 210,
        since: 2018,
        locations: 'Gujarat',
        tier: 'Premium Partner',
        description: 'Pure and healthy cooking oils and ghee. Cold-pressed and traditionally made.',
        startingPrice: 150, 
        minOrder: 50, 
        products: [
            { id: 'o1', name: 'Sunflower Oil', price: 180, unit: 'litre', imageUrl: 'https://media6.ppl-media.com/mediafiles/blogs/sunflower_oil_07f668bdd1.jpg' },
            { id: 'o2', name: 'Ghee', price: 550, unit: 'litre', imageUrl: 'https://static.vecteezy.com/system/resources/previews/015/933/280/non_2x/pure-tup-or-desi-ghee-also-known-as-clarified-liquid-butter-free-photo.jpg' },
        ]
    },
];

const initialProfile: UserProfile = {
    fullName: 'Ramesh Kumar',
    businessName: 'Kumar Chaat Corner',
    email: 'ramesh.k@example.com',
    phone: '9876543210',
    address: '123, Food Street, Mumbai, 400001',
    profileImageUrl: 'https://images.unsplash.com/photo-1615813967525-e1a179533a3a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200'
};

const mockOrders: Order[] = [
    { id: 'ORD-101', date: '2024-05-20', status: 'Delivered', total: 1250, items: [{ productName: 'Onion', quantity: 50, price: 20 }, { productName: 'Tomato', quantity: 5, price: 30 }] },
    { id: 'ORD-102', date: '2024-06-05', status: 'Delivered', total: 800, items: [{ productName: 'Paper Plates (100 pcs)', quantity: 5, price: 120 }] },
    { id: 'ORD-103', date: '2024-06-15', status: 'Processing', total: 2500, items: [{ productName: 'Sunflower Oil', quantity: 10, price: 180 }, { productName: 'Ghee', quantity: 1, price: 550 }] },
];

const initialSellerProducts: Product[] = [
    { id: 'sp1', name: 'Premium Garam Masala', price: 120, unit: '100g', imageUrl: 'https://images.unsplash.com/photo-1600578449466-93c411513170?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=300' },
    { id: 'sp2', name: 'Organic Turmeric', price: 80, unit: '100g', imageUrl: 'https://images.unsplash.com/photo-1531816548329-a785767b4c13?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=300' }
];

// --- DYNAMIC VIEW COMPONENTS (DEFINED HERE TO AVOID CREATING NEW FILES) ---

const Toast: React.FC<{ message: string; type?: 'success' | 'error'; onClose: () => void }> = ({ message, type = 'success', onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    return (
        <div className={`fixed top-5 right-5 ${bgColor} text-white py-3 px-5 rounded-lg shadow-xl animate-fade-in-up z-50 flex items-center gap-4`}>
            <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">&times;</button>
        </div>
    );
};

const CategoryDetail: React.FC<{ category: Category; onAddToCart: (product: Product) => void; onAddToWishlist: (product: Product) => void; onNavigate: (view: View) => void; }> = ({ category, onAddToCart, onAddToWishlist, onNavigate }) => (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
        <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-6 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>Back to Categories
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h2>
        <p className="text-gray-500 mb-8">{category.description}</p>
        {category.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {category.products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl group">
                        <div className="relative">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
                            <button onClick={() => onAddToWishlist(product)} className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-red-500 transition">
                                <i className="far fa-heart text-xl"></i>
                            </button>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                            <div className="flex-grow"></div>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <span className="text-brand-green-600 font-bold text-xl">₹{product.price}</span>
                                    <span className="text-sm text-gray-500">/{product.unit}</span>
                                </div>
                                <button onClick={() => onAddToCart(product)} className="bg-brand-green-100 text-brand-green-800 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-brand-green-200 transition-colors">
                                    <i className="fas fa-shopping-cart mr-2"></i>Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : <p className="text-center text-gray-500 py-10">No products found in this category yet.</p>}
    </div>
);

const AllWholesalers: React.FC<{ wholesalers: Wholesaler[]; onNavigate: (view: View, data?: any) => void; }> = ({ wholesalers, onNavigate }) => (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
        <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-6 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>Back to Home
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">All Wholesalers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wholesalers.map((wh, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl">
                     <div className="relative">
                        <img src={wh.imageUrl} alt={`${wh.name} storefront`} className="w-full h-48 object-cover"/>
                        <div className="absolute top-3 left-3 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-semibold">
                            <i className="fas fa-star text-yellow-400 mr-1.5"></i>
                            <span>{wh.rating}</span>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-bold text-xl mb-1">{wh.name}</h3>
                        <p className="text-gray-500 text-sm mb-3">Since {wh.since} • {wh.locations}</p>
                        <div className="flex items-center mb-4 gap-3">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${wh.tier === 'Premium Partner' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{wh.tier}</span>
                            <span className="text-xs text-gray-500">{wh.reviews}+ reviews</span>
                        </div>
                        <p className="text-gray-700 mb-4 text-sm flex-grow">{wh.description}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div>
                                <span className="text-brand-green-600 font-bold text-lg">From ₹{wh.startingPrice}/kg</span>
                                <span className="text-xs text-gray-500 block">Min. order: {wh.minOrder}kg</span>
                            </div>
                            <button onClick={() => onNavigate('wholesaler_detail', wh)} className="bg-brand-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-green-700 transition-colors">View Products</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const WholesalerDetail: React.FC<{ wholesaler: Wholesaler; onAddToCart: (product: Product) => void; onAddToWishlist: (product: Product) => void; onNavigate: (view: View) => void; }> = ({ wholesaler, onAddToCart, onAddToWishlist, onNavigate }) => (
    <div className="animate-fade-in-up">
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                 <button onClick={() => onNavigate('all_wholesalers')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-8 flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i>Back to All Wholesalers
                </button>
                <div className="md:flex gap-8 items-center">
                    <img src={wholesaler.imageUrl} alt={wholesaler.name} className="w-full md:w-1/3 h-64 object-cover rounded-xl shadow-lg"/>
                    <div className="mt-6 md:mt-0">
                        <h2 className="text-4xl font-bold text-gray-800">{wholesaler.name}</h2>
                        <p className="text-gray-500 text-md mt-1">Since {wholesaler.since} • {wholesaler.locations}</p>
                        <div className="flex items-center my-4 gap-4">
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${wholesaler.tier === 'Premium Partner' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{wholesaler.tier}</span>
                            <div className="flex items-center text-sm text-gray-600"><i className="fas fa-star text-yellow-400 mr-1.5"></i>{wholesaler.rating} ({wholesaler.reviews}+ reviews)</div>
                        </div>
                        <p className="text-gray-700">{wholesaler.description}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Products from {wholesaler.name}</h3>
             {wholesaler.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wholesaler.products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl group">
                            <div className="relative">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
                                <button onClick={() => onAddToWishlist(product)} className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-red-500 transition">
                                    <i className="far fa-heart text-xl"></i>
                                </button>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                <div className="flex-grow"></div>
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <span className="text-brand-green-600 font-bold text-xl">₹{product.price}</span>
                                        <span className="text-sm text-gray-500">/{product.unit}</span>
                                    </div>
                                    <button onClick={() => onAddToCart(product)} className="bg-brand-green-100 text-brand-green-800 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-brand-green-200 transition-colors">
                                        <i className="fas fa-shopping-cart mr-2"></i>Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p className="text-center text-gray-500 py-10">This wholesaler has not listed any products yet.</p>}
        </div>
    </div>
);


const OrderHistory: React.FC<{ orders: Order[]; onNavigate: (view: View) => void; }> = ({ orders, onNavigate }) => (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
        <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-6 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>Back to Home
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h2>
        <div className="bg-white rounded-lg shadow-md">
            <ul className="divide-y divide-gray-200">
                {orders.map(order => (
                    <li key={order.id} className="p-6 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-brand-green-700">{order.id}</p>
                                <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-gray-800">₹{order.total.toFixed(2)}</p>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{order.status}</span>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                           <p>Items: {order.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const Profile: React.FC<{ profile: UserProfile; onUpdateProfile: (profile: UserProfile) => void; onNavigate: (view: View) => void; }> = ({ profile: initialProfile, onUpdateProfile, onNavigate }) => {
    const [profile, setProfile] = useState(initialProfile);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(profile.profileImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setImagePreview(objectURL);
            // In a real app, you'd upload this file and get back a URL
            setProfile(p => ({...p, profileImageUrl: objectURL}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onUpdateProfile(profile);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-up">
            <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-6 flex items-center gap-2">
                <i className="fas fa-arrow-left"></i>Back to Home
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h2>
            
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Picture Section */}
                    <div className="md:col-span-1 flex flex-col items-center text-center">
                        <div className="relative group">
                            <img src={imagePreview || 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=200'} alt="Profile" className="w-40 h-40 rounded-full object-cover shadow-md mb-4"/>
                            <div onClick={handleImageUploadClick} className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition cursor-pointer">
                                <i className="fas fa-camera fa-2x text-white opacity-0 group-hover:opacity-100 transition"></i>
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*"/>
                        <h3 className="text-xl font-bold text-gray-800">{profile.fullName}</h3>
                        <p className="text-gray-500">{profile.businessName}</p>
                        <p className="text-xs text-gray-400 mt-2">Member Since 2024</p>
                    </div>

                    {/* Profile Form Section */}
                    <div className="md:col-span-2">
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4">Contact Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div><label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" id="fullName" name="fullName" value={profile.fullName} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition"/></div>
                                     <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition"/></div>
                                     <div className="sm:col-span-2"><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" id="email" name="email" value={profile.email} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition"/></div>
                                </div>
                            </div>
                             <div>
                                <h4 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4">Business Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div><label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label><input type="text" id="businessName" name="businessName" value={profile.businessName} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition"/></div>
                                     <div className="sm:col-span-2"><label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Business Address</label><input type="text" id="address" name="address" value={profile.address} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition"/></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-right">
                             <button type="submit" className="bg-brand-green-600 text-white py-3 px-6 rounded-lg hover:bg-brand-green-700 transition font-semibold disabled:bg-brand-green-400" disabled={isLoading}>
                                {isLoading ? <><i className="fas fa-spinner fa-spin mr-2"></i>Saving...</> : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

type SellerDashboardView = 'overview' | 'products' | 'analytics';

const SellerDashboard: React.FC<{
    products: Product[];
    onAddProduct: (product: Omit<Product, 'id' | 'imageUrl'>) => void;
    onDeleteProduct: (productId: string) => void;
    onNavigate: (view: View) => void;
}> = ({ products, onAddProduct, onDeleteProduct, onNavigate }) => {
    const [sellerView, setSellerView] = useState<SellerDashboardView>('overview');
    const [newProduct, setNewProduct] = useState({ name: '', price: '', unit: ''});

    const handleAddProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddProduct({ name: newProduct.name, price: Number(newProduct.price), unit: newProduct.unit });
        setNewProduct({ name: '', price: '', unit: '' });
    };

    const renderSellerContent = () => {
        switch (sellerView) {
            case 'products':
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Manage Your Products</h3>
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h4 className="font-bold text-lg mb-4">Add New Product</h4>
                            <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g., Basmati Rice" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                    <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="e.g., 80" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green-500" required/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Unit</label>
                                    <input type="text" value={newProduct.unit} onChange={e => setNewProduct({...newProduct, unit: e.target.value})} placeholder="e.g., kg" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-green-500" required/>
                                </div>
                                <button type="submit" className="bg-brand-green-600 text-white py-2 px-4 rounded-lg hover:bg-brand-green-700 transition font-semibold">Add Product</button>
                            </form>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                             <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{p.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.unit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => onDeleteProduct(p.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'analytics':
                 const analyticsData = {
                    kpis: {
                        totalRevenue: 45231,
                        totalOrders: 312,
                        avgOrderValue: 145,
                        conversionRate: 5.8,
                    },
                    salesData: [
                        { month: 'Jan', sales: 4000 }, { month: 'Feb', sales: 3000 }, { month: 'Mar', sales: 5000 },
                        { month: 'Apr', sales: 4500 }, { month: 'May', sales: 6000 }, { month: 'Jun', sales: 5500 }
                    ],
                    topProducts: [
                        { name: 'Premium Garam Masala', sold: 150, color: 'brand-green-600' },
                        { name: 'Organic Turmeric', sold: 95, color: 'brand-green-500' },
                        { name: 'Basmati Rice', sold: 80, color: 'brand-green-400' },
                        { name: 'Other', sold: 120, color: 'brand-green-300' },
                    ],
                    recentActivities: [
                        { type: 'order', text: 'New order #ORD-104 for ₹2,500', time: '5m ago', icon: 'fa-shopping-cart', color: 'text-blue-500' },
                        { type: 'review', text: 'Ramesh K. left a 5-star review', time: '1h ago', icon: 'fa-star', color: 'text-yellow-500' },
                        { type: 'stock', text: 'Low stock for Organic Turmeric', time: '3h ago', icon: 'fa-exclamation-triangle', color: 'text-red-500' },
                        { type: 'order', text: 'New order #ORD-103 for ₹550', time: '1d ago', icon: 'fa-shopping-cart', color: 'text-blue-500' },
                    ]
                };

                const maxSales = Math.max(...analyticsData.salesData.map(d => d.sales));

                const totalSold = analyticsData.topProducts.reduce((sum, p) => sum + p.sold, 0);
                let cumulativePercentage = 0;
                const conicGradient = analyticsData.topProducts.map(p => {
                    const percentage = (p.sold / totalSold) * 100;
                    const start = cumulativePercentage;
                    cumulativePercentage += percentage;
                    const end = cumulativePercentage;
                    // This won't work with tailwind JIT, so we use hex/rgb
                    const colorMap = {
                        'brand-green-600': '#16a34a',
                        'brand-green-500': '#22c55e',
                        'brand-green-400': '#4ade80',
                        'brand-green-300': '#86efac',
                    };
                    return `${colorMap[p.color]} ${start}% ${end}%`;
                }).join(', ');


                const kpiCards = [
                    { title: 'Total Revenue', value: `₹${analyticsData.kpis.totalRevenue.toLocaleString()}`, icon: 'fa-dollar-sign', trend: '+5.2%' },
                    { title: 'Total Orders', value: analyticsData.kpis.totalOrders, icon: 'fa-box-open', trend: '+8.1%' },
                    { title: 'Avg. Order Value', value: `₹${analyticsData.kpis.avgOrderValue.toLocaleString()}`, icon: 'fa-receipt', trend: '-1.5%' },
                    { title: 'Conversion Rate', value: `${analyticsData.kpis.conversionRate}%`, icon: 'fa-mouse-pointer', trend: '+0.3%' },
                ]

                return (
                     <div className="space-y-8">
                        <h3 className="text-2xl font-bold">Sales Analytics</h3>
                         {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                           {kpiCards.map((card, i) => (
                               <div key={i} className="bg-white p-5 rounded-lg shadow-md flex items-start justify-between">
                                   <div>
                                       <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                                       <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
                                       <p className={`text-sm mt-2 ${card.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                           <i className={`fas ${card.trend.startsWith('+') ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                                           {card.trend} vs last month
                                       </p>
                                   </div>
                                   <div className="bg-brand-green-100 text-brand-green-600 rounded-full h-10 w-10 flex items-center justify-center">
                                       <i className={`fas ${card.icon}`}></i>
                                   </div>
                               </div>
                           ))}
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Sales over time */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                                <h4 className="font-bold text-lg mb-4">Sales Over Time</h4>
                                <div className="flex justify-around items-end h-72 border-l border-b border-gray-200 p-4 pt-0">
                                    {analyticsData.salesData.map(d => (
                                        <div key={d.month} className="flex flex-col items-center h-full justify-end group">
                                            <div className="bg-gray-700 text-white text-xs rounded-md px-2 py-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">₹{d.sales.toLocaleString()}</div>
                                            <div className="w-12 bg-brand-green-200 rounded-t-md hover:bg-brand-green-500 transition-all" style={{height: `${(d.sales / maxSales) * 100}%`}}></div>
                                            <div className="mt-2 text-sm font-medium text-gray-600">{d.month}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Top Products */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="font-bold text-lg mb-4">Top Products</h4>
                                <div className="flex justify-center items-center my-6">
                                    <div className="relative w-40 h-40">
                                        <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${conicGradient})` }}></div>
                                        <div className="absolute inset-4 bg-gray-100 rounded-full flex items-center justify-center">
                                            <div className="text-center">
                                                <span className="text-2xl font-bold text-gray-800">{totalSold}</span>
                                                <span className="text-xs text-gray-500 block">Total Sold</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                   {analyticsData.topProducts.map(p => (
                                       <li key={p.name} className="flex items-center justify-between text-sm">
                                           <div className="flex items-center gap-2">
                                               <span className={`w-3 h-3 rounded-full bg-${p.color}`}></span>
                                               <span>{p.name}</span>
                                           </div>
                                           <span className="font-semibold">{p.sold} sold</span>
                                       </li>
                                   ))}
                                </ul>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="font-bold text-lg mb-4">Recent Activity</h4>
                             <ul className="divide-y divide-gray-100">
                                {analyticsData.recentActivities.map((activity, i) => (
                                    <li key={i} className="flex items-center gap-4 py-3">
                                        <div className={`flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 ${activity.color}`}>
                                            <i className={`fas ${activity.icon}`}></i>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm text-gray-800">{activity.text}</p>
                                        </div>
                                        <p className="text-sm text-gray-400 flex-shrink-0">{activity.time}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 'overview':
            default:
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md"><h4 className="text-gray-500 text-sm font-medium">Total Revenue</h4><p className="text-3xl font-bold text-brand-green-600 mt-1">₹45,231</p></div>
                            <div className="bg-white p-6 rounded-lg shadow-md"><h4 className="text-gray-500 text-sm font-medium">Monthly Sales</h4><p className="text-3xl font-bold text-brand-green-600 mt-1">₹5,500</p></div>
                            <div className="bg-white p-6 rounded-lg shadow-md"><h4 className="text-gray-500 text-sm font-medium">New Orders</h4><p className="text-3xl font-bold text-brand-green-600 mt-1">12</p></div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <nav className="w-64 bg-gray-800 text-white flex flex-col p-4">
                <h2 className="text-2xl font-bold mb-8">Seller Panel</h2>
                <ul className="space-y-2">
                    <li><button onClick={() => setSellerView('overview')} className={`w-full text-left p-3 rounded-md hover:bg-gray-700 transition ${sellerView === 'overview' ? 'bg-brand-green-600' : ''}`}><i className="fas fa-tachometer-alt w-6 mr-2"></i>Overview</button></li>
                    <li><button onClick={() => setSellerView('products')} className={`w-full text-left p-3 rounded-md hover:bg-gray-700 transition ${sellerView === 'products' ? 'bg-brand-green-600' : ''}`}><i className="fas fa-boxes w-6 mr-2"></i>Products</button></li>
                    <li><button onClick={() => setSellerView('analytics')} className={`w-full text-left p-3 rounded-md hover:bg-gray-700 transition ${sellerView === 'analytics' ? 'bg-brand-green-600' : ''}`}><i className="fas fa-chart-line w-6 mr-2"></i>Analytics</button></li>
                </ul>
                <div className="mt-auto">
                     <button onClick={() => onNavigate('main')} className="w-full text-left p-3 rounded-md hover:bg-gray-700 transition"><i className="fas fa-sign-out-alt w-6 mr-2"></i>Logout</button>
                </div>
            </nav>
            <main className="flex-1 p-8 animate-fade-in-up">
                {renderSellerContent()}
            </main>
        </div>
    )
};

const OrderHistoryPreview: React.FC<{ orders: Order[]; onNavigate: (view: View) => void; }> = ({ orders, onNavigate }) => {
    const recentOrders = orders.slice(-3).reverse();
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Recent Orders</h2>
                    <button onClick={() => onNavigate('order_history')} className="text-brand-green-600 font-semibold hover:underline flex items-center gap-2">
                        <span>View All Orders</span>
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md">
                    <ul className="divide-y divide-gray-200">
                        {recentOrders.map(order => (
                             <li key={order.id} className="p-4 sm:p-6 hover:bg-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                     <div className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        <i className={`fas ${order.status === 'Delivered' ? 'fa-check' : 'fa-shipping-fast'}`}></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-green-700">{order.id}</p>
                                        <p className="text-sm text-gray-500">Placed on: {order.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-gray-800">₹{order.total.toFixed(2)}</p>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{order.status}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
};

const CartView: React.FC<{ 
    cart: CartItem[]; 
    onNavigate: (view: View) => void;
    onUpdateQuantity: (productId: string, newQuantity: number) => void;
    onRemoveFromCart: (productId: string) => void;
}> = ({ cart, onNavigate, onUpdateQuantity, onRemoveFromCart }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up">
                <i className="fas fa-shopping-cart fa-5x text-gray-300 mb-6"></i>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <button onClick={() => onNavigate('main')} className="bg-brand-green-600 text-white px-8 py-3 rounded-lg hover:bg-brand-green-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-1 font-semibold text-lg">
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-up">
             <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-6 flex items-center gap-2">
                <i className="fas fa-arrow-left"></i>Continue Shopping
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 rounded-md object-cover"/>
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg">{item.product.name}</h3>
                                <p className="text-sm text-gray-500">₹{item.product.price} / {item.product.unit}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">-</button>
                                <input type="number" value={item.quantity} readOnly className="w-12 text-center font-bold text-lg border-transparent focus:border-brand-green-500 focus:ring-0" />
                                <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                            <p className="font-bold text-lg w-24 text-right">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => onRemoveFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 transition ml-4"><i className="fas fa-trash"></i></button>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-600"><p>Subtotal</p><p>₹{subtotal.toFixed(2)}</p></div>
                            <div className="flex justify-between text-gray-600"><p>Shipping</p><p>FREE</p></div>
                            <div className="flex justify-between text-gray-600 border-b pb-2"><p>Taxes</p><p>Calculated at checkout</p></div>
                            <div className="flex justify-between font-bold text-xl pt-2"><p>Total</p><p>₹{subtotal.toFixed(2)}</p></div>
                        </div>
                        <button className="w-full mt-6 bg-brand-green-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-green-700 transition">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WishlistView: React.FC<{ wishlist: Product[]; onNavigate: (view: View) => void; onAddToCart: (product: Product) => void }> = ({ wishlist, onNavigate, onAddToCart }) => (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
         <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-6 flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>Back to Home
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Wishlist</h2>
        {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {wishlist.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-xl group">
                         <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
                         <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                            <div className="flex-grow"></div>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <span className="text-brand-green-600 font-bold text-xl">₹{product.price}</span>
                                    <span className="text-sm text-gray-500">/{product.unit}</span>
                                </div>
                                <button onClick={() => onAddToCart(product)} className="bg-brand-green-100 text-brand-green-800 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-brand-green-200 transition-colors">
                                    <i className="fas fa-shopping-cart mr-2"></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
             <div className="text-center py-16">
                <i className="far fa-heart fa-5x text-gray-300 mb-6"></i>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500">Explore products and add them to your wishlist!</p>
            </div>
        )}
    </div>
);

const App: React.FC = () => {
    const [view, setView] = useState<View>('main');
    const [viewData, setViewData] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState<UserType>('buyer');
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [sellerProducts, setSellerProducts] = useState<Product[]>(initialSellerProducts);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleNavigate = (newView: View, data: any = null) => {
        setView(newView);
        setViewData(data);
        setIsMenuOpen(false); 
        window.scrollTo(0, 0);
    };
    
    const handleAddToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { product, quantity: 1 }];
        });
        showToast(`${product.name} added to cart!`, 'success');
    };
    
    const handleAddToWishlist = (product: Product) => {
        setWishlist(prev => {
            if (prev.find(p => p.id === product.id)) {
                showToast(`${product.name} is already in your wishlist.`, 'error');
                return prev;
            }
            showToast(`${product.name} added to wishlist!`);
            return [...prev, product];
        });
    };
    
    const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
        handleRemoveFromCart(productId);
      } else {
        setCart(cart.map(item => item.product.id === productId ? {...item, quantity: newQuantity} : item));
      }
    };

    const handleRemoveFromCart = (productId: string) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const handleAddProduct = (newProduct: Omit<Product, 'id' | 'imageUrl'>) => {
        setSellerProducts(prev => [
            ...prev,
            { ...newProduct, id: `sp${prev.length + 3}`, imageUrl: 'https://images.unsplash.com/photo-1546554138-f66d11303c62?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=300' }
        ]);
        showToast('Product added successfully!');
    };
    
    const handleDeleteProduct = (productId: string) => {
        setSellerProducts(prev => prev.filter(p => p.id !== productId));
        showToast('Product deleted.', 'error');
    };

    const handleUpdateProfile = (newProfile: UserProfile) => {
        setProfile(newProfile);
        showToast('Profile updated successfully!');
    };

    const renderView = () => {
        switch (view) {
            case 'login': return <LoginForm onNavigate={handleNavigate} />;
            case 'registration': return <RegistrationForm userType={viewData || 'buyer'} onNavigate={handleNavigate} />;
            case 'profile': return <Profile profile={profile} onUpdateProfile={handleUpdateProfile} onNavigate={handleNavigate} />;
            case 'order_history': return <OrderHistory orders={orders} onNavigate={handleNavigate} />;
            case 'all_wholesalers': return <AllWholesalers wholesalers={allWholesalersData} onNavigate={handleNavigate} />;
            case 'category_detail': return <CategoryDetail category={viewData} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onNavigate={handleNavigate} />;
            case 'wholesaler_detail': return <WholesalerDetail wholesaler={viewData} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onNavigate={handleNavigate} />;
            case 'seller_dashboard': return <SellerDashboard products={sellerProducts} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} onNavigate={handleNavigate} />;
            case 'cart': return <CartView cart={cart} onNavigate={handleNavigate} onUpdateQuantity={handleUpdateCartQuantity} onRemoveFromCart={handleRemoveFromCart}/>;
            case 'wishlist': return <WishlistView wishlist={wishlist} onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
            case 'main':
            default:
                return (
                    <>
                        <HeroSection onNavigate={handleNavigate} />
                        <CategoryGrid categories={categoriesWithProducts} onNavigate={handleNavigate} />
                        <OrderHistoryPreview orders={orders} onNavigate={handleNavigate} />
                        <WholesalerSection wholesalers={allWholesalersData.slice(0, 3)} onNavigate={handleNavigate} />
                        <BuyerSection onNavigate={handleNavigate} />
                    </>
                );
        }
    };
    
    const mainLayout = (
        <>
            <Header onNavigate={handleNavigate} onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
            <div className="flex">
                <SideMenu isOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} onNavigate={handleNavigate} categories={categoriesWithProducts} />
                <main className={`flex-1 transition-all duration-300 md:ml-64`}>
                    {renderView()}
                    {view === 'main' && <Footer />}
                </main>
            </div>
        </>
    );

    return (
        <div className="app-container">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {view === 'seller_dashboard' ? renderView() : mainLayout}
        </div>
    );
};

export default App;
