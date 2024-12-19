import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PerfumeGallery from '../components/PerfumeGallery';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2'

function ExclusiveDetailPage() {
    const { path } = useParams();
    const [exclusive, setExclusive] = useState(null);
    const [loading, setLoading] = useState(true);
    const {addCart, isInCart} = useCart();

    useEffect(() => {
        const fetchExclusive = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('exclusives')
                    .select('*')
                    .eq('path', path)
                    .single();

                if (error) throw error;

                setExclusive(data);
            } catch (error) {
                console.error('Error fetching exclusive:', error);
                setExclusive(null); // Si hay un error, establece exclusive en null
            } finally {
                setLoading(false);
            }
        };

        fetchExclusive();
    }, [path]);

    if (loading) return <div className='h-screen flex items-center justify-center font-light italic'>Cargando...</div>;

    if (!exclusive) return <div className='h-screen flex items-center justify-center font-light italic'>Perfume exclusivo no encontrado.</div>;

    const handleAddToCart = () => {
        if (!isInCart(exclusive.id)) {
            addCart(exclusive);
            Swal.fire(`${exclusive.name} fue añadido al carrito.`);
        }
    }

    const isExclusiveInCart = isInCart(exclusive.id);

    return (
        <section className='flex flex-col min-h-screen'>
            <Header />
            <main className="flex-grow max-w-[1500px] mx-auto px-5 pt-5 pb-20 md:p-10">
                <section className='flex flex-col items-center   lg:flex-row gap-5 md:gap-10'>
                    <PerfumeGallery image={exclusive.image}
                        imagetwo={exclusive.imagetwo}
                        imagethree={exclusive.imagethree}
                        imagefour={exclusive.imagefour} />
                    <div className="w-full text-start flex flex-col gap-5">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{exclusive.name}</h1>
                        <div className='flex justify-between'>
                            <p className="text-lg md:text-xl text-gray-600 uppercase">{exclusive.brand}</p>
                            <p className="text-lg md:text-xl text-gray-600 uppercase">{exclusive.collection}</p>
                        </div>
                        <p className="text-sm lg:text-base">{exclusive.description}</p>
                        <div className='text-center flex flex-col gap-5 justify-between items-center'>
                            <div className='self-start flex gap-2'>
                                {exclusive.version === "Tester" && !exclusive.box && (
                                    <div className=" bg-neutral-300 p-2 rounded text-sm lg:text-base">No box</div>
                                )}
                                {exclusive.version === "Tester" && (
                                    <div className="bg-gray-200 p-2 rounded text-sm lg:text-base">Tester</div>
                                )}
                                {exclusive.gender === "Hombre" && (
                                    <div className=" bg-blue-100 p-2 rounded text-sm lg:text-base">Hombre</div>
                                )}
                                {exclusive.gender === "Mujer" && (
                                    <div className="bg-pink-100 p-2 rounded text-sm lg:text-base">Mujer</div>
                                )}
                                {exclusive.gender === "Unisex" && (
                                    <div className="bg-yellow-100 p-2 rounded text-sm lg:text-base">Unisex</div>
                                )}
                                <div className='bg-gray-200 p-2 rounded text-sm lg:text-base'>{exclusive.concentration}</div>
                                <div className=" bg-gray-100 p-2 rounded text-sm lg:text-base">{exclusive.size + " ml"}</div>
                            </div>
                            <div className='self-end flex flex-col gap-5'>
                                <p className="text-xl md:text-2xl lg:text-3xl font-semibold self-end">S/ {exclusive.price}.00</p>
                                {isExclusiveInCart ? (
                                    <Link
                                        to="/cart"
                                        className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Agregado al carrito
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Añadir al carrito
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className='text-center text-sm mt-5'>
                            Envíos a todo el Perú, más información <Link to={`/envios`} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>aquí.</Link>
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </section>
    );
}

export default ExclusiveDetailPage;