import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setResults, setLoading, setError, setTotalPages }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [listening, setListening] = useState(false); 


  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setQuery(speechText); // Set input field to recognized text
      console.log("Recognized text:", speechText);
      setListening(false);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Voice search error:", event.error);
      alert(`Voice search error: ${event.error}`);
      setListening(false);
    };
  };

  // Normal Search Function
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/search', { query, type });
      setResults(response.data.results);
      setTotalPages(Math.ceil(response.data.results.length / 5)); // Assuming 5 results per page
    } catch (err) {
      console.error('Error during search:', err);
      setError('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <input
          type="text"
          placeholder="Search for questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVoiceSearch}
          className="p-3 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
        >
          🎤
        </button>
      </div>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Types</option>
        <option value="MCQ">MCQ</option>
        <option value="ANAGRAM">Anagram</option>
      </select>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>

      {listening && <p className="text-center text-gray-600">Listening...</p>}
    </div>
  );
};

export default SearchBar;
