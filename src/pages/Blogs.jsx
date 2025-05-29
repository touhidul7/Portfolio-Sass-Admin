/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { RichTextEditor } from '@mantine/rte';
import { Link } from 'react-router';

const Blogs = () => {
    const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm();
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [blogData, setBlogData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateData = () => {
        axios.get(`${VITE_SERVER_API}/blogs`)
            .then(res => setBlogData(res.data))
            .catch(error => console.error(error));
    };

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


    const onSubmit = (data) => {
        const blogPayload = {
            title: data?.title,
            shortTitle: data?.shortTitle,
            catogory: data?.catogory,
            blogContent: data?.blogContent,
            imageLink: data?.imageLink,
            extra: data?.extra,
        };

        const request = editId
            ? axios.put(`${VITE_SERVER_API}/blogs/${editId}`, blogPayload)
            : axios.post(`${VITE_SERVER_API}/blogs`, blogPayload);

        toast.promise(request, {
            loading: editId ? 'Updating blog...' : 'Saving blog...',
            success: editId ? 'Blog updated!' : 'Blog saved!',
            error: 'Something went wrong!',
        });

        request.then(() => {
            setEditId(null);  // Clear edit state
            reset();          // Clear form
            axios.get(`${VITE_SERVER_API}/blogs`).then(res => setBlogData(res.data));
        }).catch((error) => {
            console.error(error);
        });
    };




    const classList = {
        "label": "text-sm font-medium text-gray-200 block mb-2",
        "input": "shadow-sm bg-gray-800 border border-gray-700 text-gray-200 sm:text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5",
        "button": "shadow-sm bg-blue-800 border border-gray-700 text-gray-200 sm:text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5",
        "textarea": "bg-gray-800 border border-gray-700 text-gray-200 sm:text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-4",
        "th": "px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
    };


    return (
        <div className="p-6 space-y-6">
            {loading ? <Loader /> : <>
                <h2 className="text-2xl font-semibold text-gray-200">Blogs</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="title" className={classList.label}>Project Name</label>
                            <input type="text" id="title" {...register("title", { required: true })} className={classList.input} placeholder="Blog Title" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="shortTitle" className={classList.label}>Short Name</label>
                            <input type="text" id="shortTitle" {...register("shortTitle", { required: true })} className={classList.input} placeholder="Short Title" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="catogory" className={classList.label}>Blog Category</label>
                            <input type="text" id="catogory" {...register("catogory", { required: true })} className={classList.input} placeholder="Marketplace, SEO" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="imageLink" className={classList.label}>Blog Image</label>
                            <input type="url" id="imageLink" {...register("imageLink", { required: true })} className={classList.input} placeholder="Blog Image" />
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <label htmlFor="extra" className={classList.label}>Status</label>
                            {/* <input type="text" id="extra" {...register("extra", { required: false })} className={classList.input} placeholder="extra" /> */}
                            <select name="extra" id="extra" {...register("extra", { required: false })} className={classList.input}>
                                <option value="">Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="blogContent" className={classList.label}>Blog Content</label>
                            {/* <textarea id="blogContent" rows="6" {...register("blogContent", { required: true })} className={classList.textarea} placeholder="Describe your Blog..." /> */}
                            <Controller
                                name="blogContent"

                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <RichTextEditor {...field} className={classList.textarea} />
                                )}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <div className={`${classList.label} text-transparent`}> Submit{" "}</div>

                            <button className={`${classList.button} btn`} type="submit">
                                {editId ? 'Update' : 'Submit'}
                            </button>

                        </div>


                    </div>
                </form>
                <div>
                    {blogData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th scope="col" className={classList.th}>Blog Image</th>
                                        <th scope="col" className={classList.th}>Blog Title</th>
                                        <th scope="col" className={classList.th}>Category</th>
                                        <th scope="col" className={classList.th}>Status</th>
                                        <th scope="col" className={classList.th}>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {blogData.map((item) => (
                                        <tr key={item._id} >
                                            <td className="px-6 py-4 whitespace-nowrap"><img className='w-10 h-10' src={item.imageLink} alt={item.title} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap"><Link to={`/blog/${item.title}`}>{item.title}</Link></td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.catogory}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap ${item.extra != "active" ? "text-red-600" : "text-green-600"}`}>{item.extra}</td>

                                            <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                                <button className='btn' onClick={() => {
                                                    setEditId(item._id);
                                                    for (const key in item) {
                                                        if (key in item) setValue(key, item[key]);
                                                    }
                                                }}>Edit</button>
                                                <button className='btn bg-red-500'
                                                    onClick={() => {
                                                        alert("Are you sure you want to delete this blog?");

                                                        toast.promise(
                                                            axios
                                                                .delete(`${VITE_SERVER_API}/blogs/${item._id}`)
                                                                .then(() => {
                                                                    updateData();
                                                                }),
                                                            {
                                                                loading: "Deleting...",
                                                                success: "Deleted successfully!",
                                                                error: "Error deleting blog!",
                                                            }
                                                        );
                                                    }}
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No blog data available.</p>
                    )}
                </div>
            </>}
        </div>
    );
};

export default Blogs;
