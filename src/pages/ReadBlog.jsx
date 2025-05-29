import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Loader from '../components/Loader';
import { useParams } from 'react-router';

const ReadBlog = () => {
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { title } = useParams();

    useEffect(() => {
        axios.get(`${VITE_SERVER_API}/blogs`)
            .then(function (response) {
                setBlogData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            })


    }, [VITE_SERVER_API]);


    const blog = blogData.find(blog => blog.title === decodeURIComponent(title));

    return (
        <div className="p-6 space-y-6">
            {loading ? <Loader /> : <>
                <h2 className="text-2xl font-semibold text-gray-200">{blog.title}</h2>
                <img className='h-52 w-auto' src={blog.imageLink} alt={blog.title} />
                <h2 className="text-2xl font-semibold text-gray-200">{blog.shortTitle}</h2>
                <div>
                    <div
                        className="text-gray-200 space-y-4"
                        dangerouslySetInnerHTML={{ __html: blog.blogContent }}
                    />

                </div>


            </>}
        </div>
    );
};

export default ReadBlog;
