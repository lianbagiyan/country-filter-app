import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const mockFetch = jest.fn();

const successResponse = {
  data: {
    countries: [
      { name: 'Country1', code: 'C1' },
      { name: 'Country2', code: 'C2' },
    ],
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('countries-title')).toBeInTheDocument();
  });

  test('fetches and displays data', async () => {
    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await screen.findByText('Country Name');

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Filter by country code'), {
      target: { value: 'AM' },
    });

    expect(await screen.findByText('Armenia')).toBeInTheDocument();
    expect(await screen.findByText('AM')).toBeInTheDocument();
  });

  test('renders countries with the right query', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => successResponse,
      ok: true,
    } as Response);

    render(<App />);

    const countriesTitle = await screen.findByTestId('countries-title');

    expect(countriesTitle).toBeInTheDocument();
  });
});
