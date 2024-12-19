import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DecantGallery from '../components/DecantGallery';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2'

function DecantDetailPage() {
    const { path } = useParams();
    const [decant, setDecant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addCart, isInCart } = useCart();

    useEffect(() => {
        const fetchDecant = async () => {
            setLoading(true); // Inicia la carga cuando cambia el path
            try {
                const { data, error } = await supabase
                    .from('decants')
                    .select('*')
                    .eq('path', path)
                    .single();

                if (error) throw error;

                setDecant(data);
            } catch (error) {
                console.error('Error fetching decant:', error);
                setDecant(null); // Si hay un error, establece decant en null
            } finally {
                setLoading(false);
            }
        };

        fetchDecant();
    }, [path]);

    if (loading) return <div className='h-screen flex items-center justify-center font-light italic'>Cargando...</div>;

    if (!decant) return <div className='h-screen flex items-center justify-center font-light italic'>Decant no encontrado.</div>;

    const handleAddToCart = () => {
        if (!isInCart(decant.id)) {
            addCart(decant);
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: `${decant.name} fue añadido al carrito.`
            });
        }
    }

    const isDecantInCart = isInCart(decant.id);

    return (
        <section className='flex flex-col min-h-screen'>
            <Header />
            <main className="flex-grow max-w-[1500px] mx-auto px-5 pt-5 pb-20 md:p-10">
                <section className='flex flex-col items-center lg:flex-row gap-5 md:gap-10'>
                    <DecantGallery image={decant.image}
                        imagetwo={decant.imagetwo}
                        imagethree={decant.imagethree}
                        imagefour={decant.imagefour} />
                    <div className="w-full text-start flex flex-col gap-5">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{decant.name}</h1>
                        <div className='flex justify-between'>
                            <p className="text-lg md:text-xl text-gray-600 uppercase">{decant.brand}</p>
                            <p className="text-lg md:text-xl text-gray-600 uppercase">{decant.collection}</p>
                        </div>
                        <p className="text-sm lg:text-base">{decant.description}</p>
                        <div className='text-center flex flex-col gap-5 justify-between items-center'>
                            <div className='self-start flex gap-2'>
                                {decant.gender === "Hombre" && (
                                    <div className=" bg-blue-100 p-2 rounded text-sm lg:text-base">Hombre</div>
                                )}
                                {decant.gender === "Mujer" && (
                                    <div className="bg-pink-100 p-2 rounded text-sm lg:text-base">Mujer</div>
                                )}
                                {decant.gender === "Unisex" && (
                                    <div className="bg-yellow-100 p-2 rounded text-sm lg:text-base">Unisex</div>
                                )}
                                <div className="bg-gray-100 p-2 rounded text-sm lg:text-base">{decant.concentration}</div>
                            </div>
                            <div className='self-end flex flex-col gap-5'>
                                <ul className='text-xl md:text-2xl lg:text-3xl font-semibold self-end text-end pr-5'>
                                    <li>{decant.size + " ml - S/ " + decant.price}</li>
                                    <li>{decant.sizetwo + " ml - S/ " + decant.pricetwo}</li>
                                    <li>{decant.sizethree + " ml - S/ " + decant.pricethree}</li>
                                </ul>
                                {isDecantInCart ? (
                                    <Link
                                        to="/cart"
                                        className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Agregado al carrito
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleAddToCart}
                                            className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Añadir al carrito
                                        </button>
                                    </>
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

export default DecantDetailPage;