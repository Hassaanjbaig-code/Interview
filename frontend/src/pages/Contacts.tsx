import React, { useState } from "react"
import CreateOrganization from "../components/CreateOrganization";
import Search from "../components/Search";
import Table from "../components/Table";
import useForm from "./../hooks/useForm";
import axiosConfig from "../Fetch/axiosConfig";
import Loading from "../components/Loading";
import { inputFields, ContactLimit, Contact } from "../type";
import Footer from "../components/Footer";


const Contacts = () => {
  const [openCreateContact, setOpenCreateContact] = React.useState(false)
  const [orgName, setOrgName] = React.useState<{ id: number; name: string; }[]>([])
  const [search, setSearch] = React.useState('')
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10
  })
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

  const [data, setData] = React.useState<ContactLimit | null>(null)

  React.useEffect(() => {
    axiosConfig.get(`/contacts/?skip=${pageXOffset}&limit=${pagination.limit}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert('Error fetching data: ' + error);
        console.log(error);
      }
      );
  }, [openCreateContact, pagination]);

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
        console.error("Error for submitting", error)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      });
  };

  const filteredContacts: Contact[] = React.useMemo(() => {
    if (!data || !data.contact) return [];
    if (!search) return data.contact;

    const filtered = data.contact.filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
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


  if (loading) return <Loading message="Contact is Loading" />
  return (
    <section className="flex-1 md:p-6 p-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Contact</h1>
      </div>

      <div className="p-6">
        <Search
          buttonClick={setOpenCreateContact}
          valueButton={openCreateContact}
          button="Create Contact"
          search={search}
          setSearch={setSearch}
        />
        <div className="overflow-x-auto rounded-sm bg-white shadow-sm">
          <Table
            data={filteredContacts}
            tableHead={tableHaed}
            link="/contact"
          />
        </div>
      </div>
      <Footer
        onNext={handleNextPage}  // Changed from OnNext to onNext
        onPrev={handlePrevPage}
        page={data?.Pages}
        totalResult={data?.totalList}
      />
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