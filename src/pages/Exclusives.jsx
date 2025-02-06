import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import ExclusiveListExclusives from '../components/ExclusiveListExclusives';
import Footer from '../components/Footer';
import HeroExclusives from '../components/HeroExclusives';

function Exclusives() {
    const [exclusives, setExclusives] = useState([]);
    const [loadingExclusive, setLoadingExclusive] = useState(true);

    const fetchExclusives = async () => {
        try {
            const { data, error } = await supabase
                .from('exclusives')
                .select('*');

            if (error) throw error;

            setExclusives(data);
        } catch (error) {
            console.error('Error al obtener exclusivos:', error);
        } finally {
            setLoadingExclusive(false);
        }
    };

    useEffect(() => {
        fetchExclusives();
    }, []);

    if (loadingExclusive) {
        return <div className='h-screen flex items-center justify-center font-light italic'>Cargando exclusivos...</div>;
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10'>
                <HeroExclusives />
                <ExclusiveListExclusives />
            </main>
            <Footer />
        </div>
    );
}

export default Exclusives;