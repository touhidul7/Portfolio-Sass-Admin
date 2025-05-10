import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Loader from '../components/Loader';
import axios from 'axios';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [infoData, setInfoData] = useState([]);
    const [loading, setLoading] = useState(true);


    const updateDashboard = () => {
        axios.get(`${VITE_SERVER_API}/info`)
            .then(res => setInfoData(res.data[0]))
            .catch(error => console.error(error));
    };


    useEffect(() => {
        axios.get(`${VITE_SERVER_API}/info`)
            .then(function (response) {
                setInfoData(response.data[0]);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            })

    }, [VITE_SERVER_API]);
    
    return (
        <div className='flex flex-col justify-between h-full min-h-screen'>
            {loading ? <Loader /> : <>
                <div className='flex'>
                    <Toaster position="top-center" reverseOrder={false} />

                    <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} infoData={infoData} />
                    <div className='flex flex-col w-full relative' >
                        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} infoData={infoData} />
                        <div className='w-full lg:px-6'>
                            <Outlet context={{ updateDashboard }} />
                        </div>
                    </div>
                </div>
                <Footer />
            </>}
        </div>
    );
};

export default MainLayout;