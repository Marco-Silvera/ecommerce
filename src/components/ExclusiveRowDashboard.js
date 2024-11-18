import { Link } from "react-router-dom"
import { useExclusives } from "../context/ExclusiveContext"

function ExclusiveRowDashboard({ exclusive }) {

    const { deleteExclusive, displayExclusive } = useExclusives()

    const handleDelete = () => {
        deleteExclusive(exclusive.id)
    }

    const handleDisplay = () => {
        displayExclusive(exclusive)
    }

    return (
        <tr className="bg-white border-b hover:bg-gray-100 text-center even:bg-gray-50">
            <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {exclusive.name}
            </th>
            <td className="px-2 py-4 text-xs w-full min-w-[400px]">
                {exclusive.description}
            </td>
            <td className="px-2 py-4 text-xs">
                <Link
                    to={`/${exclusive.path}`}
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(`/exclusivos/${exclusive.path}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="text-blue-600 hover:underline"
                >
                    {exclusive.path}
                </Link>
            </td>
            <td className="px-2 py-4">
                {exclusive.brand}
            </td>
            <td className="px-2 py-4">
                {exclusive.collection}
            </td>
            <td className="px-2 py-4">
                {exclusive.concentration}
            </td>
            <td className="px-2 py-4">
                {exclusive.version}
            </td>
            <td className="px-2 py-4">
                {exclusive.box ? <p className="font-bold">Si</p> : "No"}
            </td>
            <td className="px-2 py-4">
                {exclusive.gender}
            </td>
            <td className="px-2 py-4">
                {exclusive.size} ml
            </td>
            <td className="px-2 py-4">
                {exclusive.price}
            </td>
            <td className="px-2 py-4">
                <div className="grid grid-cols-2 gap-2 w-20 min-w-20 md:w-[120px] md:min-w-[120px] justify-items-center items-center h-full">
                    <img className="w-full h-full object-cover aspect-square" src={exclusive.image} alt={exclusive.name} />
                    <img className="aspect-square" src={exclusive.imagetwo} alt={exclusive.name} />
                    <img className="aspect-square" src={exclusive.imagethree} alt={exclusive.name} />
                    <img className="aspect-square" src={exclusive.imagefour} alt={exclusive.name} />
                </div>
            </td>
            <td className="px-2 py-4">
                <div className="flex flex-col gap-5 justify-center">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleDisplay()}>
                        Ediatr
                    </button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete()}>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ExclusiveRowDashboard;