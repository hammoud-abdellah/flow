import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../../context';
import { useNavigate } from "react-router";
import {Avatar} from "antd";
import styled from "styled-components";


const Icons = styled.div`
    display: flex;
    justify-content: end;
    padding: 2px;
`;

function DropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {user,setUser}=useUser();
    const navigate=useNavigate();
    

    async function logout(){
        const res=await fetch("http://localhost:8080/users/logout",{
            method:'POST',
            credentials:'include'
        })
        if(res.ok){
            navigate('/login')
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  return (
    <div className="flex justify-center">
            <div className="relative inline-block" ref={dropdownRef}>
                <button
                    className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md "
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="mx-1">{user?.name}</span>
                    <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                    </svg>
                </button>
                {isOpen && (
                    <div className=" flex flex-col absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-[#3D3D3D] rounded-md shadow-xl">
                        <a href="#" className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <Icons>
                      <div>
                        <Avatar
                          src={"https://joesch.moe/api/v1/random?key=" + 1}
                        />
                      </div>
                    </Icons>
    
                            <div className="mx-1">
                                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user?.name}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                            </div>
                        </a>
                        <div className='flex flex-col'>
                            <a href="#" className=" px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                Settings
                            </a>
                            <a href="#" className=" px-4 py-3 text-sm text-white capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                Help
                            </a>
                            <button onClick={logout} className=" px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DropDown