import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center px-5">
        <p className="text-lg font-semibold">QuestSearch</p>
        <p className="text-sm">© {new Date().getFullYear()} QuestSearch. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
