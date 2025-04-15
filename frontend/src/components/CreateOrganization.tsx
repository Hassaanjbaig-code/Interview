import React from 'react';
import Form from './Form';

interface InputField {
    id: number;
    name: string;
    type: string;
    placeholder: string;
    option: boolean | null;
    optionPass?: {
        id: number
        value: string
        label: string
    }[]
}

interface CreateOrganizationProps {
    buttonClick?: React.Dispatch<React.SetStateAction<boolean>>;
    inputFields?: InputField[];
    values: Record<string, string>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    buttonString: string
}

const CreateOrganization: React.FC<CreateOrganizationProps> = ({ buttonClick, inputFields = [], values, handleChange, handleSubmit, buttonString }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#8080804f] bg-opacity-50 rounded-sm">
            <div className="rounded-lg shadow-lg w-full max-w-3xl bg-white">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#f3f4f6] shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">{buttonString}</h2>
                    <button
                        onClick={() => buttonClick?.(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                    >
                        &times;
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-4">
                    <Form inputFields={inputFields} values={values} onChange={handleChange} />
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
                        >
                            {buttonString}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOrganization;
