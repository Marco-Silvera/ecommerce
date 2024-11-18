import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MiniatureGallery from '../components/MiniatureGallery';
import { Link } from 'react-router-dom';

function PerfumeDetailPage() {
    const { path } = useParams();
    const [miniature, setMiniature] = useState(null);
    const [loading, setLoading] = useState(true);

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
                                <a href={'https://api.whatsapp.com/send?phone=51960153257&text=Hola, estoy interesado en ' + encodeURIComponent(miniature.name) + ' ' + encodeURIComponent(miniature.version) + ` ${encodeURIComponent(window.location.href)}`} target='_blank' rel='noreferrer' className="bg-[#25D366] rounded-lg w-fit py-2 px-5 self-center font-bold hover:scale-95 uppercase transition-transform text-white shadow-sm hover:bg-white border hover:border-[#25D366] hover:text-[#25D366] text-xl flex gap-3 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.52 3.483A11.625 11.625 0 0012.015 0C5.378 0 .039 5.338.039 11.929c0 2.105.548 4.163 1.587 5.985l-1.664 6.086 6.215-1.628c1.739.951 3.7 1.455 5.672 1.455h.005c6.635 0 11.98-5.339 11.98-11.929 0-3.189-1.242-6.189-3.516-8.415zM12.02 21.617c-1.735 0-3.462-.457-4.95-1.319l-.354-.206-3.686.964.984-3.599-.224-.37a9.429 9.429 0 01-1.438-4.941c0-5.209 4.243-9.453 9.458-9.453a9.35 9.35 0 016.667 2.756 9.398 9.398 0 012.791 6.697c0 5.209-4.244 9.454-9.458 9.454zm5.237-7.17c-.29-.144-1.708-.843-1.973-.938-.264-.096-.456-.144-.647.144-.192.288-.743.938-.912 1.13-.168.192-.335.215-.626.072-.29-.144-1.22-.448-2.32-1.43-.857-.765-1.436-1.71-1.604-2-.168-.288-.018-.443.126-.587.13-.129.288-.336.432-.505.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.89-2.137-.235-.564-.473-.488-.648-.488h-.557c-.192 0-.503.072-.764.36-.263.288-1.002.977-1.002 2.376s1.027 2.754 1.17 2.946c.144.192 2.02 3.088 4.895 4.332.684.296 1.22.472 1.637.604.687.216 1.313.185 1.807.112.551-.082 1.708-.7 1.95-1.375.24-.672.24-1.249.168-1.375-.073-.12-.264-.192-.553-.336z" />
                                    </svg>
                                    <p>
                                        Lo quiero
                                    </p>
                                </a>
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