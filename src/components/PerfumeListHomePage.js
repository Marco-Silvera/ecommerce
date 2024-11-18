import { useEffect, useState } from "react";
import { usePerfumes } from "../context/PerfumeContext";
import PerfumeCardHomePage from "./PerfumeCardHomePage";

function PerfumeListHomePage() {

    const { perfumes, getPerfumes, loading } = usePerfumes()

    const [filter, setFilter] = useState("added"); // Estado para el filtro y orden
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPerfumes, setFilteredPerfumes] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        getPerfumes()
    }, [])


    useEffect(() => {
        handleFilter(); // Ejecutar el filtro cada vez que cambie la opción seleccionada o los perfumes
    }, [filter, searchTerm, perfumes]);

    function handleFilter() {
        let sortedPerfumes = [...perfumes]; // Crear una copia de los perfumes


        if (searchTerm) {
            sortedPerfumes = sortedPerfumes.filter((perfume) =>
                perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) // Comparar nombres en minúsculas
            );
        }

        switch (filter) {
            case "nombre":
                sortedPerfumes.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar por nombre
                break;
            case "marca":
                sortedPerfumes.sort((a, b) => a.brand.localeCompare(b.brand)); // Ordenar por marca
                break;
            case "hombre":
                sortedPerfumes = sortedPerfumes.filter((perfume) => perfume.gender.toLowerCase() === "hombre" || perfume.gender.toLowerCase() === "unisex"); // Filtrar perfumes de hombre
                break;
            case "mujer":
                sortedPerfumes = sortedPerfumes.filter((perfume) => perfume.gender.toLowerCase() === "mujer" || perfume.gender.toLowerCase() === "unisex"); // Filtrar perfumes de mujer
                break;
            case "tester":
                sortedPerfumes = sortedPerfumes.filter((perfume) => perfume.version.toLowerCase() === "tester"); // Filtrar perfumes tester
                break;
            case "sellado":
                sortedPerfumes = sortedPerfumes.filter((perfume) => perfume.version.toLowerCase() === "sellado"); // Filtrar perfumes sellados
                break;
            default:
                sortedPerfumes.reverse(); // Invierte el orden para mostrar los perfumes agregados recientemente primero
                break;
        }

        setFilteredPerfumes(sortedPerfumes);
        setVisibleCount(20);
    }

    function showMorePerfumes() {
        setVisibleCount((prevVisibleCount) => prevVisibleCount + 40);
    }

    function renderPerfumes() {
        if (loading) {
            return <p>Cargando...</p>;
        } else if (perfumes.length === 0) {
            return <p>No hay perfumes</p>;
        } else {
            return (
                <section>
                    {/* Select para ordenar y filtrar */}
                    <div className="flex justify-between gap-5 flex-col sm:flex-row sm:items-center mb-4">
                        <div className="relative flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 left-2 absolute text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 4.75h13a1 1 0 01.852 1.518L12.723 12.5a1 1 0 00-.223.626V18.75a.75.75 0 01-1.5 0v-5.624a1 1 0 00-.223-.626L4.648 6.268A1 1 0 015.5 4.75z" />
                            </svg>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="p-2 pl-8 border rounded-md text-sm lg:text-base outline-none"
                            >
                                <option value="por defecto">Orden por defecto</option>
                                <option value="nombre">Ordenar por nombre</option>
                                <option value="marca">Ordenar por marca</option>
                                <option value="hombre">Perfumes de hombre</option>
                                <option value="mujer">Perfumes de mujer</option>
                                <option value="tester">Solo tester</option>
                                <option value="sellado">Solo sellados</option>
                            </select>
                        </div>
                        <div className="relative flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-2 w-5 h-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3.5a7.5 7.5 0 016.15 13.15z"
                                />
                            </svg>
                            <input
                                type="text"
                                className="p-2 pl-8 border rounded-md text-sm lg:text-base outline-none"
                                placeholder="Buscar perfume..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <section className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
                        {filteredPerfumes.slice(0, visibleCount).length > 0 ? (
                            filteredPerfumes.slice(0, visibleCount).map((perfume) => (
                                <PerfumeCardHomePage key={perfume.id} perfume={perfume} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-4">
                                No se encontraron coincidencias
                            </div>
                        )}
                    </section>
                    {visibleCount < filteredPerfumes.length && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setVisibleCount(visibleCount + 40)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Mostrar más
                            </button>
                        </div>
                    )}
                </section>
            );
        }
    }

    return <div>
        {renderPerfumes()}
    </div>
}

export default PerfumeListHomePage;