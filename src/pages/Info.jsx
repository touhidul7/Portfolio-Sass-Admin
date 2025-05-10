/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useOutletContext } from 'react-router';

const Info = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [infoData, setInfoData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { updateDashboard } = useOutletContext();

    useEffect(() => {

        axios.get(`${VITE_SERVER_API}/info`)
            .then(function (response) {
                setInfoData(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            })

    }, [VITE_SERVER_API]);
    useEffect(() => {
        /* Check info Data */

        if (infoData.length >= 0) {
            setEditId(infoData[0]?._id);
            for (const key in infoData[0]) {
                if (key in infoData[0]) setValue(key, infoData[0][key]);
            }
        }
    }, [infoData, setValue])

    const onSubmit = (data) => {
        const infoPayload = {
            name: data?.name,
            JobTitle: data?.JobTitle,
            email: data?.email,
            image: data?.image,
            phone: data?.phone,
            Description: data?.Description,
            Fiverr: data?.Fiverr,
            Facebook: data?.Facebook,
            Twitter: data?.Twitter,
            Instagram: data?.Instagram,
            Medium: data?.Medium,
            Quora: data?.Quora,
            Pinterest: data?.Pinterest,
            Github: data?.Github,
            Linkedin: data?.Linkedin,
        };

        const request = editId
            ? axios.put(`${VITE_SERVER_API}/info/${editId}`, infoPayload)
            : axios.post(`${VITE_SERVER_API}/info`, infoPayload);

        toast.promise(request, {
            loading: editId ? 'Updating info...' : 'Saving info...',
            success: editId ? 'Info updated!' : 'Info saved!',
            // error: 'Something went wrong!',
        });

        request.then(() => {
            setEditId(null);  // Clear edit state
            reset();          // Clear form           
            axios.get(`${VITE_SERVER_API}/info`).then(res => {
                setInfoData(res.data);
                updateDashboard();
            });
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

    const socialFields = [
        "Fiverr", "Facebook", "Twitter", "Instagram", "Medium",
        "Quora", "Pinterest", "Github", "Linkedin"
    ];

    return (
        <div className="p-6 space-y-6">
            {loading ? <Loader /> : (<>
                <h2 className="text-2xl font-semibold text-gray-200">Personal Information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className={classList.label}>Name</label>
                            <input type="text" id="name" {...register("name", { required: true })} className={classList.input} placeholder="Your name" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="JobTitle" className={classList.label}>Job Title</label>
                            <input type="text" id="JobTitle" {...register("JobTitle", { required: true })} className={classList.input} placeholder="Web Developer" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="image" className={classList.label}>Image Url</label>
                            <input type="text" id="image" {...register("image", { required: true })} className={classList.input} placeholder="Your Image URL" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className={classList.label}>Email</label>
                            <input type="email" id="email" {...register("email", { required: true })} className={classList.input} placeholder="you@example.com" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="phone" className={classList.label}>Phone</label>
                            <input type="tel" id="phone" {...register("phone", { required: true })} className={classList.input} placeholder="+8801XXXXXXXXX" />
                        </div>

                        {socialFields.map((field) => (
                            <div key={field} className="col-span-6 sm:col-span-3">
                                <label htmlFor={field} className={classList.label}>{field}</label>
                                <input type="url" id={field} {...register(field)} className={classList.input} placeholder={`https://${field.toLowerCase()}.com/your-profile`} />
                            </div>
                        ))}

                        <div className="col-span-6">
                            <label htmlFor="Description" className={classList.label}>Description</label>
                            <textarea id="Description" rows="6" {...register("Description", { required: true })} className={classList.textarea} placeholder="Describe yourself..." />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <div className={`${classList.label} text-transparent`}> Submit{" "}</div>
                            <button className={`${classList.button} btn`} type="submit">
                                {editId ? 'Update' : 'Submit'}
                            </button>

                        </div>
                        {editId && (
                            <div className="col-span-6 sm:col-span-3">
                                <div className={`${classList.label} text-transparent`}> Submit{" "}</div>
                                <button className={`${classList.button} btn bg-red-500`}
                                    onClick={() => {
                                        alert("Are you sure you want to delete this module?");

                                        toast.promise(
                                            axios
                                                .delete(`${VITE_SERVER_API}/info/${infoData[0]._id}`)
                                                .then(() => {
                                                    setInfoData([]);
                                                }),
                                            {
                                                loading: "Deleting...",
                                                success: "Deleted successfully!",
                                                error: "Error deleting module",
                                            }
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </>)}
        </div>
    );
};

export default Info;
