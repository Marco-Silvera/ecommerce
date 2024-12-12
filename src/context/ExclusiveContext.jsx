import { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/client';

export const ExclusiveContext = createContext();

export const useExclusives = () => {
    const context = useContext(ExclusiveContext)
    if (!context) throw Error('useExclusives must be used within ExclusiveContextProvider')
    return context
}

export const ExclusiveContextProvider = ({ children }) => {

    const [exclusives, setExclusives] = useState([])
    const [addingExclusive, setAddingExclusive] = useState(false)
    const [addingUpdateExclusive, setAddingUpdateExclusive] = useState(false)
    const [loadingExclusive, setLoadingExclusive] = useState(false)
    const [exclusiveToEdit, setExclusiveToEdit] = useState(null)
    const [selectedExclusive, setSelectedExclusive] = useState(null);


    const getExclusives = async () => {
        setLoadingExclusive(true)
        const { error, data } = await supabase.from('exclusives').select().order('id', { ascending: true });
        if (error) throw error

        setExclusives(data)
        setLoadingExclusive(false)
    }

    const createExclusive = async (exclusiveName, exclusiveDescription, exclusivePath, exclusiveVersion, exclusiveGender, exclusiveBox, exclusiveBrand, exclusiveCollection, exclusiveConcentration, exclusiveSize, exclusivePrice, exclusiveImage, exclusiveImageTwo, exclusiveImageThree, exclusiveImageFour) => {

        setAddingExclusive(true)
        try {
            const { error, data } = await supabase.from('exclusives').insert({
                name: exclusiveName,
                description: exclusiveDescription,
                path: exclusivePath,
                version: exclusiveVersion,
                gender: exclusiveGender,
                box: exclusiveBox,
                brand: exclusiveBrand,
                collection: exclusiveCollection,
                concentration: exclusiveConcentration,
                size: exclusiveSize,
                price: exclusivePrice,
                image: exclusiveImage,
                imagetwo: exclusiveImageTwo,
                imagethree: exclusiveImageThree,
                imagefour: exclusiveImageFour
            })

            if (error) throw error
            await getExclusives();
        } catch (error) {
            console.error(error)
        } finally { setAddingExclusive(false) }

    }

    const deleteExclusive = async (id) => {
        const { error, data } = await supabase.from('exclusives').delete().eq('id', id)

        if (error) throw error

        setExclusives(exclusives.filter(exclusive => exclusive.id !== id))
        console.log(data)
    }

    const displayExclusive = (exclusive) => {
        setSelectedExclusive(exclusive);
    }

    const updateExclusive = async (updatedExclusive) => {
        setAddingUpdateExclusive(true)
        const { id, name, description, path, version, gender, box, brand, collection, concentration, size, price, image, imagetwo, imagethree, imagefour } = updatedExclusive;
        console.log('Actualizando perfume con ID:', id);  // Para ver si el ID es correcto
        console.log('Exclusive actualizado data:', updatedExclusive);
        const { data, error } = await supabase
            .from('exclusives')
            .update({
                name,
                description,
                path,
                version,
                gender,
                box,
                brand,
                collection,
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
            console.error('Error actualizando exclusive:', error);  // Mostrar el error si falla
        } else {
            console.log('Actualización exitosa:', data);  // Verificar si el update fue exitoso
            await getExclusives();  // Refresca la lista de exclusives
        }

        setAddingUpdateExclusive(false)

    }

    return <ExclusiveContext.Provider
        value={{
            exclusives,
            getExclusives,
            createExclusive,
            addingExclusive,
            addingUpdateExclusive,
            loadingExclusive,
            deleteExclusive,
            displayExclusive,
            updateExclusive,
            exclusiveToEdit,
            setExclusiveToEdit,
            setSelectedExclusive,
            selectedExclusive
        }}>
        {children}
    </ExclusiveContext.Provider>
}