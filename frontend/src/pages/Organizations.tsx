import React from 'react';
import Search from '../components/Search';
import Table from '../components/Table';
import CreateOrganization from '../components/CreateOrganization';
import useForm from "./../hooks/useForm"
import axiosConfig from '../Fetch/axiosConfig';
import { inputFields, Organization, OrganizationLimit } from "../type"
import Loading from "../components/Loading";
import Footer from '../components/Footer';

const OrganizationsPage = () => {
  const [openCreateOrganization, setOpenCreateOrganization] = React.useState(false)
  const [pagination, setPagination] = React.useState({
    skip: 0,
    limit: 10,
  })
  const [search, setSearch] = React.useState('')
  const [data, setData] = React.useState<OrganizationLimit | null>(null)
  const tableHaed = [
    "Name",
    "City",
    "Phone"
  ]

  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (shouldFetch) {
      axiosConfig.get(`/organizations/?skip=${pagination.skip}&limit=${pagination.limit}`)
        .then((response) => {
          setData(response.data);
          setShouldFetch(false);
        })
        .catch((error) => {
          alert('Error fetching data: ' + error);
          console.log(error);
        }
        );
    }
  }, [shouldFetch, pagination]);

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

  const filteredOrganization: Organization[] = React.useMemo(() => {
    if (!data || !data.organization) return [];
    if (!search) return data.organization;

    const filtered = data.organization.filter((item) => {
      const fullName = item.name.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
    return filtered
  }, [data, search]);

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPagination(prev => ({
      ...prev,
      skip: prev.skip + prev.limit,
      limit: prev.limit
    }));
  }

  const handlePrevPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pagination.skip === 0 && pagination.limit === 10) return;
    setPagination(prev => ({
      ...prev,
      skip: Math.max(0, prev.skip - prev.limit),
      limit: prev.limit
    }));
  }


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
            data={filteredOrganization}
            tableHead={tableHaed}
            link="/organization"
          />
        </div>
      </div>
      <Footer
        onNext={handleNextPage}  // Changed from OnNext to onNext
        onPrev={handlePrevPage}
        page={data?.Pages}
        totalResult={data?.totalList}
      />
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