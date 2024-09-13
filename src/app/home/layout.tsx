import { NavBar } from '@/components';
import Footer from '@/components/navigation/footer';
import React from 'react'

interface Props {
    children: React.ReactNode;
}

const HomeLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col items-center w-full">
            <NavBar /> 
            {children}
            <Footer />
        </div>
    )
};

export default HomeLayout
