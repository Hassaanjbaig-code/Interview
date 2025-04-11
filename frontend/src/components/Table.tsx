import { ArrowRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

const Table = () => {
    return (
        <table className="w-full whitespace-nowrap">
            <thead>
                <tr>
                    <th className="px-5 py-3 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                    <th className="px-5 py-3 bg-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                    <th className="px-5 py-3 bg-white"><span className="sr-only">Edit</span></th>
                </tr>
            </thead>
            <tbody>
                <tr className="focus-within:bg-gray-100 hover:bg-gray-100 cursor-pointer">
                    <td className="px-5 py-3 border-t border-gray-200 bg-white text-sm">
                        <a href="/organizations/1/edit">
                            <p className="text-gray-900 whitespace-no-wrap">Ernser-Schmitt</p>
                        </a>
                    </td>
                    <td className="px-5 py-3 border-t border-gray-200 bg-white text-sm">
                        <a href="/organizations/1/edit">
                            <p className="text-gray-900 whitespace-no-wrap">South Tylerland</p>
                        </a>
                    </td>
                    <td className="px-5 py-3 border-t border-gray-200 bg-white text-sm">
                        <a href="/organizations/1/edit">
                            <p className="text-gray-900 whitespace-no-wrap">104-069-8858</p>
                        </a>
                    </td>
                    <td className="px-5 py-3 border-t border-gray-200 bg-white text-sm text-right">
                        <a href="/organizations/1/edit">
                            <ArrowRightIcon className="h-4 w-4 text-gray-500" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
