import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">
          Fuel Quota Management System &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;