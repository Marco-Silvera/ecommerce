import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import DecantListDecants from '../components/DecantListDecants';
import Footer from '../components/Footer';
import HeroDecants from '../components/HeroDecants';

function Decants() {
    const [decants, setDecants] = useState([]);
    const [loadingDecant, setLoadingDecant] = useState(true);

    // Función para obtener los decants desde la base de datos
    const fetchDecants = async () => {
        try {
            const { data, error } = await supabase
                .from('decants') // Nombre de la tabla
                .select('*');     // Seleccionar todos los campos

            if (error) throw error;

            // Guardamos los datos de decants en el estado
            setDecants(data);
        } catch (error) {
            console.error('Error fetching decants:', error);
        } finally {
            setLoadingDecant(false); // Dejamos de mostrar el loadingDecant
        }
    };

    // useEffect para cargar los decants cuando el componente se monta
    useEffect(() => {
        fetchDecants();
    }, []);

    // Si está cargando, mostramos un mensaje de carga
    if (loadingDecant) {
        return <div className='h-screen flex items-center justify-center font-light italic'>Cargando decants...</div>;
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10'>
                <HeroDecants />
                <DecantListDecants />
            </main>
            <Footer />
        </div>
    );
}

export default Decants;