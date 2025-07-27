import React from 'react';
import { View, UserType } from '../types';
import BuyerRegistration from './BuyerRegistration';
import SellerRegistration from './SellerRegistration';

interface RegistrationFormProps {
    userType: UserType;
    onNavigate: (view: View, userType?: UserType) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ userType, onNavigate }) => {
    if (userType === 'seller') {
        return <SellerRegistration onNavigate={onNavigate} />;
    }
    return <BuyerRegistration onNavigate={onNavigate} />;
};

export default RegistrationForm;
