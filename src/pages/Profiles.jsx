/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useOutletContext } from 'react-router';

const Profiles = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [profilesData, setProfilesData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { updateDashboard } = useOutletContext();

    useEffect(() => {

        axios.get(`${VITE_SERVER_API}/profiles`)
            .then(function (response) {
                setProfilesData(response.data);
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

        if (profilesData.length >= 0) {
            setEditId(profilesData[0]?._id);
            for (const key in profilesData[0]) {
                if (key in profilesData[0]) setValue(key, profilesData[0][key]);
            }
        }
    }, [profilesData, setValue])

    const onSubmit = (data) => {
        const profilesPayload = {
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
            ? axios.put(`${VITE_SERVER_API}/profiles/${editId}`, profilesPayload)
            : axios.post(`${VITE_SERVER_API}/profiles`, profilesPayload);

        toast.promise(request, {
            loading: editId ? 'Updating profiles...' : 'Saving profiles...',
            success: editId ? 'Profiles updated!' : 'Profiles saved!',
            // error: 'Something went wrong!',
        });

        request.then(() => {
            setEditId(null);  // Clear edit state
            reset();          // Clear form           
            axios.get(`${VITE_SERVER_API}/profiles`).then(res => {
                setProfilesData(res.data);
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
                <h2 className="text-2xl font-semibold text-gray-200">Social Media Profiles</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-6">

                        {socialFields.map((field) => (
                            <div key={field} className="col-span-6 sm:col-span-3">
                                <label htmlFor={field} className={classList.label}>{field}</label>
                                <input type="url" id={field} {...register(field)} className={classList.input} placeholder={`https://${field.toLowerCase()}.com/your-profile`} />
                            </div>
                        ))}

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
                                                .delete(`${VITE_SERVER_API}/profiles/${profilesData[0]._id}`)
                                                .then(() => {
                                                    setProfilesData([]);
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

export default Profiles;
