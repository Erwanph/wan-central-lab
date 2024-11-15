'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const NavBar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
    const [profileName, setProfileName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in by fetching from localStorage
        const user = localStorage.getItem('user');
        if (user) {
            setProfileName(JSON.parse(user).name);
        }

        // Close dropdown and mobile menu if the screen is resized
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
                setIsDropdownOpen(false);  // Close dropdown on resize back to desktop size
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoggedIn]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        // Clear user data from localStorage on logout
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false); // Update state to logged out
        setIsDropdownOpen(false); // Close the dropdown
        window.location.href = '/login'; // Redirect to login after logout
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false); // Close mobile menu dropdown
    };

    return (
        <header className="text-white shadow-md sticky top-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-600">
            <nav className="relative flex items-center justify-between p-4 bg-Royal text-white z-50">
                <Link href="/" className="absolute left-4 flex items-center space-x-2 z-20">
                    <img src="wanlogo-nobg.png" alt="Wan Logo" className="w-8 h-8" />
                    <img src="wanlab-name-nobg.png" alt="Wan Lab Name" className="w-[160px] h-[40px]" />
                </Link>
                <div className="absolute inset-0 hidden md:flex flex-1 justify-center space-x-4 items-center z-10">
                    <Link href="/" className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">Home</Link>
                    <Link href="../about" className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">About</Link>
                    <Link href="/#Subjects" className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">Subjects</Link>
                    <Link href="/#Feedback" passHref className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">Contact</Link>
                </div>
                <div className="md:hidden flex items-center space-x-4">
                    <button onClick={toggleMobileMenu}>
                        <img src={isMobileMenuOpen ? "x.png" : "hamburger.png"} alt="Menu" className="w-6 h-6" />
                    </button>
                </div>
                <div className="hidden absolute right-4 md:flex items-center space-x-4 z-20">
                    {isLoggedIn ? (
                        <div className="relative">
                            <div
                                onClick={toggleDropdown}
                                className="flex items-center space-x-4 cursor-pointer"
                            >
                                <span className="text-lg">{profileName}</span>
                                <img src="profilePicture.png" alt="profilePicture" className="w-8 h-8 rounded-full" />
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                    <Link
                                        href="/profile"
                                        onClick={closeDropdown} // Close dropdown on profile click
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="text-white font-bold transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-lg border border-[#729762] bg-[#87A2FF] hover:bg-[#FFFFFF] hover:text-[#4E75FF] shadow-md">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2">
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center space-x-6 px-6 py-2">
                                <span className="text-lg text-black">{profileName}</span>
                                <img src="profilePicture.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                            </div>
                            <Link href="/" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</Link>
                            <Link href="../about" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</Link>
                            <Link href="/#Subjects" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Subjects</Link>
                            <Link href="/#Feedback" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contact</Link>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</Link>
                            <Link href="../about" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</Link>
                            <Link href="/#Subjects" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Subjects</Link>
                            <Link href="/#Feedback" onClick={closeDropdown} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contact</Link>
                            <div className='flex justify-center p-1'>
                                <Link href="/login" className="text-white transition-transform duration-100 hover:scale-105 px-6 py-1 rounded-lg border border-gray-300 bg-[#87A2FF] hover:bg-Royal hover:text-white shadow-md">Login</Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default NavBar;
