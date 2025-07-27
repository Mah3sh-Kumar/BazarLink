import React from 'react';
import { Category, View } from '../types';

interface CategoryGridProps {
    categories: Category[];
    onNavigate: (view: View, data?: any) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onNavigate }) => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Select a Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, index) => (
                        <div key={index} onClick={() => onNavigate('category_detail', cat)} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer group flex flex-col items-center text-center p-4 hover:shadow-xl hover:border-brand-green-200 border border-transparent">
                            <img className="h-24 w-24 object-cover rounded-full mb-4" src={cat.imageUrl} alt={cat.name} />
                            <h3 className="text-md font-bold text-gray-900 group-hover:text-brand-green-600 transition-colors">{cat.name}</h3>
                            <p className="text-sm text-gray-500">{cat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;