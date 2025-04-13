import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';


const OrganizationEditPage = () => {
  const [organization, setOrganization] = React.useState({
    name: 'Ernser-Schmitt',
    email: 'mel_rippin@monahan.test',
    phone: '104-069-8858',
    address: '108 Debera Terrace',
    city: 'South Tylerland',
    province: 'Alaska',
    country: 'United States',
    postalCode: '96557',
  });

  const inputFields = [
    { name: 'name', type: 'text', placeholder: 'name' },
    { name: 'email', type: 'email', placeholder: 'email' },
    { name: 'phone', type: 'text', placeholder: 'phone' },
    { name: 'address', type: 'text', placeholder: 'address' },
    { name: 'city', type: 'text', placeholder: 'city' },
    { name: 'province', type: 'text', placeholder: 'province' },
  ];
  return (
    <div className="bg-gray-100 flex-1 p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-700">
          <Link to="/organizations" className="text-indigo-500 hover:underline font-bold">
            Organizations
          </Link>
          <span className="text-gray-500 mx-2">/</span>
          {organization.name}
        </h1>
      </div>

      <div className="bg-white rounded-md shadow-md p-6">
        <div className="grid grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              value={organization[field.name as keyof typeof organization] || ''}
              onChange={(e) =>
                setOrganization({
                  ...organization,
                  [field.name]: e.target.value,
                })
              }
              placeholder={field.placeholder}
              type={field.type}
              className_label="block text-gray-700 text-sm font-bold mb-2"
              className_input="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ))}
          <div>
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Country:
            </label>
            <div className="relative">
              <select
                id="country"
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-gray-700"
                defaultValue={organization.country}
                onSelect={(e) => setOrganization({ ...organization, country: (e.target as HTMLSelectElement).value })}
              >
                <option>United States</option>
                <option>Canada</option>
                {/* Add more countries if needed */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <Input
            name='postalCode'
            value={organization.postalCode}
            onChange={(e) => setOrganization({ ...organization, postalCode: e.target.value })}
            placeholder='postal code'
            type='text'
            className_label='block text-gray-700 text-sm font-bold mb-2'
            className_input='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        <div className="flex justify-between mt-6">
          <button className="text-red-500 hover:text-red-700 focus:outline-none">
            Delete Organization
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update Organization
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationEditPage;