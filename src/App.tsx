import React, {useState, useEffect, useMemo} from "react";
import CountryTable from "./components/CountryTable";
import SearchInput from "./components/SearchInput";
import { Country } from "./types/types";
import "./App.scss";

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
    fetchData && fetchData();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
        country.code.toLowerCase().includes(filter.toLowerCase())
    );
  }, [countries, filter]);

  return (
      <div className="countries-container">
        <span className="countries-container__title">Countries</span>
        <SearchInput value={filter} onChange={setFilter} />

        {loading && <p className="countries-container__loading">Loading...</p>}
        {error && <p className="countries-container__error">{error}</p>}

        {!loading && !error && <CountryTable data={filteredCountries} />}
      </div>
  );
};

export default App;
