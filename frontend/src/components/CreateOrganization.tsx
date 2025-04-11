import React from 'react';
import Input from './Input';
import Option from './Option';

interface inputFields {
    id: number,
    name: string,
    type: string,
    placeholder: string
    option: boolean | null
}

interface CreateOrganizationProps {
    buttonClick?: React.Dispatch<React.SetStateAction<boolean>>;
}
  

const CreateOrganization = (props: CreateOrganizationProps) => {
    const { buttonClick } = props
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
        { id: 1, name: 'name', type: 'text', placeholder: 'Name', option: false },
        { id: 2, name: 'email', type: 'email', placeholder: 'Email', option: false },
        { id: 3, name: 'phone', type: 'text', placeholder: 'Phone', option: false },
        { id: 4, name: 'address', type: 'text', placeholder: 'Address', option: false },
        { id: 5, name: 'city', type: 'text', placeholder: 'City', option: false },
        { id: 6, name: 'province', type: 'text', placeholder: 'Province', option: false },
        { id: 7, name: 'country', type: 'text', placeholder: 'Country', option: true },
        { id: 8, name: 'postalCode', type: 'text', placeholder: 'Postal Code', option: false },
    ];
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#8080804f] bg-opacity-50 rounded-sm">
            <div className="rounded-lg shadow-lg w-full max-w-3xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#f3f4f6] shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">Create Organization</h2>
                    <button
                    onClick={() => buttonClick?.(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                    >&times;</button>
                </div>

                {/* Form */}
                <div className="px-6 py-4 bg-white">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {inputFields.map((field) =>
                            field.option === false ? (
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
                                    className_label="block text-gray-700 text-sm mb-2"
                                    className_input="shadow appearance-none border border-[#e5e7eb] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            ) : (
                                <Option
                                    key={field.name}
                                    name="country"
                                    value={create[field.name as keyof typeof create] || ''}
                                    onChange={(e) => setCreate({ ...create, [field.name]: e.target.value })}
                                    placeholder=""
                                    option={[
                                        { value: 'us', label: 'United States' },
                                        { value: 'ca', label: 'Canada' },
                                        // Add more countries as needed
                                    ]}
                                    className_label="block text-gray-700 text-sm mb-2"
                                    className_input="shadow appearance-none border border-[#e5e7eb] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            )
                        )}
                    </form>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4 shadow bg-[#f3f4f6]">
                    <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded">
                        Create Organization
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateOrganization