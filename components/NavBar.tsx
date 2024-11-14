'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
    isLoggedIn: boolean;
}

const NavBar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
    const [profileName] = useState("User");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
    const [isLabDropdownOpen, setIsLabDropdownOpen] = useState(false);

    // Simulate checking login status
    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     setIsLoggedIn(true);
    //   } else {
    //     setIsLoggedIn(false);
    //   }
    // }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubjectDropdown = () => {
        setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
        setIsLabDropdownOpen(false); // Close the other dropdown when this one is opened
    };

    // const toggleLabDropdown = () => {
    //     setIsLabDropdownOpen(!isLabDropdownOpen);
    //     setIsSubjectDropdownOpen(false); // Close the other dropdown when this one is opened
    // };

    return (
        <header className="text-white shadow-md sticky top-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-600">
            <nav className="relative flex items-center justify-between p-4 bg-Royal text-white z-50">
                    <Link href="/" className="absolute left-4 flex items-center space-x-2">
                        <img src="wanlogo-nobg.png" alt="Wan Logo" className="size-[50px]" />
                        <img src="wanlab-name-nobg.png" alt="Wan Lab Name" className="w-[160px] h-[40px]" />
                    </Link>
                <div className="flex-1 flex justify-center space-x-6 items-center">
                    <Link href="/" className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">Home</Link>
                    <Link href="../about" className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">About</Link>
                    <Link href="/#Subjects" className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">Subjects</Link>
                    <Link href="/#Feedback" passHref className="text-white font-bold transition-transform duration-300 hover:bg-[#FFFFFF] hover:text-[#4E75FF] px-3 py-2 rounded">Contact</Link>
                </div>
                <div className="absolute right-4 flex items-center space-x-4">
                    {isLoggedIn ? (
                        <span className="text-lg">Welcome, {profileName}</span>
                    ) : (
                        <Link href="../login" className="text-white font-bold transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-lg border border-[#729762] bg-[#87A2FF] hover:bg-[#FFFFFF] hover:text-[#4E75FF] shadow-md">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-end transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="bg-white w-64 p-4 shadow-lg">
                    <button onClick={toggleMenu} className="text-black mb-4 flex">
                        <img src="X.png" alt="Close Menu" className="h-8" />
                    </button>
                    <div className="flex flex-col pt-8 space-y-4">

                        <Link href="/about" className="text-biru-tua font-bold transition duration-300 hover:bg-blue-100 px-4 py-2 rounded-lg text-center" style={{ fontFamily: 'SpButchLite', fontWeight: 'bold' }}>About</Link>


                        <button onClick={toggleSubjectDropdown} className="text-biru-tua font-bold transition duration-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-100" style={{ fontFamily: 'SpButchLite', fontWeight: 'bold' }}>
                            Subject
                        </button>
                        {isSubjectDropdownOpen && (
                            <div className="flex flex-col pl-4 space-y-2">
                                <Link href="/subject/atoms" className="text-black hover:bg-gray-200 px-4 py-2 rounded-lg" style={{ fontFamily: 'SpButchLite', fontWeight: 'bold' }}>Atoms & Molecules</Link>
                                <Link href="/subject/chemistry" className="text-black hover:bg-gray-200 px-4 py-2 rounded-lg" style={{ fontFamily: 'SpButchLite', fontWeight: 'bold' }}>Chemistry Reaction</Link>
                                <Link href="/subject/stoichiometry" className="text-black hover:bg-gray-200 px-4 py-2 rounded-lg" style={{ fontFamily: 'SpButchLite', fontWeight: 'bold' }}>Stoichiometry</Link>
                            </div>
                        )}


                        {isLoggedIn ? (
                            <Link href="/logout" className="text-white transition duration-300 px-4 py-2 rounded-lg" style={{
                                border: "1px solid #729762",
                                borderRadius: "8px",
                                background: "#597445",
                                color: "white",
                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                            }}>
                                Log out
                            </Link>
                        ) : (
                            <Link href="/login" className="text-white font-bold font-spbutchlite transition duration-300 px-4 py-2 rounded-lg text-center font-bold border border-2 border-[#87A2FF] bg-[#87A2FF] hover:bg-[#FFFFFF] hover:text-biru-tua shadow-md">
                                LOGIN
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;