import React from 'react';

const Loader = () => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 h-full w-full bg-black/70'>
            <div class="flex justify-center items-center h-screen">
                <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
            </div>
        </div>
    );
};

export default Loader;