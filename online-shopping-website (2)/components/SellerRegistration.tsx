import React, { useState, useRef } from 'react';
import { View } from '../types';

// Reusable File Upload Component
const FileUploadInput: React.FC<{
    label: string;
    onFileSelect: (file: File) => void;
    file: { url: string; isImage: boolean; file: File } | null;
    onRemoveFile: () => void;
    accept?: string;
    required?: boolean;
}> = ({ label, onFileSelect, file, onRemoveFile, accept = "image/*", required = false }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
        e.target.value = ""; // Allow re-selecting the same file
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-gray-700">{label}{required && <span className="text-red-500">*</span>}</label>
            {file ? (
                <div className="w-32 h-32 relative group">
                    {file.isImage ? (
                        <img src={file.url} className="w-full h-full object-cover rounded-lg border border-gray-200" alt="Preview"/>
                    ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2 border border-gray-200">
                             <i className="fas fa-file-alt fa-2x text-gray-400"></i>
                             <p className="text-xs text-gray-500 mt-2 text-center break-words">{file.file.name}</p>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={onRemoveFile}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label={`Remove ${label}`}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            ) : (
                <div
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-green-400 bg-gray-50 transition-colors"
                    onClick={() => inputRef.current?.click()}
                >
                    <i className="fas fa-cloud-upload-alt text-gray-400 text-2xl"></i>
                    <p className="text-xs text-gray-500 mt-2 text-center">Click to upload</p>
                </div>
            )}
            <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" accept={accept} required={required && !file}/>
        </div>
    );
};

const SellerRegistration: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploads, setUploads] = useState<{ [key: string]: { file: File, url: string, isImage: boolean } | null }>({
        businessLogo: null,
        storefrontPhoto: null,
        businessDoc: null,
    });

    const handleFileSelect = (key: string, file: File) => {
        const isImage = file.type.startsWith('image/');
        if (uploads[key]) {
            URL.revokeObjectURL(uploads[key]!.url);
        }
        setUploads(prev => ({
            ...prev,
            [key]: { file, url: URL.createObjectURL(file), isImage }
        }));
    };

    const handleRemoveFile = (key: string) => {
        if (uploads[key]) {
            URL.revokeObjectURL(uploads[key]!.url);
            setUploads(prev => ({ ...prev, [key]: null }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`Successfully registered as a seller!`);
            onNavigate('main');
        }, 2000);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in-up">
                <button onClick={() => onNavigate('main')} className="text-brand-green-600 hover:text-brand-green-800 font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i>Back to Home
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Become a Seller</h2>
                    <p className="mt-2 text-md text-gray-600">Reach thousands of vendors directly.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    <div className="col-span-full">
                         <h3 className="text-lg font-medium text-gray-800 border-b pb-2 mb-6 text-center">Business Documents</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
                            <FileUploadInput label="Business Logo" onFileSelect={(file) => handleFileSelect('businessLogo', file)} file={uploads.businessLogo} onRemoveFile={() => handleRemoveFile('businessLogo')} required />
                            <FileUploadInput label="Storefront Photo" onFileSelect={(file) => handleFileSelect('storefrontPhoto', file)} file={uploads.storefrontPhoto} onRemoveFile={() => handleRemoveFile('storefrontPhoto')} required />
                            <FileUploadInput label="Trade License" onFileSelect={(file) => handleFileSelect('businessDoc', file)} file={uploads.businessDoc} onRemoveFile={() => handleRemoveFile('businessDoc')} accept="image/*,.pdf" required />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" id="fullName" name="fullName" placeholder="e.g., Ramesh Kumar" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required/></div>
                        <div><label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label><input type="text" id="businessName" name="businessName" placeholder="e.g., Kumar Chaat Corner" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required/></div>
                        <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" id="email" name="email" placeholder="you@example.com" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required/></div>
                        <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" id="phone" name="phone" placeholder="10-digit mobile number" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required/></div>
                        
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Business Address</label><input type="text" id="address" name="address" placeholder="Shop No, Street, City" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required/></div>
                            <div><label htmlFor="gst" className="block text-sm font-medium text-gray-700 mb-1">GST Number (optional)</label><input type="text" id="gst" name="gst" placeholder="Your GSTIN" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition"/></div>
                        </div>
                        
                        <div><label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" id="password" name="password" placeholder="Create a strong password" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required/></div>
                        <div><label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label><input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter password" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-green-500 transition" required/></div>
                    </div>
                    
                    <div className="col-span-full">
                        <button type="submit" className="w-full bg-brand-green-600 text-white py-3 px-4 rounded-lg hover:bg-brand-green-700 transition font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-brand-green-400 disabled:cursor-not-allowed" disabled={isLoading}>
                            {isLoading ? (
                                <span className="btn-loader"><i className="fas fa-spinner fa-spin mr-3"></i>Processing...</span>
                            ) : (
                                <span className="btn-text">Register as Seller</span>
                            )}
                        </button>
                    </div>
                    <div className="col-span-full text-center">
                        <p className="text-sm text-gray-600">Already have an account? 
                            <button type="button" onClick={() => onNavigate('login')} className="font-semibold text-brand-green-600 hover:text-brand-green-700 focus:outline-none ml-1">Sign In</button>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SellerRegistration;
