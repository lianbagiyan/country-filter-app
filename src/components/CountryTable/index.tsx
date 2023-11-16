import React from 'react';
import { CountryTableProps } from "../../types/types";
import './style.scss';

const CountryTable: React.FC<CountryTableProps> = ({ data }) => {
    return (
        <table className="table-container">
            <thead>
            <tr>
                <th>Country Name</th>
                <th>Country Code</th>
            </tr>
            </thead>
            <tbody>
            {data.length ? (
                data.map((country) => (
                    <tr key={country.code}>
                        <td>{country.name}</td>
                        <td>{country.code}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={2} className="table-container__no-results">
                        No results found.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default CountryTable;
