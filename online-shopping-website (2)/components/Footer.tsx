import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold text-white mb-2">BazaarLink</h2>
                        <p className="text-gray-400 text-sm">Empowering Street Food Vendors</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold tracking-wide uppercase">Company</h3>
                        <ul className="mt-4 space-y-2"><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Press</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li></ul>
                    </div>
                    <div>
                        <h3 className="font-semibold tracking-wide uppercase">Support</h3>
                        <ul className="mt-4 space-y-2"><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Shipping</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Returns</a></li></ul>
                    </div>
                    <div>
                        <h3 className="font-semibold tracking-wide uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2"><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li><li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a></li></ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto px-6 text-center text-gray-500 text-sm">&copy; 2024 BazaarLink. All Rights Reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;
