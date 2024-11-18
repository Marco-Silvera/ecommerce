import { useEffect } from "react";
import { usePerfumes } from "../context/PerfumeContext";
import PerfumeRowDashboard from "./PerfumeRowDashboard";

function PerfumeList() {

    const { perfumes, getPerfumes, loading } = usePerfumes()

    console.log(perfumes)
    useEffect(() => {
        getPerfumes()
    }, [])

    function renderPerfumes() {
        if (loading) {
            return <p>Cargando...</p>
        } else if (perfumes.length === 0) {
            return <p>No hay perfumes</p>
        } else {
            return (
                <section>
                    {
                        perfumes.map(perfume => (
                            <PerfumeRowDashboard perfume={perfume} />
                        ))
                    }
                </section>
            );
        }
    }
    return <div>
        {renderPerfumes()}
    </div>
}

export default PerfumeList;