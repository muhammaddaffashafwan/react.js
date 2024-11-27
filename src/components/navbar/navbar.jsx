import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataPost } from "../ForumPost/DataPost";
import "./navbar.css";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Misalkan id pengguna yang login adalah 1
  const loggedInUserId = 2;
  const loggedInUser = DataPost.find((user) => user.id === loggedInUserId);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/"> <img src="/images/logo.jpg" alt="Logo" className="w-60" /> </Link>
        </div>
        <nav className="nav">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-[70px] items-center justify-center">
              <Link to="/inspiration" className="text-lg text-gray-700 hover:text-[#5c7838]">
                INSPIRATION
              </Link>
              <Link to="/property" className="text-lg text-gray-700 hover:text-[#5c7838]">
                PROPERTY
              </Link>
              <Link to="/article1" className="text-lg text-gray-700 hover:text-[#5c7838]">
                ARTICLE
              </Link>

              {isLoggedIn && (
                <Link to="/forum1" className="text-lg text-gray-700 hover:text-[#5c7838]">
                  FORUM
                </Link>
              )}

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none"
                  >
                    <img
                      src={loggedInUser?.userAvatar || "/images/default-profile.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        PROFILE
                      </Link>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                        onClick={handleLogout}
                      >
                        LOG OUT
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-4 py-2 bg-[#5c7838] text-white rounded-full">
                  LOG IN
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-[#5c7838]">
                MORE
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                  <Link
                    to="/inspiration"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    INSPIRATION
                  </Link>
                  <Link
                    to="/property"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    PROPERTY
                  </Link>
                  <Link
                    to="/article1"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ARTICLE
                  </Link>

                  {isLoggedIn && (
                    <Link
                      to="/forum1"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      FORUM
                    </Link>
                  )}

                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        PROFILE
                      </Link>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                        onClick={handleLogout}
                      >
                        LOG OUT
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      LOG IN
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
