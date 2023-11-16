import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './index';

describe('SearchInput Component', () => {
  test('renders correctly', () => {
    const onChange = jest.fn();
    render(<SearchInput value="" onChange={onChange} />);

    const inputElement = screen.getByPlaceholderText('Filter by country code');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange prop when input value changes', () => {
    const onChange = jest.fn();
    render(<SearchInput value="" onChange={onChange} />);

    const inputElement = screen.getByPlaceholderText('Filter by country code');
    fireEvent.change(inputElement, { target: { value: 'MG' } });

    expect(onChange).toHaveBeenCalledWith('MG');
  });

  test('clears input correctly', () => {
    const onChange = jest.fn();
    render(<SearchInput value="MG" onChange={onChange} />);

    const inputElement = screen.getByPlaceholderText('Filter by country code');
    fireEvent.change(inputElement, { target: { value: '' } });

    expect(onChange).toHaveBeenCalledWith('');
  });

  test('matches snapshot', () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
