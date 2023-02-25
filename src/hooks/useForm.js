import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
    
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({

    });

    useEffect(() => {
      createValidators()
    
      
    }, [formState])
    
    useEffect(()=>{
        setFormState(initialForm)
    }, [initialForm])

    const isFormValid = useMemo(()=>{
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;            
        }
        return true;
    }, [formValidation])

    const onInputChange = ({ target }) => {
        // console.log(target   )
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = ()=>{

        const formCheckedValues = {};


        // console.log(formValidations)
        for (const formField of Object.keys(formValidations)) {
            //formFields itera cada propiedad

            const [fn, errorMessage] = formValidations[formField]
            //desestructuro el formValidations basado en el form field
            // console.log(errorMessage);

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            // console.log(formState)
            //formCheckeValues[`${formField}Valid`], crea una nueva propiedad en el formCheckedValues que es una propiedad computada, que su valor nace de la función donde el key del state es indicado por el formField y brinda el valor, si es true es null y si es false
        }
        setFormValidation(formCheckedValues)
        // console.log(formCheckedValues)
    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}