import { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/client';

export const MiniatureContext = createContext();

export const useMiniatures = () => {
    const context = useContext(MiniatureContext)
    if (!context) throw Error('useMiniatures must be used within MiniatureContextProvider')
    return context
}

export const MiniatureContextProvider = ({ children }) => {

    const [miniatures, setMiniatures] = useState([])
    const [addingMiniature, setAddingMiniature] = useState(false)
    const [addingUpdateMiniature, setAddingUpdateMiniature] = useState(false)
    const [loadingMiniature, setLoadingMiniature] = useState(false)
    const [miniatureToEdit, setMiniatureToEdit] = useState(null)
    const [selectedMiniature, setSelectedMiniature] = useState(null);


    const getMiniatures = async () => {
        setLoadingMiniature(true)
        const { error, data } = await supabase.from('miniatures').select().order('id', { ascending: true });
        if (error) throw error

        setMiniatures(data)
        setLoadingMiniature(false)
    }

    const createMiniature = async (
        miniatureName,
        miniatureDescription,
        miniaturePath,
        miniatureGender,
        miniatureBrand,
        miniatureConcentration,
        miniatureSize,
        miniaturePrice,
        miniatureImage,
        miniatureImageTwo,
        miniatureImageThree
    ) => {

        setAddingMiniature(true)
        try {
            const { error } = await supabase.from('miniatures').insert({
                name: miniatureName,
                description: miniatureDescription,
                path: miniaturePath,
                gender: miniatureGender,
                brand: miniatureBrand,
                concentration: miniatureConcentration,
                size: miniatureSize,
                price: miniaturePrice,
                image: miniatureImage,
                imagetwo: miniatureImageTwo,
                imagethree: miniatureImageThree
            })

            if (error) throw error
            await getMiniatures();
        } catch (error) {
            console.error(error)
        } finally { setAddingMiniature(false) }

    }

    const deleteMiniature = async (id) => {
        const { error, data } = await supabase.from('miniatures').delete().eq('id', id)

        if (error) throw error

        setMiniatures(miniatures.filter(miniature => miniature.id !== id))
        console.log(data)
    }

    const displayMiniature = (miniature) => {
        setSelectedMiniature(miniature);
    }

    const updateMiniature = async (updatedMiniature) => {
        setAddingUpdateMiniature(true)
        const { id, name, description, path, gender, brand, concentration, size, price, image, imagetwo, imagethree } = updatedMiniature;
        console.log('Actualizando perfume con ID:', id);
        console.log('Miniature actualizado data:', updatedMiniature);
        const { data, error } = await supabase
            .from('miniatures')
            .update({
                name,
                description,
                path,
                gender,
                brand,
                concentration,
                size,
                price,
                image,
                imagetwo,
                imagethree
            })
            .eq('id', id);
        if (error) {
            console.error('Error actualizando miniature:', error);
        } else {
            console.log('Actualización exitosa:', data);
            await getMiniatures();  // Refresca la lista de exclusives
        }

        setAddingUpdateMiniature(false)

    }

    return <MiniatureContext.Provider
        value={{
            miniatures,
            getMiniatures,
            createMiniature,
            addingMiniature,
            addingUpdateMiniature,
            loadingMiniature,
            deleteMiniature,
            displayMiniature,
            updateMiniature,
            miniatureToEdit,
            setMiniatureToEdit,
            setSelectedMiniature,
            selectedMiniature
        }}>
        {children}
    </MiniatureContext.Provider>
}