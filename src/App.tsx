import React, {useState, useEffect, useMemo} from "react";
import "./App.scss";

type Country = {
  name: string;
  code: string;
};

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://countries.trevorblades.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              countries {
                name
                code
              }
            }
          `,
        }),
      });

      const result = await response.json();
      setCountries(result.data.countries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
        country.code.toLowerCase().includes(filter.toLowerCase())
    );
  }, [countries, filter]);

  return (
      <div className="countries-container">
        <span className="countries-container__title">Countries</span>
        <input
            type="text"
            className="countries-container__filter-input"
            placeholder="Filter by country code"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />

        {loading && <p className="countries-container__loading">Loading...</p>}
        {error && <p className="countries-container__error">{error}</p>}

        {!loading && !error && (
            <table className="countries-container__table">
              <thead>
              <tr>
                <th>Country Name</th>
                <th>Country Code</th>
              </tr>
              </thead>
              <tbody>
              {filteredCountries.length ? (
                  filteredCountries.map((country) => (
                      <tr key={country.code} className="countries-container__row">
                        <td>{country.name}</td>
                        <td>{country.code}</td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={2} className="countries-container__no-results">
                      No results found.
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
        )}
      </div>
  );
};

export default App;

