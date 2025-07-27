import React from 'react';
import { View } from '../types';

interface HeaderProps {
    onNavigate: (view: View) => void;
    onToggleMenu: () => void;
    cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onToggleMenu, cartCount }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={onToggleMenu} className="md:hidden mr-3 text-gray-500 hover:text-brand-green-600" aria-label="Toggle menu">
                            <i className="fas fa-bars fa-lg"></i>
                        </button>
                        <div onClick={() => onNavigate('main')} className="flex items-center cursor-pointer">
                            <div className="h-8 w-8 rounded-full bg-brand-green-100 flex items-center justify-center">
                                <i className="fas fa-store text-brand-green-600"></i>
                            </div>
                            <h1 className="text-xl font-bold text-brand-green-700 ml-2">BazaarLink</h1>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center px-8">
                        <div className="relative w-full max-w-lg">
                            <input type="text" placeholder="Search products, wholesalers..." className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 w-full transition-all duration-300"/>
                            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <button onClick={() => onNavigate('login')} className="bg-brand-green-600 text-white px-5 py-2 rounded-full hover:bg-brand-green-700 transition font-semibold text-sm">
                            Sign In
                        </button>
                        <button onClick={() => onNavigate('cart')} className="relative group" aria-label={`View cart with ${cartCount} items`}>
                            <i className="fas fa-shopping-cart text-2xl text-gray-600 group-hover:text-brand-green-600 transition"></i>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-brand-green-700 text-white py-2 px-4">
                <div className="container mx-auto">
                    <p className="text-center text-sm">
                        <i className="fas fa-truck mr-2"></i> Free delivery on bulk orders over ₹2000 | <span className="font-semibold">20+ cities served</span>
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;