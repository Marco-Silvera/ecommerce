import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session); // Cambia el estado si el usuario está logueado
        };

        window.addEventListener("scroll", handleScroll);
        checkUser();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function openMenu() {
        let menu = document.getElementById("menu");
        let menuIcon = document.getElementById("menu-icon");
        let closeIcon = document.getElementById("close-icon");
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
            menuIcon.classList.add("hidden");
            closeIcon.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
            menuIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
        }
    }

    return (
        <header className={`bg-white h-[70px] w-full sticky z-[100] top-0 transition-all flex items-center ${isScrolled ? "shadow-lg" : ""}`}>
            <div
                className="max-w-[1500px] w-full mx-auto flex justify-between items-center gap-5 md:gap-10 px-5"
            >
                <Link to={`/`} className="hidden sm:block">
                    <img
                        className="h-[50px] hidden sm:block"
                        src="https://dx23yqi1tewca.cloudfront.net/images/poiLogo/fc88679b-5c1f-4918-8e90-9b053f091b53.jpg"
                        alt="Logo"
                    />
                </Link>
                <Link to={`/`} className="block sm:hidden">
                    <img
                        className="block h-10 sm:hidden"
                        src="https://pbs.twimg.com/profile_images/1533454803/isotipo_400x400.jpg"
                        alt="Logo"
                    />
                </Link>
                <div className="flex items-center gap-5 md:gap-10">
                    <div
                        id="menu"
                        className="hidden xl:block absolute xl:top-0 right-0 xl:relative top-[70px] bg-white w-full sm:w-96 xl:w-auto"
                    >
                        <ul className="gap-none xl:gap-10 flex flex-col items-center xl:flex-row">
                            <li
                                className="hover:bg-gray-200 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto"
                            >
                                <Link
                                    to={`/`}
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center">Inicio</Link>
                            </li>
                            <li
                                className="hover:bg-gray-200 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto"
                            >
                                <Link
                                    to={`/exclusivos`}
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center">Exclusivos</Link>
                            </li>
                            <li
                                className="hover:bg-gray-200 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto"
                            >
                                <Link
                                    to={`/miniaturas`}
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center">Miniaturas</Link>
                            </li>
                            <li
                                className="hover:bg-gray-200 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto"
                            >
                                <Link
                                    to={`/decants`}
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center">Decants</Link>
                            </li>
                            <li
                                className="hover:bg-gray-200 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto"
                            >
                                <Link
                                    to={`/testers`}
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center">¿Qué es un perfume tester?</Link>
                            </li>
                            <li
                                className="hover:bg-gray-200 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto"
                            >
                                <Link
                                    to={`/envios`}
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center">Envíos</Link>
                            </li>
                            <li
                                className="hover:bg-gray-200 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto"
                            >
                                <Link
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline h-full w-ful flex items-center justify-center"
                                    to={isLoggedIn ? "/dashboard" : "/login"}>
                                    {isLoggedIn ? "Dashboard" : "Login"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <svg
                        id="menu-icon"
                        className="w-8 h-8 block xl:hidden cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={openMenu}
                    >
                        <path
                            id="icon-path"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>


                    <svg
                        id="close-icon"
                        className="w-8 h-8 hidden xl:hidden cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={openMenu}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
            </div>
        </header>
    )
}

export default Header