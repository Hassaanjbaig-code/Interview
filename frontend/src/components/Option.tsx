import React from 'react';

interface OptionProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    placeholder: string;
    value: string;
    className_label: string;
    className_input: string;
    option: {
        value: string;
        label: string;
    }[];
}

const Option = (props: OptionProps) => {
    const { onChange, name, value, placeholder, className_label, className_input, option } = props;

    return (
        <div>
            <label className={className_label}>
                {name.charAt(0).toUpperCase() + name.slice(1)}:
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={className_input}
            >
                <option value="" disabled>{placeholder}</option>
                {option.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Option;
