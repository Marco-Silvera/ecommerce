import { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/client';

export const DecantContext = createContext();

export const useDecants = () => {
    const context = useContext(DecantContext)
    if (!context) throw Error('usePerfumes must be used within DecantContextProvider')
    return context
}

export const DecantContextProvider = ({ children }) => {

    const [decants, setDecants] = useState([])
    const [addingDecant, setAddingDecant] = useState(false)
    const [addingUpdateDecant, setAddingUpdateDecant] = useState(false)
    const [loadingDecant, setLoadingDecant] = useState(false)
    const [decantToEdit, setDecantToEdit] = useState(null)
    const [selectedDecant, setSelectedDecant] = useState(null);


    const getDecants = async () => {
        setLoadingDecant(true)
        const { error, data } = await supabase.from('decants').select().order('id', { ascending: true });
        if (error) throw error

        setDecants(data)
        setLoadingDecant(false)
    }

    const createDecant = async (
        decantName,
        decantDescription,
        decantPath,
        decantGender,
        decantBrand,
        decantConcentration,
        decantSize,
        decantSizeTwo,
        decantSizeThree,
        decantPrice,
        decantPriceTwo,
        decantPriceThree,
        decantImage,
        decantImageTwo,
        decantImageThree
    ) => {

        setAddingDecant(true)
        try {
            const { error, data } = await supabase.from('decants').insert({
                name: decantName,
                description: decantDescription,
                path: decantPath,
                gender: decantGender,
                brand: decantBrand,
                concentration: decantConcentration,
                size: decantSize,
                sizetwo: decantSizeTwo,
                sizethree: decantSizeThree,
                price: decantPrice,
                pricetwo: decantPriceTwo,
                pricethree: decantPriceThree,
                image: decantImage,
                imagetwo: decantImageTwo,
                imagethree: decantImageThree
            })

            if (error) throw error
            await getDecants();
        } catch (error) {
            console.error(error)
        } finally { setAddingDecant(false) }

    }

    const deleteDecant = async (id) => {
        const { error, data } = await supabase.from('decants').delete().eq('id', id)

        if (error) throw error

        setDecants(decants.filter(decant => decant.id !== id))
        console.log(data)
    }

    const displayDecant = (decant) => {
        setSelectedDecant(decant);
    }

    const updateDecant = async (updatedDecant) => {
        setAddingUpdateDecant(true)
        const { id, name, description, path, gender, brand, concentration, size, sizetwo, sizethree, price, pricetwo, pricethree, image, imagetwo, imagethree } = updatedDecant;
        console.log('Actualizando decant con ID:', id);  // Para ver si el ID es correcto
        console.log('decant actualizado data:', updatedDecant);
        const { data, error } = await supabase
            .from('decants')
            .update({
                name,
                description,
                path,
                gender,
                brand,
                concentration,
                size,
                sizetwo,
                sizethree,
                price,
                pricetwo,
                pricethree,
                image,
                imagetwo,
                imagethree,
            })
            .eq('id', id);
        if (error) {
            console.error('Error actualizando decant:', error);
        } else {
            console.log('Actualización exitosa:', data);
            await getDecants();  // Refresca la lista de perfumes
        }

        setAddingUpdateDecant(false)

    }

    return <DecantContext.Provider value={{
        decants,
        getDecants,
        createDecant,
        addingDecant,
        addingUpdateDecant,
        loadingDecant,
        deleteDecant,
        displayDecant,
        updateDecant,
        decantToEdit,
        setDecantToEdit,
        setSelectedDecant,
        selectedDecant
    }}>
        {children}
    </DecantContext.Provider>
}