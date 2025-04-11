import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface TableProps {
    data?: { name: string, city: string, phone: string }[];
    tableHead?: string[];
    link: string
}

const Table = (props: TableProps) => {
   const {data = [], tableHead = [], link} = props
    return (
        <table className="w-full">
            <thead>
                <tr className='font-bold text-left'>
                    {
                        tableHead.map((item, index) => (
                            <th key={index} className="px-5 py-3 tracking-wider">
                                {item}
                            </th>
                        ))
                    }
                    <th className="px-5 py-3"><span className="sr-only">Edit</span></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="focus-within:bg-gray-100 hover:bg-gray-100 cursor-pointer">
                        <td className="px-5 py-3 border-t border-gray-200 text-sm">
                            <a href={link}>
                                <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
                            </a>
                        </td>
                        <td className="px-5 py-3 border-t border-gray-200 text-sm">
                            <a href={link}>
                                <p className="text-gray-900 whitespace-no-wrap">{item.city}</p>
                            </a>
                        </td>
                        <td className="px-5 py-3 border-t border-gray-200 text-sm">
                            <a href={link}>
                                <p className="text-gray-900 whitespace-no-wrap">{item.phone}</p>
                            </a>
                        </td>
                        <td className="px-5 py-3 border-t border-gray-200 text-sm text-right">
                            <a href={link}>
                                <ArrowRightIcon className="h-4 w-4 text-gray-500" />
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
