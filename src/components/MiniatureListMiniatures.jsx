import { useEffect, useState } from "react";
import { useMiniatures } from "../context/MiniatureContext";
import MiniatureCardMiniatures from "./MiniatureCardMiniatures";

function MiniatureListMiniature() {

    const { miniatures, getMiniatures, loadingMiniature } = useMiniatures()

    const [filter, setFilter] = useState("added"); // Estado para el filtro y orden
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMiniatures, setFilteredMiniatures] = useState([]);

    useEffect(() => {
        getMiniatures()
    }, [])


    useEffect(() => {
        handleFilter(); // Ejecutar el filtro cada vez que cambie la opción seleccionada o los miniatures
    }, [filter, searchTerm, miniatures]);

    function handleFilter() {
        let sortedMiniatures = [...miniatures]; // Crear una copia de los miniatures


        if (searchTerm) {
            sortedMiniatures = sortedMiniatures.filter((miniature) =>
                miniature.name.toLowerCase().includes(searchTerm.toLowerCase()) // Comparar nombres en minúsculas
            );
        }

        switch (filter) {
            case "nombre":
                sortedMiniatures.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar por nombre
                break;
            case "marca":
                sortedMiniatures.sort((a, b) => a.brand.localeCompare(b.brand)); // Ordenar por marca
                break;
            case "hombre":
                sortedMiniatures = sortedMiniatures.filter((miniature) => miniature.gender.toLowerCase() === "hombre" || miniature.gender.toLowerCase() === "unisex"); // Filtrar miniatures de hombre
                break;
            case "mujer":
                sortedMiniatures = sortedMiniatures.filter((miniature) => miniature.gender.toLowerCase() === "mujer" || miniature.gender.toLowerCase() === "unisex"); // Filtrar miniatures de mujer
                break;
            case "tester":
                sortedMiniatures = sortedMiniatures.filter((miniature) => miniature.version.toLowerCase() === "tester"); // Filtrar miniatures tester
                break;
            case "sellado":
                sortedMiniatures = sortedMiniatures.filter((miniature) => miniature.version.toLowerCase() === "sellado"); // Filtrar miniatures sellados
                break;
            default:
                sortedMiniatures.reverse(); // Invierte el orden para mostrar los miniatures agregados recientemente primero
                break; // Dejar el orden original si es "added"
        }

        setFilteredMiniatures(sortedMiniatures);
    }

    function renderMiniatures() {
        if (loadingMiniature) {
            return <p>Cargando miniaturas...</p>;
        } else if (miniatures.length === 0) {
            return <p>No hay miniaturas</p>;
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
                                <option value="hombre">miniatures de hombre</option>
                                <option value="mujer">miniatures de mujer</option>
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
                                placeholder="Buscar miniature..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <section className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
                        {/* Renderizar miniatures filtrados */}
                        {filteredMiniatures.length > 0 ? (
                            filteredMiniatures.map((miniature) => (
                                <MiniatureCardMiniatures key={miniature.id} miniature={miniature} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-4">
                                No se encontraron coincidencias
                            </div>
                        )}
                    </section>
                </section>
            );
        }
    }

    return <div>
        {renderMiniatures()}
    </div>
}

export default MiniatureListMiniature;