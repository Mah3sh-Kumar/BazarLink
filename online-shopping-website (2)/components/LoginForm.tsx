import React, { useState } from 'react';
import { View, UserType } from '../types';

interface LoginFormProps {
    onNavigate: (view: View, userType?: UserType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onNavigate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (selectedUserType === 'seller') {
                onNavigate('seller_dashboard');
            } else {
                onNavigate('main');
            }
        }, 1500);
    };

    if (!selectedUserType) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in-up">
                    <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-4 flex items-center gap-2">
                        <i className="fas fa-arrow-left"></i>Back to Home
                    </button>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
                        <p className="mt-2 text-md text-gray-600">How would you like to continue?</p>
                    </div>
                    <div className="space-y-4">
                        <button onClick={() => setSelectedUserType('buyer')} className="w-full flex items-center justify-center text-left p-6 border-2 border-gray-200 rounded-lg hover:border-brand-green-500 hover:bg-green-50 transition group">
                            <i className="fas fa-shopping-basket fa-2x text-brand-green-500 mr-6"></i>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-brand-green-700">Continue as a Buyer</h3>
                                <p className="text-gray-600">Access the marketplace to buy products.</p>
                            </div>
                        </button>
                        <button onClick={() => setSelectedUserType('seller')} className="w-full flex items-center justify-center text-left p-6 border-2 border-gray-200 rounded-lg hover:border-brand-green-500 hover:bg-green-50 transition group">
                            <i className="fas fa-store fa-2x text-brand-green-500 mr-6"></i>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-brand-green-700">Continue as a Seller</h3>
                                <p className="text-gray-600">Manage your store and products.</p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        );
    }


    return (
        <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in-up">
                <button onClick={() => setSelectedUserType(null)} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i>Back to selection
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back, {selectedUserType === 'buyer' ? 'Buyer' : 'Seller'}!</h2>
                    <p className="mt-2 text-md text-gray-600">Sign in to access your account.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" id="login-email" name="email" placeholder="you@example.com" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="login-password" name="password" placeholder="Enter your password" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-green-600 focus:ring-brand-green-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>
                        <div className="text-sm"><a href="#" className="font-medium text-brand-green-600 hover:text-brand-green-500">Forgot your password?</a></div>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-brand-green-600 text-white py-3 px-4 rounded-lg hover:bg-brand-green-700 transition font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-brand-green-400 disabled:cursor-not-allowed" disabled={isLoading}>
                            {isLoading ? (
                                <span className="btn-loader"><i className="fas fa-spinner fa-spin mr-3"></i>Signing In...</span>
                            ) : (
                                <span className="btn-text">Sign In</span>
                            )}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        New to BazaarLink?
                        <button type="button" onClick={() => onNavigate('registration', 'buyer')} className="font-semibold text-brand-green-600 hover:text-brand-green-700 focus:outline-none ml-1">Register Now</button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;