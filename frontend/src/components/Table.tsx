import { MdOutlineArrowForwardIos } from "react-icons/md";

interface TableProps {
    data?: { name: string, city: string, phone: string }[];
    tableHead?: string[];
    link: string
}

const Table = (props: TableProps) => {
    const { data = [], tableHead = [], link } = props
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="font-bold text-left">
                        {tableHead.map((item, index) => (
                            <th key={index} className="px-5 py-3 whitespace-nowrap">
                                {item}
                            </th>
                        ))}
                        <th className="px-5 py-3"><span className="sr-only">Edit</span></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="focus-within:bg-gray-100 hover:bg-gray-100 cursor-pointer">
                            <td className="px-5 py-3 border-t border-gray-200 text-sm whitespace-nowrap">
                                <a href={link}>
                                    <p className="text-gray-900">{item.name}</p>
                                </a>
                            </td>
                            <td className="px-5 py-3 border-t border-gray-200 text-sm whitespace-nowrap">
                                <a href={link}>
                                    <p className="text-gray-900">{item.city}</p>
                                </a>
                            </td>
                            <td className="px-5 py-3 border-t border-gray-200 text-sm whitespace-nowrap">
                                <a href={link}>
                                    <p className="text-gray-900">{item.phone}</p>
                                </a>
                            </td>
                            <td className="px-5 py-3 border-t border-gray-200 text-sm text-right">
                                <a href={link}>
                                    <MdOutlineArrowForwardIos className="h-4 w-4 text-gray-500" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Table;
