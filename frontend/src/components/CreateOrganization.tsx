import React from 'react';
import Input from './Input';

interface inputFields {
    id: number,
    name: string,
    type: string,
    placeholder: string
}

const CreateOrganization = () => {
    const [create, setCreate] = React.useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        country: '',
        postalCode: ''
    });

    const inputFields: inputFields[] = [
        { id: 1, name: 'name', type: 'text', placeholder: 'name' },
        { id: 2, name: 'email', type: 'email', placeholder: 'email' },
        { id: 3, name: 'phone', type: 'text', placeholder: 'phone' },
        { id: 4, name: 'address', type: 'text', placeholder: 'address' },
        { id: 5, name: 'city', type: 'text', placeholder: 'city' },
        { id: 6, name: 'province', type: 'text', placeholder: 'province' },
    ];
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Create Organization</h2>
                    <button className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
                </div>

                {/* Form */}
                <div className="px-6 py-4">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {inputFields.map((field) => (
                            <Input
                                key={field.name}
                                name={field.name}
                                value={create[field.name as keyof typeof create] || ''}
                                onChange={(e) =>
                                    setCreate({
                                        ...create,
                                        [field.name]: e.target.value,
                                    })
                                }
                                placeholder={field.placeholder}
                                type={field.type}
                                className_label="block text-sm font-medium text-gray-700"
                                className_input="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        ))}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country:</label>
                            <select className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select Country</option>
                                <option value="us">United States</option>
                                <option value="ca">Canada</option>
                                {/* Add more countries as needed */}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Postal Code:</label>
                            <input type="text" className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4 border-t">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded">
                        Create Organization
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateOrganization