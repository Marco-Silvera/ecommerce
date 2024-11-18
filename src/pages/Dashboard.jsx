import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PerfumeForm from "../components/PerfumeForm";
import PerfumeFormEdit from "../components/PerfumeFormEdit";
import PerfumeTable from "../components/PerfumeTable";

import ExclusiveForm from "../components/ExclusiveForm";
import ExclusiveFormEdit from "../components/ExclusiveFormEdit";
import ExclusiveTable from "../components/ExclusiveTable";

import DecantForm from "../components/DecantForm";
import DecantFormEdit from "../components/DecantFormEdit";
import DecantTable from "../components/DecantTable";

import MiniatureForm from "../components/MiniatureForm";
import MiniatureFormEdit from "../components/MiniatureFormEdit";
import MiniatureTable from "../components/MiniatureTable";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Dashboard() {

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("perfume");

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate('/login');
            }
        };

        checkUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const renderContent = () => {
        switch (selectedCategory) {
            case "perfume":
                return (
                    <>
                        <PerfumeForm />
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">Edición</h2>
                        <PerfumeFormEdit />
                        <PerfumeTable />
                    </>
                );
            case "exclusivos":
                return (
                    <>
                        <ExclusiveForm />
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">Edición</h2>
                        <ExclusiveFormEdit />
                        <ExclusiveTable />
                    </>
                );
            case "decants":
                return (
                    <>
                        <DecantForm />
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">Edición</h2>
                        <DecantFormEdit />
                        <DecantTable />
                    </>
                );
            case "miniaturas":
                return (
                    <>
                        <MiniatureForm />
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">Edición</h2>
                        <MiniatureFormEdit />
                        <MiniatureTable />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <section className="flex flex-col">
            <Header />
            <section className="mx-auto w-full max-w-[1800px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-5">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">Dashboard</h2>

                {/* Select para elegir categoría */}
                <div className="flex justify-between gap-10">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 border rounded w-full max-w-[328.88px]"
                    >
                        <option value="perfume">Perfume</option>
                        <option value="exclusivos">Exclusivos</option>
                        <option value="decants">Decants</option>
                        <option value="miniaturas">Miniaturas</option>
                    </select>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 rounded-lg w-fit py-2 px-5 self-center font-bold hover:scale-95 uppercase transition-transform text-white shadow-sm hover:bg-white border hover:border-red-500 hover:text-red-500 text-sm md:text-base"
                    >
                        Cerrar sesión
                    </button>
                </div>
                {renderContent()}
            </section>
            <Footer />
        </section>
    );
}

export default Dashboard;