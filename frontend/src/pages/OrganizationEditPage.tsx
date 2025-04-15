import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import axiosConfig from '../Fetch/axiosConfig';
import Loading from "../components/Loading";

interface dataType {
  id: number,
  name: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  province: string,
  country: string,
  postal_code: string,
}

const OrganizationEditPage = () => {
  const [organization, setOrganization] = React.useState<dataType | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    axiosConfig.get(`/organizations/${id}`)
      .then((response) => {
        setOrganization(response.data);
      })
      .catch(error => console.error("Failed to fetch organization", error));
  }, [id]);

  const inputFields = [
    { name: 'name', type: 'text', placeholder: 'name' },
    { name: 'email', type: 'email', placeholder: 'email' },
    { name: 'phone', type: 'text', placeholder: 'phone' },
    { name: 'address', type: 'text', placeholder: 'address' },
    { name: 'city', type: 'text', placeholder: 'city' },
    { name: 'province', type: 'text', placeholder: 'province' },
  ];

  const navigate = useNavigate();

  if (!organization) {
    return <Loading message="Loading Organization" />
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axiosConfig.put(`/organizations/${id}`, organization)
      .then(() => {
        setLoading(true)
      })
      .finally(() => {
        // Optionally, redirect or show a success message
        navigate('/organizations');
      })
      .catch(error => {
        setLoading(false)
        console.error("Failed to update organization", error)
      });
  }
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
      {loading ? <Loading message="Organizaton is Loading" /> :
        <form onSubmit={onSubmit} className="bg-white rounded-md shadow-md p-6">
          <div className="grid grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <Input
                key={field.name}
                name={field.name}
                value={String(organization[field.name as keyof dataType] || '')}
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
                  value={organization.country}
                  onChange={(e) => setOrganization({ ...organization, country: e.target.value })}
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-gray-700"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <Input
              name='postalCode'
              value={organization?.postal_code}
              onChange={(e) => setOrganization({ ...organization, postal_code: e.target.value })}
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
        </form>
      }
    </div>
  );
};

export default OrganizationEditPage;