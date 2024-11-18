import { useMiniatures } from "../context/MiniatureContext"
import { Link } from "react-router-dom"

function MiniatureRowDashboard({ miniature }) {

    const { deleteMiniature, displayMiniature } = useMiniatures()

    const handleDelete = () => {
        deleteMiniature(miniature.id)
    }

    const handleDisplay = () => {
        displayMiniature(miniature)
    }

    return (
        <tr className="bg-white border-b hover:bg-gray-100 text-center even:bg-gray-50">
            <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {miniature.name}
            </th>
            <td className="px-2 py-4 text-xs w-full min-w-[400px]">
                {miniature.description}
            </td>
            <td className="px-2 py-4 text-xs">
            <Link
                    to={`/${miniature.path}`}
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(`/miniaturas/${miniature.path}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="text-blue-600 hover:underline"
                >
                    {miniature.path}
                </Link>
            </td>
            <td className="px-2 py-4">
                {miniature.brand}
            </td>
            <td className="px-2 py-4">
                {miniature.concentration}
            </td>
            <td className="px-2 py-4">
                {miniature.gender}
            </td>
            <td className="px-2 py-4">
                {miniature.size} ml
            </td>
            <td className="px-2 py-4">
                {miniature.price}
            </td>
            <td className="px-2 py-4">
                <div className="grid grid-cols-3 gap-2 w-20 min-w-20 md:w-[120px] md:min-w-[120px] justify-items-center items-center h-full">
                    <img className="w-full h-full object-cover aspect-square" src={miniature.image} alt={miniature.name} />
                    <img className="aspect-square" src={miniature.imagetwo} alt={miniature.name} />
                    <img className="aspect-square" src={miniature.imagethree} alt={miniature.name} />
                </div>
            </td>
            <td className="px-2 py-4">
                <div className="flex flex-col gap-5 justify-center">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleDisplay()}>
                        Editar
                    </button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete()}>
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default MiniatureRowDashboard;