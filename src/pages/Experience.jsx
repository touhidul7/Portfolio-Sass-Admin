/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Experience = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [experienceData, setExperienceData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const updateData = () => {
        axios.get(`${VITE_SERVER_API}/experience`)
            .then(res => setExperienceData(res.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        axios.get(`${VITE_SERVER_API}/experience`)
            .then(function (response) {
                setExperienceData(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            })

    }, [VITE_SERVER_API]);


    const onSubmit = (data) => {
        const experiencePayload = {
            jobTitle: data?.jobTitle,
            location: data?.location,
            companyName: data?.companyName,
            description: data?.description,
            range: data?.range,
            url: data?.url,
        };

        const request = editId
            ? axios.put(`${VITE_SERVER_API}/experience/${editId}`, experiencePayload)
            : axios.post(`${VITE_SERVER_API}/experience`, experiencePayload);

        toast.promise(request, {
            loading: editId ? 'Updating info...' : 'Saving info...',
            success: editId ? 'Experience updated!' : 'Experience saved!',
            // error: 'Something went wrong!',
        });

        request.then(() => {
            setEditId(null);  // Clear edit state
            reset();          // Clear form
            axios.get(`${VITE_SERVER_API}/experience`).then(res => setExperienceData(res.data));
        }).catch((error) => {
            console.error(error);
        });
    };




    const classList = {
        "label": "text-sm font-medium text-gray-200 block mb-2",
        "input": "shadow-sm bg-gray-800 border border-gray-700 text-gray-200 sm:text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5",
        "button": "shadow-sm bg-blue-800 border border-gray-700 text-gray-200 sm:text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5",
        "textarea": "bg-gray-800 border border-gray-700 text-gray-200 sm:text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-4",
    };


    return (
        <div className="p-6 space-y-6">
            {loading ? <Loader /> : (
                <>
                    <h2 className="text-2xl font-semibold text-gray-200">Work Experience</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="companyName" className={classList.label}>Company Name</label>
                                <input type="text" id="companyName" {...register("companyName", { required: true })} className={classList.input} placeholder="Company name" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="jobTitle" className={classList.label}>Job Title</label>
                                <input type="text" id="jobTitle" {...register("jobTitle", { required: true })} className={classList.input} placeholder="Web Developer" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="location" className={classList.label}>Job Location</label>
                                <input type="text" id="location" {...register("location", { required: true })} className={classList.input} placeholder="Location" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="range" className={classList.label}>Job Range</label>
                                <input type="text" id="range" {...register("range", { required: true })} className={classList.input} placeholder="Start year - End year" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="url" className={classList.label}>Company Website</label>
                                <input type="url" id="url" {...register("url", { required: true })} className={classList.input} placeholder="https://companywebsite.com" />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="description" className={classList.label}>Description</label>
                                <textarea id="description" rows="6" {...register("description", { required: true })} className={classList.textarea} placeholder="Describe your job..." />
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
                        {experienceData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Company Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Job Title</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Location</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Range</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">URL</th>
                                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Description</th> */}
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                                        {experienceData.map((item) => (
                                            <tr key={item._id} onClick={() => {
                                                setEditId(item._id);
                                                for (const key in item) {
                                                    if (key in item) setValue(key, item[key]);
                                                }
                                            }}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.companyName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.jobTitle}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.range}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.url}</td>
                                                {/* <td className="px-6 py-4 whitespace-nowrap">{item.description}</td> */}
                                                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                                    <button className='btn' onClick={() => {
                                                        setEditId(item._id);
                                                        for (const key in item) {
                                                            if (key in item) setValue(key, item[key]);
                                                        }
                                                    }}>Edit</button>
                                                    <button className='btn bg-red-500'
                                                        onClick={() => {
                                                            alert("Are you sure you want to delete this module?");

                                                            toast.promise(
                                                                axios
                                                                    .delete(`${VITE_SERVER_API}/experience/${item._id}`)
                                                                    .then(() => {
                                                                        updateData();
                                                                    }),
                                                                {
                                                                    loading: "Deleting...",
                                                                    success: "Deleted successfully!",
                                                                    error: "Error deleting module",
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
                            <p>No experience data available.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Experience;
