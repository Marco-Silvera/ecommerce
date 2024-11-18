import { Link } from "react-router-dom";

function ExclusiveCardExclusives({ exclusive }) {

    const { id, name, brand, image, version, path } = exclusive;

    return (
        <Link to={`/exclusivos/${path}`} className="w-full h-full cursor-pointer group flex flex-col justify-between">
            <div className="overflow-hidden">
                <img src={exclusive.image} alt={exclusive.name} className="aspect-square object-cover object-center w-full transition-all duration-300 group-hover:scale-105 group-hover:brightness-90" />
            </div>
            <div className="flex flex-col justify-between py-2 text-start min-h-[140px] flex-1">
                <div className="flex-grow">
                    <h2 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">{exclusive.name}</h2>
                    <p className="uppercase text-[#666666] text-xs md:text-sm lg:text-base">{exclusive.brand} - {exclusive.collection}</p>
                    <p className="text-text-[#666666] text-xs md:text-sm italic font-light">{exclusive.size} ml</p>
                </div>
                <div className="flex justify-between items-end">
                    <p className="font-medium text-sm md:text-base">S/ {exclusive.price}.00</p>
                    <div className="flex flex-col lg:flex-row gap-2 text-center items-end lg:items-center">
                        {exclusive.gender === "Hombre" && (
                            <div className=" bg-blue-100 h-4 w-4 rounded-full text-xs lg:text-base"></div>
                        )}
                        {exclusive.gender === "Mujer" && (
                            <div className="bg-pink-100 h-4 w-4 rounded-full text-xs lg:text-base"></div>
                        )}
                        {exclusive.gender === "Unisex" && (
                            <div className="bg-yellow-100 h-4 w-4 rounded-full text-xs lg:text-base"></div>
                        )}
                        {exclusive.version === "Tester" && !exclusive.box && (
                            <div className=" bg-neutral-300 px-2 rounded text-xs lg:text-base">No box</div>
                        )}
                        {exclusive.version === "Tester" && (
                            <div className="bg-gray-200 px-2 rounded text-xs lg:text-base">Tester</div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ExclusiveCardExclusives;