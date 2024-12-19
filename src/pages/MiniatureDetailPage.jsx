import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MiniatureGallery from '../components/MiniatureGallery';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2'

function PerfumeDetailPage() {
    const { path } = useParams();
    const [miniature, setMiniature] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addCart, isInCart } = useCart();

    useEffect(() => {
        const fetchMiniature = async () => {
            setLoading(true); // Inicia la carga cuando cambia el path
            try {
                const { data, error } = await supabase
                    .from('miniatures')
                    .select('*')
                    .eq('path', path)
                    .single();

                if (error) throw error;

                setMiniature(data);
            } catch (error) {
                console.error('Error fetching miniature:', error);
                setMiniature(null); // Si hay un error, establece miniature en null
            } finally {
                setLoading(false);
            }
        };

        fetchMiniature();
    }, [path]);

    if (loading) return <div className='h-screen flex items-center justify-center font-light italic'>Cargando...</div>;

    if (!miniature) return <div className='h-screen flex items-center justify-center font-light italic'>Miniatura no encontrada.</div>;

    const handleAddToCart = () => {
        if (!isInCart(miniature.id)) {
            addCart(miniature);
            Swal.fire(`${miniature.name} fue añadido al carrito.`);
        }
    }

    const isMiniatureInCart = isInCart(miniature.id);


    return (
        <section className='flex flex-col min-h-screen'>
            <Header />
            <main className="flex-grow max-w-[1500px] mx-auto px-5 pt-5 pb-20 md:p-10">
                <section className='flex flex-col items-center   lg:flex-row gap-5 md:gap-10'>
                    <MiniatureGallery image={miniature.image}
                        imagetwo={miniature.imagetwo}
                        imagethree={miniature.imagethree}
                        imagefour={miniature.imagefour} />
                    <div className="w-full text-start flex flex-col gap-5">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{miniature.name}</h1>
                        <p className="text-lg md:text-xl text-gray-600 uppercase">{miniature.brand}</p>
                        <p className="text-sm lg:text-base">{miniature.description}</p>
                        <div className='text-center flex flex-col gap-5 justify-between items-center'>
                            <div className="flex gap-2 self-start">
                                {miniature.gender === "Hombre" && (
                                    <div className=" bg-blue-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">Hombre</div>
                                )}
                                {miniature.gender === "Mujer" && (
                                    <div className="bg-pink-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">Mujer</div>
                                )}
                                {miniature.gender === "Unisex" && (
                                    <div className="bg-yellow-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">Unisex</div>
                                )}
                                <div className="bg-gray-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">{miniature.size + " ml"}</div>
                            </div>
                            <div className='self-end flex flex-col gap-5'>
                                <p className="text-xl md:text-2xl lg:text-3xl font-semibold self-end">S/ {miniature.price}.00</p>
                                {isMiniatureInCart ? (
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

export default PerfumeDetailPage;