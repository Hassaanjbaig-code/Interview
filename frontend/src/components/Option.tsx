import React from 'react';

interface OptionProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    placeholder: string;
    value: string;
    className_label: string;
    className_input: string;
    option: {
        id: number;
        value: string;
        label: string;
    }[];
}

const Option = ({
    onChange,
    name,
    value,
    placeholder,
    className_label,
    className_input,
    option = [],
}: OptionProps) => {
    return (
        <div className="w-full mb-4">
            <label htmlFor={name} className={className_label}>
                {name.charAt(0).toUpperCase() + name.slice(1)}:
            </label>
            <select
                id={name}
                name={name}
                value={value || ''}
                onChange={onChange}
                className={className_input}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {option.map((opt) => (
                    <option key={opt.id} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Option;
