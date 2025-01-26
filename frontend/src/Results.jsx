import React from 'react';

const Results = ({ results, loading, error }) => {
  return (
    <div className="w-full max-w-5xl mt-6 font-poppins">
      {loading && <p className="text-center text-gray-600 text-lg">Searching...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {results.length === 0 && !loading ? (
        <p className="text-center text-gray-600 text-lg">No results found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className={`p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105 
                ${
                  result.type === 'MCQ' ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-yellow-50 border-l-4 border-yellow-400'
                }`}
            >
              <h3 className="text-xl font-semibold text-gray-800">{result.title}</h3>
              <p className="text-gray-600 text-sm"><strong>Type:</strong> {result.type}</p>
              <p className="text-gray-700 mt-2 text-base"><strong>Solution:</strong> {result.solution}</p>

              {result.type === 'MCQ' && result.options && (
                <div className="mt-3">
                  <strong className="text-blue-600 text-sm">Options:</strong>
                  <ul className="list-disc list-inside text-gray-700">
                    {result.options.map((option, index) => (
                      <li key={index} className="bg-white p-2 rounded-md shadow-sm mt-1 text-sm">{option.text}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.type === 'ANAGRAM' && result.blocks && (
                <div className="mt-3">
                  <strong className="text-yellow-600 text-sm">Blocks:</strong>
                  <ul className="flex gap-2 mt-2">
                    {result.blocks.map((block, index) => (
                      <li key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md shadow-sm text-sm">{block.text}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
