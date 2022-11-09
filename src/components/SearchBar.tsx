import React from "react"
import { AiOutlineSearch } from "react-icons/ai"

interface SearchBarProps {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
    return (
        <div className="mb-7 flex w-full items-center gap-1 p-1 bg-searchBlue rounded-lg focus:outline-blue-800">
            <AiOutlineSearch size="20px" />
            <input
                className="text-white w-full placeholder:text-white bg-transparent focus:outline-none"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search note"
            />
        </div>
    )
}

export default SearchBar
