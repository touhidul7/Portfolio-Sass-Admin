/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaAngleUp, FaTools } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { MdDashboard, MdMenuOpen, MdWork, MdWorkHistory } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { GiSkills } from 'react-icons/gi';
import { IoIosCloseCircle } from 'react-icons/io';
import toast from 'react-hot-toast';
const Sidebar = ({ isSidebarOpen, toggleSidebar, infoData }) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()

  const routes = [
    {
      title: 'Dashboard',
      link: '/',
      icon: <MdDashboard />
    },
    {
      title: 'Info',
      link: '/info',
      icon: <FaInfoCircle />
    },
    {
      title: 'Experience',
      link: '/experience',
      icon: <MdWork />
    },
    {
      title: 'Projects',
      link: '/projects',
      icon: <MdWorkHistory />
    },
    {
      title: 'Skills',
      link: '/skills',
      icon: <GiSkills />
    },
    {
      title: 'Technologies',
      link: '/technology',
      icon: <FaTools />
    }
  ]
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className={`md:w-[350px] fixed lg:relative z-50 w-[250px] ${isSidebarOpen ? '' : 'hidden'}`}>

        <div
          className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[240px] md:w-[300px] overflow-y-auto text-center bg-gray-900 `}
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center justify-between">
              <h1 className="font-bold text-blue-500 text-[15px] ml-3">{infoData?.name}</h1>
              <div className="lg:hidden block " onClick={toggleSidebar}>
                <div className="btn btn-ghost btn-circle text-gray-200 border">
                  <IoIosCloseCircle size={30} />

                </div>
              </div>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>


          {routes.map((route, index) => (
            <Link to={route.link} key={index} className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
              <span>{route.icon}</span>
              <span className="text-[15px] ml-4 text-gray-200 font-bold">{route.title}</span>
            </Link>
          ))}




          <div className="my-4 bg-gray-600 h-[1px]"></div>

          {/* <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
              <span className={`text-sm ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`}>
                <FaAngleUp />

              </span>
            </div>
          </div>

          <div
            className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${isDropdownOpen ? '' : 'hidden'}`}
          >
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Social
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Personal
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
              Friends
            </h1>
          </div> */}

          <div onClick={() => { localStorage.removeItem('user'); navigate("/login"); toast.success("Logout Success") }} className=" p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <IoLogOutOutline />
            <button className="text-[15px] cursor-pointer ml-4 text-gray-200 font-bold">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;