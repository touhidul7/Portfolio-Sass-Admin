import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className='flex flex-col justify-between h-full min-h-screen'>
        <div className='flex'>
            <Toaster position="top-center" reverseOrder={false} />

            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className='flex flex-col w-full relative' >
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <div className='w-full lg:px-6'>
                    <Outlet />
                    
                </div>
                
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default MainLayout;