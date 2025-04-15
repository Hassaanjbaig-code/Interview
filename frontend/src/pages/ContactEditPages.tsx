import React from 'react'
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import useForm from '../hooks/useForm';
import axiosConfig from '../Fetch/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading"

interface InputField {
    id: number,
    name: string,
    type: string,
    placeholder: string,
    option: boolean | null
}

const ContactEditPages = () => {
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { values, handleChange, setValues } = useForm({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        country: '',
        postal_code: '',
        organization_id: 0,
    });
    React.useEffect(() => {
        axiosConfig.get(`/contacts/${id}`)
            .then((response) => setValues(response.data))
            .catch((error) => {
                alert('Error fetching data: ' + error);
                console.log(error);
            });

    }, [id]);

    const inputFields: InputField[] = [
        { id: 1, name: 'first_name', type: 'text', placeholder: 'FirstName', option: false },
        { id: 2, name: 'last_name', type: 'text', placeholder: 'LastName', option: false },
        { id: 4, name: 'email', type: 'email', placeholder: 'Email', option: false },
        { id: 5, name: 'phone', type: 'text', placeholder: 'Phone', option: false },
        { id: 6, name: 'address', type: 'text', placeholder: 'Address', option: false },
        { id: 7, name: 'city', type: 'text', placeholder: 'City', option: false },
        { id: 8, name: 'province', type: 'text', placeholder: 'Province', option: false },
        { id: 9, name: 'country', type: 'text', placeholder: 'Country', option: true },
        { id: 10, name: 'postal_code', type: 'text', placeholder: 'Postal Code', option: false }
    ];

    const ContactDelete = () => {
        axiosConfig.delete(`/contact/${id}`)
            .then(() => setLoading(true))
            .catch((er) => console.error(er))
            .finally(() => {
                setLoading(false);
                navigate("/contacts");
            });
    }

    if (!values) {
        return (
            <Loading message="Loading Contact..." />
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axiosConfig.put(`/contact${id}`, values)
            .then(() => setLoading(true))
            .finally(() => {
                setLoading(false);
                navigate("/contacts");
            })
            .catch((er) => {
                console.error(er);
                setLoading(false);
            });
    };



    return (
        <div className="bg-gray-100 flex-1 p-6">
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-700">
                    <Link to="/contacts" className="text-indigo-500 hover:underline font-bold">
                        Contact
                    </Link>
                    <span className="text-gray-500 mx-2">/</span>
                    {values.first_name} {values.last_name}
                </h1>
            </div>

            <div className="max-w-3xl overflow-hidden rounded-sm bg-white shadow-sm">
                {loading ? <Loading message="Loading Contact" /> :
                    <form onSubmit={handleSubmit} className="flex flex-wrap">
                        <Form className='p-8' inputFields={inputFields} values={values} onChange={handleChange} />
                        <div className="flex justify-between mt-6 w-full p-4 bg-[#f3f4f6]">
                            <button onClick={ContactDelete} className="text-red-500 hover:text-red-700 focus:outline-none">
                                Delete Organization
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
                            >
                                "Update Contact"
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export default ContactEditPages