import React from 'react'
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import useForm from '../hooks/useForm';

interface InputField {
    id: number,
    name: string,
    type: string,
    placeholder: string,
    option: boolean | null
}

const ContactEditPages = () => {
    const { values, handleChange } = useForm({
        firstname: 'Ernser-Schmitt',
        lastname: 'Ernser-Schmitt',
        organization: 'Kock-Bins',
        email: 'mel_rippin@monahan.test',
        phone: '104-069-8858',
        address: '108 Debera Terrace',
        city: 'South Tylerland',
        province: 'Alaska',
        country: 'United States',
        postalCode: '96557',
    });

    const inputFields: InputField[] = [
        { id: 1, name: 'firstName', type: 'text', placeholder: 'FirstName', option: false },
        { id: 1, name: 'lastName', type: 'text', placeholder: 'LastName', option: false },
        { id: 1, name: 'organization', type: 'text', placeholder: 'Organization', option: false },
        { id: 2, name: 'email', type: 'email', placeholder: 'Email', option: false },
        { id: 3, name: 'phone', type: 'text', placeholder: 'Phone', option: false },
        { id: 4, name: 'address', type: 'text', placeholder: 'Address', option: false },
        { id: 5, name: 'city', type: 'text', placeholder: 'City', option: false },
        { id: 6, name: 'province', type: 'text', placeholder: 'Province', option: false },
        { id: 7, name: 'country', type: 'text', placeholder: 'Country', option: true },
        { id: 8, name: 'postalCode', type: 'text', placeholder: 'Postal Code', option: false },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', values);
    };
    return (
        <div className="bg-gray-100 flex-1 p-6">
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-700">
                    <Link to="/contact" className="text-indigo-500 hover:underline font-bold">
                        Contact
                    </Link>
                    <span className="text-gray-500 mx-2">/</span>
                    {values.firstname} {values.lastname}
                </h1>
            </div>

            <div className="max-w-3xl overflow-hidden rounded-sm bg-white shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-wrap">
                    <Form className='p-8' inputFields={inputFields} values={values} onChange={handleChange} />
                    <div className="flex justify-between mt-6 w-full p-4 bg-[#f3f4f6]">
                        <button className="text-red-500 hover:text-red-700 focus:outline-none">
                            Delete Organization
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
                        >
                            "Update Contact"
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex justify-between mt-6">
                {/* <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Update Organization
                    </button> */}
            </div>
        </div>
    );
}

export default ContactEditPages