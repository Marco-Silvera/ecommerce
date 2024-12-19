import { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/client';

export const PerfumeContext = createContext();

export const usePerfumes = () => {
    const context = useContext(PerfumeContext)
    if (!context) throw Error('usePerfumes must be used within PerfumeContextProvider')
    return context
}

export const PerfumeContextProvider = ({ children }) => {

    const [perfumes, setPerfumes] = useState([])
    const [adding, setAdding] = useState(false)
    const [addingUpdate, setAddingUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [perfumeToEdit, setPerfumeToEdit] = useState(null)
    const [selectedPerfume, setSelectedPerfume] = useState(null);


    const getPerfumes = async () => {
        setLoading(true)
        const { error, data } = await supabase.from('perfumes').select().order('id', { ascending: true });
        if (error) throw error

        setPerfumes(data)
        setLoading(false)
    }

    const createPerfume = async (
        perfumeName,
        perfumeDescription,
        perfumePath,
        perfumeVersion,
        perfumeGender,
        perfumeBox,
        perfumeBrand,
        perfumeConcentration,
        perfumeSize,
        perfumePrice,
        perfumeImage,
        perfumeImageTwo,
        perfumeImageThree,
        perfumeImageFour
    ) => {

        setAdding(true)
        try {
            const { error } = await supabase.from('perfumes').insert({
                name: perfumeName,
                description: perfumeDescription,
                path: perfumePath,
                version: perfumeVersion,
                gender: perfumeGender,
                box: perfumeBox,
                brand: perfumeBrand,
                concentration: perfumeConcentration,
                size: perfumeSize,
                price: perfumePrice,
                image: perfumeImage,
                imagetwo: perfumeImageTwo,
                imagethree: perfumeImageThree,
                imagefour: perfumeImageFour
            })

            if (error) throw error
            await getPerfumes();
        } catch (error) {
            console.error(error)
        } finally { setAdding(false) }

    }

    const deletePerfume = async (id) => {
        const { error, data } = await supabase.from('perfumes').delete().eq('id', id)

        if (error) throw error

        setPerfumes(perfumes.filter(perfume => perfume.id !== id))
        console.log(data)
    }

    const displayPerfume = (perfume) => {
        setSelectedPerfume(perfume);
    }

    const updatePerfume = async (updatedPerfume) => {
        setAddingUpdate(true)
        const { id, name, description, path, version, gender, box, brand, concentration, size, price, image, imagetwo, imagethree, imagefour } = updatedPerfume;
        console.log('Actualizando perfume con ID:', id);
        console.log('Perfume actualizado data:', updatedPerfume);
        const { data, error } = await supabase
            .from('perfumes')
            .update({
                name,
                description,
                path,
                version,
                gender,
                box,
                brand,
                concentration,
                size,
                price,
                image,
                imagetwo,
                imagethree,
                imagefour
            })
            .eq('id', id);
        if (error) {
            console.error('Error actualizando perfume:', error);
        } else {
            console.log('Actualización exitosa:', data);
            await getPerfumes();  // Refresca la lista de perfumes
        }

        setAddingUpdate(false)

    }

    return <PerfumeContext.Provider
        value={{
            perfumes,
            getPerfumes,
            createPerfume,
            adding,
            addingUpdate,
            loading,
            deletePerfume,
            displayPerfume,
            updatePerfume,
            perfumeToEdit,
            setPerfumeToEdit,
            setSelectedPerfume,
            selectedPerfume
        }}>
        {children}
    </PerfumeContext.Provider>
}