// hooks/useForm.ts
import { useState } from 'react';

interface axiosData {
    id: number | null
    first_name?: string | null
    last_name?: string | null
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    province: string | null
    country: string | null
    postal_code: string | null
    organization_id: number | null
    name?: string | null
}

function useForm<T extends Record<string, any>>(initialValues: T) {
    const [values, setValues] = useState<T>(initialValues);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return { values, handleChange, setValues };
}

export default useForm;
