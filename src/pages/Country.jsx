import React, { useEffect, useTransition, useState } from 'react';
import { getCountryData } from '../api/PostApi';
import { Loader } from '../components/ui/Loader';
import { CountryCard } from '../components/layout/CountryCard';
import { SearchFilter } from '../components/ui/SearchFilter';

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of countries per page

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      console.log(res);
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;

  // Filter logic
  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  };

  const filterRegion = (country) => {
    if (filter === "All") return country;
    return country.region === filter;
  };

  const filteredCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCountries = filteredCountries.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

      <ul className="grid grid-four-cols">
        {paginatedCountries.map((currCountry, index) => (
          <CountryCard country={currCountry} key={index} />
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button className="prev-btn" onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button className="next-btn" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </section>
  );
};