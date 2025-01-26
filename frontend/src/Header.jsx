import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-blue-600 text-white py-4 shadow-md font-poppins">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-5">
        <h1 className="text-2xl font-semibold tracking-wide">QuestSearch</h1>
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
