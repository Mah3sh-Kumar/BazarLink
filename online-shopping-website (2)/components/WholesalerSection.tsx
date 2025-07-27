import React from 'react';
import { Wholesaler, View } from '../types';

interface WholesalerSectionProps {
    wholesalers: Wholesaler[];
    onNavigate: (view: View, data?: any) => void;
}

const WholesalerSection: React.FC<WholesalerSectionProps> = ({ wholesalers, onNavigate }) => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Top Wholesalers</h2>
                    <button onClick={() => onNavigate('all_wholesalers')} className="text-brand-green-600 font-semibold hover:underline flex items-center gap-2">
                        <span>View All</span>
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
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
        </section>
    );
};

export default WholesalerSection;