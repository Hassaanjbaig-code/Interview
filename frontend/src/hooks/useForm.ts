// hooks/useForm.ts
import { useState } from 'react';

function useForm<T extends Record<string, any>>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return { values, handleChange, setValues };
}

export default useForm;
