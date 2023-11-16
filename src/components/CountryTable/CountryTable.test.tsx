import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryTable from './index';

const mockData = [{ name: 'Armenia', code: 'AM' }];

const unsortedMockData = [
  { name: 'Brazil', code: 'BR' },
  { name: 'Armenia', code: 'AM' },
];

describe('CountryTable Component', () => {
  test('renders with data', () => {
    render(<CountryTable data={mockData} />);

    const countryNameElement = screen.getByText('Armenia');
    const countryCodeElement = screen.getByText('AM');

    expect(countryNameElement).toBeInTheDocument();
    expect(countryCodeElement).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<CountryTable data={mockData} />);
    expect(container).toMatchSnapshot();
  });

  test('renders sorted rows', () => {
    render(<CountryTable data={unsortedMockData} />);

    const firstRow = screen.getByText('Armenia');
    const secondRow = screen.getByText('Brazil');

    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();
  });

  test('renders with no results message', () => {
    render(<CountryTable data={[]} />);

    const noResultsElement = screen.getByText('No results found.');
    expect(noResultsElement).toBeInTheDocument();
  });
});
