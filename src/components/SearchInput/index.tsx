import React from 'react';
import { SearchInputProps } from "../../types/types";
import './style.scss';

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            className="filter-input"
            placeholder="Filter by country code"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default SearchInput;
