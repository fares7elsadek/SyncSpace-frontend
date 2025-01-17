import {useState}  from 'react'
import logo from '../logo/navbarlogo.svg'
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../utils/auth";
import { removeTokens } from '../utils/tokenServices';

const SITE_URL = "https://syncspace.runasp.net"

const Navbar = () =>{

    const [userOpen,setUserOpen] = useState(false);
    const [menuOpen,setMenuOpen] = useState(false);

    const authenticated = isAuthenticated();  // Check if the user is logged in
    console.log(authenticated)
    const userImage = authenticated ? `${SITE_URL}${localStorage.getItem("avatar")}` : "";  

    const handleLogout = () => {
      removeTokens();  
      window.location.href = '/';  
    };

    return (
      <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${menuOpen ? "hidden" : "block"} w-6 h-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className={`${menuOpen ? "block" : "hidden"} w-6 h-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img className="h-8 w-auto" src={logo} alt="SyncSpace" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Add additional nav items here */}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {authenticated ? (
                <>
                  <button
                    type="button"
                    className="relative hidden md:inline-block rounded-full bg-blue-900 p-2 mr-2 text-white"
                  >
                    Create new room
                  </button>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Logout
                  </button>
                  {/* User menu */}
                  <div className="relative ml-3">
                    <div>
                      <button
                        onClick={() => setUserOpen(!userOpen)}
                        type="button"
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded={userOpen ? "true" : "false"}
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={userImage} alt="User profile" />
                      </button>
                    </div>

                    {userOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <a
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Your Profile
                        </a>
                        <a
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Settings
                        </a>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <a href="/login" className="text-white mx-2">Login</a>
                  <a href="/register" className="text-white mx-2">Register</a>
                </>
              )}
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Add mobile nav items here */}
            </div>
          </div>
        )}
      </nav>
    </>
    );
}

export default Navbar;