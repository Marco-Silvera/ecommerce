import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCart();

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
            <section className="max-w-[1500px] w-full self-center mt-10 p-5 flex-1">
                <h2 className="text-2xl font-bold mb-5">Carrito de Compras</h2>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center mb-3">
                            <span>{item.name}</span>
                            <span>{item.size}</span>
                            <span>{item.price}</span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={clearCart} className="bg-gray-600 text-white py-2 px-5 mt-5 rounded hover:bg-gray-700">
                    Vaciar Carrito
                </button>
            </section>
            <Footer />
        </section>
    );
}

export default Cart;