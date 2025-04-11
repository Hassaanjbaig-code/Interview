import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
    buttonClick?: React.Dispatch<React.SetStateAction<boolean>>;
    valueButton: boolean;
}

const Search = (props: SearchProps) => {
    const { onSearch, buttonClick, valueButton } = props
    const [search, setSearch] = React.useState('')
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center mr-4 w-full max-w-md">
                <div className="flex w-full rounded-sm bg-white shadow">
                    <button type="button" className='rounded-l border-r px-4 hover:bg-gray-100 focus:z-10 border-[#B4BFD5] md:px-6'>
                        Filter
                    </button>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                    <div className="w-full focus:">
                        <input
                            type="text"
                            placeholder="Search..."
                            name='search'
                            autoComplete='false'
                            id='search'
                            className="w-full rounded-r px-6 py-3"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    // Handle search logic here
                                    console.log(search)
                                }
                            }
                            }
                        />
                    </div>
                </div>
                <button type="button" onClick={() => setSearch('')} className="ml-2 text-sm text-gray-600 hover:underline focus:outline-none bg-none">
                    Reset
                </button>
            </div>
            <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                onClick={() => buttonClick?.(!valueButton)}
            >
                Create Organization
            </button>
        </div>
    )
}

export default Search