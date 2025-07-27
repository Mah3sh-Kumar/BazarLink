import React from 'react';
import { View, UserType } from '../types';

interface BuyerSectionProps {
    onNavigate: (view: View, userType: UserType) => void;
}

const BuyerSection: React.FC<BuyerSectionProps> = ({ onNavigate }) => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-brand-green-600 to-green-800 text-white overflow-hidden animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="container mx-auto text-center relative">
                <div className="absolute top-0 -left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-green-300/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '3s' }}></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Ready to Stock Up?</h2>
                    <p className="text-lg md:text-xl text-green-200 max-w-3xl mx-auto mb-10">Join hundreds of vendors who are saving time and money. Create your account in minutes and start sourcing high-quality ingredients at unbeatable wholesale prices.</p>
                    <button onClick={() => onNavigate('registration', 'buyer')} className="bg-white text-brand-green-700 px-10 py-4 rounded-lg hover:bg-green-100 transition shadow-lg hover:shadow-2xl transform hover:-translate-y-1 font-bold text-lg">Create a Buyer Account</button>
                </div>
            </div>
        </section>
    );
};

export default BuyerSection;
