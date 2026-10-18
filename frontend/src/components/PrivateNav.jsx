import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateNav = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND}/logout`,
                {},
                { withCredentials: true }
            );

            navigate('/login', { replace: true });
        } catch (error) {
            console.error(
                'Logout failed:',
                error.response?.data || error.message
            );
        }
    }

    return (
        <div className="flex justify-between gap-2 fixed top-0 left-0 w-full h-[9vh] z-50 px-5 py-3 bg-gradient-to-r from-[#eb1616] to-[#1c1b1c] backdrop-blur-sm">

            <p className="text-white mt-1 poppins-bold text-xl">
                AI Youtube Assistant
            </p>

            <ul className="flex items-center justify-evenly gap-20 text-black poppins-light text-lg px-2">
                <NavLink
                    to="/upload"
                    className={({ isActive }) =>
                        `relative transition-all duration-300 ${
                            isActive
                                ? 'text-orange-400 poppins-bold border-2 pb-1 border-white rounded-sm px-2'
                                : 'text-black'
                        }`
                    }
                >
                    Upload
                </NavLink>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-[#FF0033] text-white cursor-pointer font-bold px-3 py-1 rounded-md active:scale-95"
                >
                    Logout
                </button>
            </ul>
        </div>
    );
};

export default PrivateNav;
