import React from 'react';
import { View, UserType, Category } from '../types';

interface SideMenuProps {
    isOpen: boolean;
    onToggleMenu: () => void;
    onNavigate: (view: View, data?: any) => void;
    categories: Category[];
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onToggleMenu, onNavigate, categories }) => {
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onToggleMenu}
            ></div>
            <aside className={`fixed top-0 left-0 h-full bg-white w-64 p-4 shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:shadow-none md:border-r border-gray-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center mb-6 md:hidden">
                    <h2 className="text-lg font-bold text-brand-green-700">Menu</h2>
                    <button onClick={onToggleMenu} className="text-gray-500 hover:text-gray-800">
                        <i className="fas fa-times fa-lg"></i>
                    </button>
                </div>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-gray-500 uppercase text-xs font-semibold mb-2 px-2">Your Account</h3>
                        <ul>
                            <li><button onClick={() => onNavigate('profile')} className="w-full text-left flex items-center p-2 text-gray-700 hover:text-brand-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"><i className="fas fa-user-circle w-5 text-center mr-3 text-gray-500"></i><span className="font-medium">Profile</span></button></li>
                            <li><button onClick={() => onNavigate('order_history')} className="w-full text-left flex items-center p-2 text-gray-700 hover:text-brand-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"><i className="fas fa-box-open w-5 text-center mr-3 text-gray-500"></i><span className="font-medium">Orders</span></button></li>
                            <li><button onClick={() => onNavigate('wishlist')} className="w-full text-left flex items-center p-2 text-gray-700 hover:text-brand-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"><i className="fas fa-heart w-5 text-center mr-3 text-gray-500"></i><span className="font-medium">Wishlist</span></button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-500 uppercase text-xs font-semibold mb-2 px-2">Categories</h3>
                        <ul>
                           {categories.map(cat => (
                               <li key={cat.name}>
                                   <button onClick={() => onNavigate('category_detail', cat)} className="w-full text-left flex items-center p-2 text-gray-700 hover:text-brand-green-600 hover:bg-green-50 rounded-md transition-colors duration-200">
                                       <img src={cat.imageUrl.replace('400x250', '20x20')} alt={cat.name} className="w-5 h-5 rounded-sm mr-3 object-cover"/>
                                       <span className="font-medium">{cat.name}</span>
                                   </button>
                               </li>
                           ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-gray-500 uppercase text-xs font-semibold mb-3 px-2">For Sellers</h3>
                    <button onClick={() => onNavigate('registration', 'seller')} className="w-full flex items-center justify-center bg-brand-green-100 text-brand-green-800 px-4 py-3 rounded-lg text-sm font-semibold hover:bg-brand-green-200 transition-colors duration-200">
                        <i className="fas fa-store mr-2"></i> Register as Seller
                    </button>
                </div>
            </aside>
        </>
    );
};

export default SideMenu;