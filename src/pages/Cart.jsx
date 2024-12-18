import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = []
        }
        acc[item.type].push(item)
        return acc
    }, {})

    const sendToWhatsApp = () => {
        if (cartItems.length === 0) return;

        let message = "Hola, ¿qué tal?\nEstoy interesado en los siguientes productos:\n\n";

        // Generar mensaje agrupado por tipo
        Object.keys(groupedItems).forEach((type) => {
            message += `${type === "decant" ? "Decants"
                    : type === "exclusive" ? "Exclusivos"
                        : type === "miniature" ? "Miniaturas"
                            : "Perfumes"
                }:\n`;

            groupedItems[type].forEach((item) => {
                let baseUrl =""

                if (type === "decant") {
                    baseUrl = "https://tienda-perfumes.vercel.app/decants/";
                } else if (type === "exclusive") {
                    baseUrl = "https://tienda-perfumes.vercel.app/exclusivos/";
                } else if (type === "miniature") {
                    baseUrl = "https://tienda-perfumes.vercel.app/miniaturas/";
                } else if (type === "perfume") {
                    // Determinar si es Tester o Sellado
                    baseUrl = item.version === "Tester" ?
                        "https://tienda-perfumes.vercel.app/tester/" :
                        "https://tienda-perfumes.vercel.app/";
                }

                // type === "decant" ? "https://tienda-perfumes.vercel.app/decants/" :
                // type === "exclusive" ? "https://tienda-perfumes.vercel.app/exclusivos/" :
                // type === "miniature" ? "https://tienda-perfumes.vercel.app/miniaturas/" :
                // "https://tienda-perfumes.vercel.app/perfumes/";

                const productUrl = `${baseUrl}${item.path}`;

                message += `- ${item.name}  [${item.gender}${type === "perfume" ? ` - ${item.version}` : ""}] de (${item.size} ml) - S/${item.price}\n (${productUrl})\n`;
            });
            // message += "\n";
        });

        // Codificar el mensaje para la URL de WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/51948185895?text=${encodedMessage}`; // Cambia xxxxxxxxxx por tu número de WhatsApp.

        // Abrir WhatsApp
        window.open(whatsappURL, "_blank");

        // Vaciar el carrito después de enviar
        clearCart();
    };

    if (cartItems.length === 0) {
        return (
            <section className="flex flex-col min-h-screen">
                <Header />
                <div className="p-5 text-center flex-1 flex justify-center items-center text-xs md:text-2xl">El carrito esta vacío</div>
                <Footer />
            </section>)
    }

    return (
        <section className="flex flex-col min-h-screen">
            <Header />
            <section className="max-w-[1000px] w-full self-center mt-10 p-5 flex-1">
                <h2 className="text-2xl font-bold mb-5 text-center underline">Carrito de Compras</h2>
                {Object.keys(groupedItems).map((type) => (

                    <div key={type} className="mb-5">
                        <h3 className="text-xl font-semibold mb-3">
                            {
                                type === "decant" ? "Decants"
                                    : type === "exclusive" ? "Exclusivos"
                                        : type === "miniature" ? "Miniaturas"
                                            : "Perfumes"
                            }
                        </h3>
                        <section className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 table-fixed rtl:text-right">
                                <thead className="text-xs text-gray-700 uppercase">
                                    <th className="text-start px-6 py-3">Nombre</th>
                                    <th className="text-start px-6 py-3"></th>
                                    <th className="text-start px-6 py-3">Tamaño</th>
                                    <th className="text-start px-6 py-3">Precio</th>
                                </thead>
                                <tbody>
                                    {groupedItems[type].map((item) => {
                                        let path = "";
                                        if (type === "perfume") {
                                            path = item.version === "Tester" ? `/tester/${item.path}` : `/${item.path}`;
                                        } else if (type === "exclusive") {
                                            path = `/exclusivos/${item.path}`;
                                        } else if (type === "decant") {
                                            path = `/decants/${item.path}`;
                                        } else if (type === "miniature") {
                                            path = `/miniaturas/${item.path}`;
                                        }

                                        return (
                                            <tr key={item.id} className="border-b">
                                                <td className="px-6 py-4">
                                                    <a className="hover:text-gray-700" href={path} target="_blank">{item.name}</a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a href={path} target="_blank">
                                                        <img
                                                            className="h-20"
                                                            src={item.image}
                                                            alt={`Perfume ${item.type} - ${item.name}`}
                                                        />
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4">{item.size} ml</td>
                                                <td className="px-6 py-4">{item.price}</td>
                                                <td className=" px-6 py-4 w-[100px]">
                                                    <div className="flex justify-end items-center h-full">
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-600 font-semibold hover:underline rounded"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {/* {groupedItems[type].map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="px-6 py-4"><a href={item.path}>{item.name}</a></td>
                                        <td className="px-6 py-4"><img className="h-20" src={item.image} alt={`Perfume ${item.type} - ${item.name}`} /></td>
                                        <td className="px-6 py-4">{item.size}</td>
                                        <td className="px-6 py-4">{item.price}</td>
                                        <td className="h-full place-self-end items-center px-6 py-4">
                                        <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 font-semibold hover:underline rounded"
                                        >Eliminar</button>
                                        </td>
                                        </tr>
                                        ))} */}
                                </tbody>
                            </table>
                        </section>
                        {/* <table className="w-full table-fixed">
                            <thead>
                                <th className="text-start">Nombre</th>
                                <th className="text-start">Tamaño</th>
                                <th className="text-start">Precio</th>
                                </thead>
                                <tbody className="w-full max-w-[1460px]">
                                {groupedItems[type].map((item) => (
                                    <tr key={item.id} className="mb-3">
                                        <td>{item.name}</td>
                                        <td>{item.size}</td>
                                        <td>{item.price}</td>
                                        <td className="flex place-self-end">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                                            >Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                    </div>
                ))}
                <div className="flex justify-between mt-5">
                    <button
                        onClick={clearCart}
                        className="bg-gray-600 text-white py-2 px-5 rounded hover:bg-gray-700"
                    >
                        Vaciar Carrito
                    </button>
                    <button
                        onClick={sendToWhatsApp}
                        className="bg-green-500 text-white py-2 px-5 rounded hover:bg-green-600"
                    >
                        Enviar a WhatsApp
                    </button>
                </div>
            </section>
            <Footer />
        </section>
    );
}

export default Cart;