import React, { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-8 lg:px-16 py-4">
      <div className="hidden md:block">
        <ul className="flex space-x-8">
          {links.map(({ href, label }) => (
            <li
              key={href}
              className="text-white text-sm tracking-wide hover:opacity-70 transition-opacity"
            >
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`md:hidden text-white ${isMenuOpen ? "hidden" : ""}`}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-neutral-900 bg-opacity-90 backdrop-blur-lg px-4 py-8 flex flex-col items-start">
          <button
            className="text-white ml-auto mb-4"
            aria-label="Close Menu"
            onClick={closeMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="21" x2="21" y2="3" />
              <line x1="3" y1="3" x2="21" y2="21" />
            </svg>
          </button>
          <ul className="flex justify-center space-x-6">
            {links.map(({ href, label }) => (
              <li
                key={href}
                className="text-white text-lg font-light tracking-widest hover:opacity-70 transition-opacity"
                onClick={closeMenu}
              >
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
