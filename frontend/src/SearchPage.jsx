import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';
import Results from './Results';
import Pagination from './Pagination';  

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);  


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center py-10 px-5 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Search Questions</h1>
        <SearchBar
          setResults={setResults}
          setLoading={setLoading}
          setError={setError}
          setTotalPages={setTotalPages}
        />
        <Results
          results={results.slice(currentPage * 6, (currentPage + 1) * 6)}  
          loading={loading}
          error={error}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
