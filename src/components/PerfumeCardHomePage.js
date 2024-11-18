import { Link } from "react-router-dom";

function PerfumeCardHomePage({ perfume }) {

    const { version, path } = perfume;

    return (
        <Link to={version.toLowerCase() === 'tester' ? `/tester/${path}` : `/${path}`} className="w-full h-full cursor-pointer group flex flex-col justify-between">
            <div className="overflow-hidden">
                <img src={perfume.image} alt={perfume.name} loading="lazy" className="aspect-square object-cover object-center w-full transition-all duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-between py-2 text-start min-h-[140px] flex-1">
                <div className="flex-grow">
                    <h2 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">{perfume.name}</h2>
                    <p className="uppercase text-[#666666] text-xs md:text-sm lg:text-base">{perfume.brand}</p>
                    <p className="text-text-[#666666] text-xs md:text-sm italic font-light">{perfume.size} ml</p>
                </div>
                <div className="flex justify-between items-end lg:items-center">
                    <p className="font-medium text-sm md:text-base">S/ {perfume.price}.00</p>
                    <div className="flex flex-col lg:flex-row gap-2 flex-wrap text-center self-end items-end lg:items-center">
                        {perfume.gender === "Hombre" && (
                            <div className=" bg-blue-100 h-4 w-4 rounded-full"></div>
                        )}
                        {perfume.gender === "Mujer" && (
                            <div className="bg-pink-100 h-4 w-4 rounded-full text-xs 2xl:text-sm"></div>
                        )}
                        {perfume.gender === "Unisex" && (
                            <div className="bg-yellow-100 h-4 w-4 rounded-full text-xs 2xl:text-sm"></div>
                        )}
                        <div className="flex flex-col lg:flex-row gap-2">

                            {perfume.version === "Tester" && !perfume.box && (
                                <div className=" bg-neutral-300 px-2 rounded text-xs 2xl:text-sm">No box</div>
                            )}
                            {perfume.version === "Tester" && (
                                <div className="bg-gray-200 px-2 rounded text-xs 2xl:text-sm">Tester</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PerfumeCardHomePage;