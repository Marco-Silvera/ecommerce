import { Link } from "react-router-dom";

function DecantCardDecants({ decant }) {

    const { path } = decant;

    return (
        <Link to={`/decants/${path}`} className="w-full h-full cursor-pointer group flex flex-col justify-between">
            <div className="overflow-hidden">
                <img src={decant.image} alt={decant.name} className="aspect-square object-cover object-center w-full transition-all duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-between py-2 text-start min-h-[140px] flex-1">
                <div className="flex-grow">
                    <h2 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">{decant.name}</h2>
                    <p className="uppercase text-[#666666] text-xs md:text-sm lg:text-base">{decant.brand}</p>
                    <p className="text-text-[#666666] text-xs md:text-sm italic font-light">{decant.size} ml - {decant.sizetwo} ml - {decant.sizethree} ml</p>
                </div>
                <div className="flex justify-between items-end">
                    <p className="font-medium text-sm md:text-base">S/ {decant.price}.00</p>
                    <div className="flex flex-col lg:flex-row gap-2 flex-wrap text-center self-end items-end lg:items-center">
                        {decant.gender === "Hombre" && (
                            <div className=" bg-blue-100 h-4 w-4 rounded-full"></div>
                        )}
                        {decant.gender === "Mujer" && (
                            <div className="bg-pink-100 h-4 w-4 rounded-full text-xs 2xl:text-sm"></div>
                        )}
                        {decant.gender === "Unisex" && (
                            <div className="bg-yellow-100 h-4 w-4 rounded-full text-xs 2xl:text-sm"></div>
                        )}
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default DecantCardDecants;