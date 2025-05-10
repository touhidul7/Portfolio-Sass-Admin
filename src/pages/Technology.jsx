/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Technology = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [technologyData, setTechnologyData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateData = () => {
        axios.get(`${VITE_SERVER_API}/technology`)
            .then(res => setTechnologyData(res.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        axios.get(`${VITE_SERVER_API}/technology`)
            .then(function (response) {
                setTechnologyData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            })

    }, [VITE_SERVER_API]);


    console.log(technologyData);


    const onSubmit = (data) => {
        const technologyPayload = {
            name: data?.name,
            skillLevel: data?.skillLevel,
        };

        const request = editId
            ? axios.put(`${VITE_SERVER_API}/technology/${editId}`, technologyPayload)
            : axios.post(`${VITE_SERVER_API}/technology`, technologyPayload);

        toast.promise(request, {
            loading: editId ? 'Updating project...' : 'Saving project...',
            success: editId ? 'Project updated!' : 'Project saved!',
            error: 'Something went wrong!',
        });

        request.then(() => {
            setEditId(null);  // Clear edit state
            reset();          // Clear form
            axios.get(`${VITE_SERVER_API}/technology`).then(res => setTechnologyData(res.data));
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
            {loading ? <Loader /> : <>
                <h2 className="text-2xl font-semibold text-gray-200">Technologies</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className={classList.label}>Technology</label>
                            <input type="text" id="name" {...register("name", { required: true })} className={classList.input} placeholder="Technology (HTML)" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="skillLevel" className={classList.label}>Skill Level (OUt of 100)</label>
                            <input type="text" id="skillLevel" {...register("skillLevel", { required: true })} className={classList.input} placeholder="10" />
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
                    {technologyData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Technology</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Technology Level</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {technologyData.map((item) => (
                                        <tr key={item._id} onClick={() => {
                                            setEditId(item._id);
                                            for (const key in item) {
                                                if (key in item) setValue(key, item[key]);
                                            }
                                        }}>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.skillLevel}</td>

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
                                                        alert("Are you sure you want to delete this skill?");

                                                        toast.promise(
                                                            axios
                                                                .delete(`${VITE_SERVER_API}/technology/${item._id}`)
                                                                .then(() => {
                                                                    updateData();
                                                                }),
                                                            {
                                                                loading: "Deleting...",
                                                                success: "Deleted successfully!",
                                                                error: "Error deleting skill",
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
                        <p>No project data available.</p>
                    )}
                </div>
            </>}
        </div>
    );
};

export default Technology;
