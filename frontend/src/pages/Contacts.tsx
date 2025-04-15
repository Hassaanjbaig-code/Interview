import React from "react"
import CreateOrganization from "../components/CreateOrganization";
import Search from "../components/Search";
import Table from "../components/Table";
import useForm from "./../hooks/useForm";
import axiosConfig from "../Fetch/axiosConfig";
import Loading from "../components/Loading";
import { inputFields } from "../type"


const Contacts = () => {
  const [openCreateContact, setOpenCreateContact] = React.useState(false)
  const [orgName, setOrgName] = React.useState<{ id: number; name: string; }[]>([])
  const [loading, setLoading] = React.useState(false)
  const tableHaed = [
    "Name",
    "Organization",
    "City",
    "Phone"
  ]
  const { values, handleChange } = useForm({
    FirstName: '',
    LastName: '',
    Organiztion: '',
    Email: '',
    Phone: '',
    Address: '',
    City: '',
    Province: '',
    Country: '',
    PostalCode: '',
  });

  const [data, setData] = React.useState([])

  React.useEffect(() => {
    axiosConfig.get('/contacts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert('Error fetching data: ' + error);
        console.log(error);
      }
      );
  }, [openCreateContact]);

  React.useEffect(() => {
    if (openCreateContact) {
      axiosConfig.get('/organization/names')
        .then((res) => {
          setLoading(true)
          setOrgName(res.data);
        })
        .catch(err => console.error(err))
        .finally(() => {
          setLoading(false);
        })
    }
  }, [openCreateContact])

  const inputFields: inputFields[] = React.useMemo(() => [
    { id: 1, name: 'first_name', type: 'text', placeholder: 'FirstName', option: false },
    { id: 2, name: 'last_name', type: 'text', placeholder: 'LastName', option: false },
    {
      id: 3, name: 'organization_id', type: 'text', placeholder: 'Organization',
      option: true, optionPass: orgName.map((org) => ({ id: org.id, value: org.id.toString(), label: org.name }))
    },
    { id: 4, name: 'email', type: 'email', placeholder: 'Email', option: false },
    { id: 5, name: 'phone', type: 'text', placeholder: 'Phone', option: false },
    { id: 6, name: 'address', type: 'text', placeholder: 'Address', option: false },
    { id: 7, name: 'city', type: 'text', placeholder: 'City', option: false },
    {
      id: 8, name: 'province', type: 'text', placeholder: 'Province', option: false
    },
    {
      id: 9, name: 'country', type: 'text', placeholder: 'Country', option: true, optionPass: [
        { value: 'us', label: 'United States', id: 1 },
        { value: 'ca', label: 'Canada', id: 2 },
      ]
    },
    { id: 10, name: 'postal_code', type: 'text', placeholder: 'Postal Code', option: false },
  ], [orgName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosConfig.post('/contacts', values)
      .then(() => {
        setOpenCreateContact(false)
        setLoading(true)
      })
      .catch((error) => {
        console.error("Error for submitting",error)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      });
  };
  if (loading) return <Loading message="Contact is Loading" />
  return (
    <section className="flex-1 md:p-6 p-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Contact</h1>
      </div>

      <div className="p-6">
        <Search
          onSearch={(searchTerm) => console.log(searchTerm)}
          buttonClick={setOpenCreateContact}
          valueButton={openCreateContact}
          button="Create Contact"
        />
        <div className="overflow-x-auto rounded-sm bg-white shadow-sm">
          <Table
            data={data}
            tableHead={tableHaed}
            link="/contact"
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
      {openCreateContact && (
        <CreateOrganization
          buttonClick={setOpenCreateContact}
          values={values}
          buttonString="Create Contact"
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputFields={inputFields}
        />
      )}
    </section>
  )
}

export default Contacts