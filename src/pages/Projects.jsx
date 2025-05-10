/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Projects = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [projectData, setProjectData] = useState([]);
    const [editId, setEditId] = useState(null);

    const updateData = () => {
        axios.get(`${VITE_SERVER_API}/project`)
            .then(res => setProjectData(res.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        axios.get(`${VITE_SERVER_API}/project`)
            .then(function (response) {
                setProjectData(response.data);



                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })


    }, [VITE_SERVER_API]);


    console.log(projectData);


    const onSubmit = (data) => {
        const experiencePayload = {
            projectName: data?.projectName,
            shortname: data?.shortname,
            companyName: data?.companyName,
            description: data?.description,
            technologies: data?.technologies,
            imageLink: data?.imageLink,
            projectURL: data?.projectURL,
        };

        const request = editId
            ? axios.put(`${VITE_SERVER_API}/project/${editId}`, experiencePayload)
            : axios.post(`${VITE_SERVER_API}/project`, experiencePayload);

        toast.promise(request, {
            loading: editId ? 'Updating project...' : 'Saving project...',
            success: editId ? 'Project updated!' : 'Project saved!',
            error: 'Something went wrong!',
        });

        request.then(() => {
            setEditId(null);  // Clear edit state
            reset();          // Clear form
            axios.get(`${VITE_SERVER_API}/project`).then(res => setProjectData(res.data));
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
            <h2 className="text-2xl font-semibold text-gray-200">Projects</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="projectName" className={classList.label}>Project Name</label>
                        <input type="text" id="projectName" {...register("projectName", { required: true })} className={classList.input} placeholder="Project name" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="shortname" className={classList.label}>Short Name</label>
                        <input type="text" id="shortname" {...register("shortname", { required: true })} className={classList.input} placeholder="Short name" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="technologies" className={classList.label}>Project Technologies</label>
                        <input type="text" id="technologies" {...register("technologies", { required: true })} className={classList.input} placeholder="HTML, Css" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="imageLink" className={classList.label}>Project Image Url</label>
                        <input type="url" id="imageLink" {...register("imageLink", { required: true })} className={classList.input} placeholder="Image url" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="projectURL" className={classList.label}>Project Url</label>
                        <input type="url" id="projectURL" {...register("projectURL", { required: true })} className={classList.input} placeholder="https://project.com" />
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
                {projectData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Project Image</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Project Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Short Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Technologies</th>

                                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Description</th> */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {projectData.map((item) => (
                                    <tr key={item._id} onClick={() => {
                                        setEditId(item._id);
                                        for (const key in item) {
                                            if (key in item) setValue(key, item[key]);
                                        }
                                    }}>
                                        <td className="px-6 py-4 whitespace-nowrap"><img className='w-10 h-10' src={item.imageLink} alt={item.projectName} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.projectName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.shortname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.technologies}</td>

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
                                                            .delete(`${VITE_SERVER_API}/project/${item._id}`)
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
                    <p>No project data available.</p>
                )}
            </div>
        </div>
    );
};

export default Projects;
