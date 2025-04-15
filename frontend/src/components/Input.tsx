import React from 'react'

interface InputProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    className_label: string;
    className_input: string;
}

const Input = (props: InputProps) => {
    const { name, value, onChange, placeholder, type, className_input, className_label } = props 
    // console.log(name)
    return (
        <div>
            <label htmlFor={name} className={className_label}>
                {name.replace(/_/g, " ").charAt(0).toUpperCase() + name.replace(/_/g, " ").slice(1)}:
            </label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                className={className_input}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input