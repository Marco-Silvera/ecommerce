import Footer from "../components/Footer";
import Header from "../components/Header";

function NotFound() {
    return <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
            <section className="flex items-center justify-center">
                <h1 className="text-2xl">404 - Pagina no encontrada :(</h1>
            </section>
        </main>
        <Footer />
    </div>
}

export default NotFound;