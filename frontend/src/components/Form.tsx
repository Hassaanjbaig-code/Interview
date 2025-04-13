import React from 'react'
import Input from './Input'
import Option from './Option'


interface FormType {
    inputFields: {
        id: number;
        name: string;
        type: string;
        placeholder: string;
        option: boolean | null;
    }[];
    values: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    className?: string;
}


const Form = ({ inputFields, values, onChange, className= "" }: FormType) => {
    return (
        <div className={`${className} grid grid-cols-1 md:grid-cols-2 gap-4`}>
            {inputFields.map((field) =>
                field.option === false ? (
                    <Input
                        key={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={onChange}
                        placeholder={field.placeholder}
                        type={field.type}
                        className_label="block text-gray-700 text-sm mb-2"
                        className_input="shadow appearance-none border border-[#e5e7eb] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                ) : (
                    <Option
                        key={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={onChange}
                        placeholder={field.placeholder}
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
        </div>
    );
};


export default Form