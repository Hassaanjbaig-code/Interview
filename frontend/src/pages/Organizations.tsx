import React from 'react';
import Search from '../components/Search';
import Table from '../components/Table';
import CreateOrganization from '../components/CreateOrganization';
import useForm from "./../hooks/useForm"
import axiosConfig from '../Fetch/axiosConfig';
import { inputFields, Organization } from "../type"
import Loading from "../components/Loading";

const OrganizationsPage = () => {
  const [openCreateOrganization, setOpenCreateOrganization] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [data, setData] = React.useState([])
  const tableHaed = [
    "Name",
    "City",
    "Phone"
  ]

  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (shouldFetch) {
      axiosConfig.get('/organizations')
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setShouldFetch(false);
        })
        .catch((error) => {
          alert('Error fetching data: ' + error);
          console.log(error);
        }
        );
    }
  }, [shouldFetch]);

  const inputFields: inputFields[] = [
    { id: 1, name: 'name', type: 'text', placeholder: 'Name', option: false },
    { id: 2, name: 'email', type: 'email', placeholder: 'Email', option: false },
    { id: 3, name: 'phone', type: 'text', placeholder: 'Phone', option: false },
    { id: 4, name: 'address', type: 'text', placeholder: 'Address', option: false },
    { id: 5, name: 'city', type: 'text', placeholder: 'City', option: false },
    { id: 6, name: 'province', type: 'text', placeholder: 'Province', option: false },
    {
      id: 7, name: 'country', type: 'text', placeholder: 'Country', option: true, optionPass: [{ value: 'us', label: 'United States', id: 1 },
      { value: 'ca', label: 'Canada', id: 2 },
      ]
    },
    { id: 8, name: 'postal_code', type: 'text', placeholder: 'Postal Code', option: false },
  ];

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', values);
    // Add submission logic here (e.g., API call)

    axiosConfig.post('/organizations', values)
      .then(() => {
        setOpenCreateOrganization(false)
        setLoading(true)
      })
      .catch((error) => {
        console.error("Error for submitting", error)
        setLoading(false)
      })
      .finally(() => {
        axiosConfig.get('/organizations')
          .then((response) => {
            setData(response.data);
            console.log(response.data);
            setShouldFetch(false);
          })
          .catch((error) => {
            alert('Error fetching data: ' + error);
            console.log(error);
          }
          );
          setLoading(false)
      });
  };

  const filteredData = React.useMemo(() => {
    if (!search.trim()) return data;

    return data.filter((item: Organization) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, data]);


  if (loading) return <Loading message="Organization is Adding" />
  return (
    <section className="flex-1 md:p-6 p-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Organizations</h1>
      </div>

      <div className="md:p-6 p-2">
        <Search
          buttonClick={setOpenCreateOrganization}
          valueButton={openCreateOrganization}
          button="Create Organization"
          setSearch={setSearch}
          search={search}
        />
        <div className="overflow-x-auto rounded-sm bg-white shadow-sm">
          <Table
            data={filteredData}
            tableHead={tableHaed}
            link="/organization"
          />
        </div>

        <div className="py-3 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>Previous</span>
                </button>
                <button aria-current="page" className="bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>Next</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {openCreateOrganization && (
        <CreateOrganization
          buttonClick={setOpenCreateOrganization}
          inputFields={inputFields}
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonString="Create Organization"
        />
      )}
    </section>
  );
};

export default OrganizationsPage;