import { useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            // Si el registro es exitoso, redirige a login
            navigate('/login');
        } catch (error) {
            setError('Error en el registro: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10 items-center justify-center'>
                <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold uppercase'>Registro</h2>
                <form onSubmit={handleRegister} className='w-full max-w-[500px] p-5 text-start flex flex-col gap-5'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor='email'>Correo:</label>
                        <input
                            className='border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal'
                            type="email"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor='password'>Constraseña:</label>
                        <input
                            className='border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal'
                            id='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p>{error}</p>}
                    <button className='bg-blue-500 rounded-lg w-fit py-2 px-5 self-center mt-4 font-bold hover:scale-95 uppercase transition-transform text-white shadow-sm hover:bg-white border hover:border-blue-500 hover:text-blue-500' type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </main>
            <Footer />
        </section>
    );
}

export default Register;