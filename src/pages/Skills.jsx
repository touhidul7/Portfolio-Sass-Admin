/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Skills = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [skillData, setSkillData] = useState([]);
    const [editId, setEditId] = useState(null);

    const updateData = () => {
        axios.get(`${VITE_SERVER_API}/skill`)
            .then(res => setSkillData(res.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        axios.get(`${VITE_SERVER_API}/skill`)
            .then(function (response) {
                setSkillData(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, [VITE_SERVER_API]);


    console.log(skillData);


    const onSubmit = (data) => {
        const skillPayload = {
            name: data?.name,
            skillLevel: data?.skillLevel,
            description: data?.description,
        };

        const request = editId
            ? axios.put(`${VITE_SERVER_API}/skill/${editId}`, skillPayload)
            : axios.post(`${VITE_SERVER_API}/skill`, skillPayload);

        toast.promise(request, {
            loading: editId ? 'Updating project...' : 'Saving project...',
            success: editId ? 'Project updated!' : 'Project saved!',
            error: 'Something went wrong!',
        });

        request.then(() => {
            setEditId(null);  // Clear edit state
            reset();          // Clear form
            axios.get(`${VITE_SERVER_API}/skill`).then(res => setSkillData(res.data));
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
            <h2 className="text-2xl font-semibold text-gray-200">Skills</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name" className={classList.label}>Skill</label>
                        <input type="text" id="name" {...register("name", { required: true })} className={classList.input} placeholder="Skill (Web Development)" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="skillLevel" className={classList.label}>Skill Level (OUt of 100)</label>
                        <input type="text" id="skillLevel" {...register("skillLevel", { required: true })} className={classList.input} placeholder="10" />
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
                {skillData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Skill</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Skill Level</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {skillData.map((item) => (
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
                                                            .delete(`${VITE_SERVER_API}/skill/${item._id}`)
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
        </div>
    );
};

export default Skills;
