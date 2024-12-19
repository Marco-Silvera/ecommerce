import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import Header from '../components/Header';
import PerfumeListHomePage from '../components/PerfumeListHomePage';
import Footer from '../components/Footer';
import HeroHomePage from '../components/HeroHomePage';

function HomePage() {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPerfumes = async () => {
        try {
            const { data, error } = await supabase
                .from('perfumes')
                .select('*');

            if (error) throw error;

            setPerfumes(data);
        } catch (error) {
            console.error('Error fetching perfumes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerfumes();
    }, []);

    if (loading) {
        return <div className='h-screen flex items-center justify-center font-light italic'>Cargando perfumes...</div>;
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10'>
                <HeroHomePage />
                {/* Pasamos la lista de perfumes como prop */}
                <PerfumeListHomePage perfumes={perfumes} />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;