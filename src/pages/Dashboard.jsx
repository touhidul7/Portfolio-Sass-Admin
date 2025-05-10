import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTools } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdWork, MdWorkHistory } from 'react-icons/md';
import Loader from '../components/Loader';

const Dashboard = () => {
    const VITE_SERVER_API = import.meta.env.VITE_SERVER_API;
    const [experienceData, setExperienceData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [skillData, setSkillData] = useState([]);
    const [technologyData, setTechnologyData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        /* Experience------------- */
        axios.get(`${VITE_SERVER_API}/experience`)
            .then(function (response) {
                setExperienceData(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        /* Projects------------------ */
        axios.get(`${VITE_SERVER_API}/project`)
            .then(function (response) {
                setProjectData(response.data);



                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        /* Skills---------------- */
        axios.get(`${VITE_SERVER_API}/skill`)
            .then(function (response) {
                setSkillData(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        /* Technology------------ */
        axios.get(`${VITE_SERVER_API}/technology`)
            .then(function (response) {
                setTechnologyData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false);
            })

    }, [VITE_SERVER_API]);
    return (
        <div className='p-6 space-y-6'>
            {loading ? <Loader /> : (

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='border border-gray-500 flex flex-col gap-4 rounded-lg p-6'>
                        <div className="title text-md font-bold flex gap-2 items-center"><MdWork />Total Experience</div>
                        <div className="data">{experienceData?.length}</div>
                    </div>
                    <div className='border border-gray-500 flex flex-col gap-4 rounded-lg p-6'>
                        <div className="title text-md font-bold flex gap-2 items-center"> <MdWorkHistory />Total Projects</div>
                        <div className="data">{projectData?.length}</div>
                    </div>
                    <div className='border border-gray-500 flex flex-col gap-4 rounded-lg p-6'>
                        <div className="title text-md font-bold flex gap-2 items-center"><GiSkills />Total Skills</div>
                        <div className="data">{skillData.length}</div>
                    </div>
                    <div className='border border-gray-500 flex flex-col gap-4 rounded-lg p-6'>
                        <div className="title text-md font-bold flex gap-2 items-center"><FaTools />Total Technologies</div>
                        <div className="data">{technologyData.length}</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Dashboard;