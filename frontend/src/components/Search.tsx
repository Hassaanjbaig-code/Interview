import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

interface SearchProps {
    onSearch?: (searchTerm: string) => void;
    buttonClick?: React.Dispatch<React.SetStateAction<boolean>>;
    valueButton: boolean;
    button: string
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = (props: SearchProps) => {
    const { buttonClick, valueButton, button, search, setSearch } = props;
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center mr-4 w-full max-w-md">
                <div className="flex w-full rounded-sm bg-white shadow relative">
                    <button type="button" className='rounded-l border-r px-4 hover:bg-gray-100 focus:z-10 border-[#B4BFD5] md:px-6'>
                        <span className='max-md:hidden'>Filter</span>
                        <span className='block md:hidden'>
                            <IoIosArrowDown size={10} />
                        </span>
                    </button>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaSearch scale={5} className="h-4 w-4" />
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
                className={` hover:bg-indigo-700 text-white font-bold py-2 px-1.5 md:px-4 rounded focus:outline-none focus:shadow-outline text-sm ${valueButton ? 'bg-red-600' : 'bg-indigo-600'}`}
                onClick={() => buttonClick?.(!valueButton)}
            >
                {button}
            </button>
        </div>
    )
}

export default Search