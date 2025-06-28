import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const isAuthRoute = ["/login", "/signup", "/forget-password"].includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("auth_user");
            const parsed = stored ? JSON.parse(stored) : null;
            setUser(parsed);
        } catch {
            localStorage.removeItem("auth_user");
            localStorage.removeItem("auth_token");
            setUser(null);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setUser(null);
        navigate("/login");
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/courses", label: "Courses" },
        { to: "/store", label: "Store" },
        { to: "/services", label: "Services" },
        { to: "/aboutus", label: "About Us" },
        { to: "/trainers", label: "Trainers" },
    ];

    return (
        <>
            <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-white/95 backdrop-blur-sm' : 'bg-white'}`}>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link to="/">
                            <h2 className="font-bold text-2xl cursor-pointer hover:scale-105 transition-transform">
                                Royal <span className="text-teal-600">Fitness</span>
                            </h2>
                        </Link>

                        <nav className="hidden md:block" aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                {navLinks.map(link => (
                                    <li key={link.to}>
                                        <Link className="text-gray-700 hover:text-teal-500" to={link.to}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            {!isAuthRoute && (
                                <div className="hidden sm:flex items-center gap-4">
                                    <Link
                                        to="/chat"
                                        className="rounded-3xl bg-teal-600 hover:bg-teal-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        Chat With AI
                                    </Link>

                                    {user ? (
                                        <div className="flex items-center gap-4">
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="cursor-pointer bg-gray-800 text-white px-4 py-1.5 rounded-3xl text-sm hover:bg-gray-900 transition"
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/profile"
                                                className="text-gray-700 hover:text-teal-600 text-sm font-medium hidden lg:block"
                                            >
                                                Hello, {user.first_name}
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-3xl transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 text-sm rounded-3xl transition"
                                        >
                                            Login
                                        </Link>
                                    )}
                                </div>
                            )}

                            <button
                                className="md:hidden rounded-lg bg-gray-100 p-2.5 text-gray-600"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden mobile-menu-container ${isMenuOpen ? 'block' : 'hidden'} absolute left-0 right-0 top-16 bg-white shadow-lg z-50`}>
                        <nav className="px-4 py-3">
                            <ul className="space-y-3">
                                {navLinks.map(link => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="block text-gray-700 hover:text-teal-500 transition"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {!isAuthRoute && (
                                <div className="mt-4">
                                    <Link
                                        to="/chat"
                                        className="block w-full text-center rounded-3xl bg-teal-600 hover:bg-teal-800 px-5 py-2.5 text-sm font-medium text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Chat With AI
                                    </Link>

                                    {user ? (
                                        <div className="mt-3 flex flex-col items-center gap-3">
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="block w-full text-center bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-3xl text-sm"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/profile"
                                                className="text-sm text-gray-700"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Hello, {user.first_name}
                                            </Link>
                                            <button
                                                onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-3xl text-sm"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mt-3 flex flex-col gap-2">
                                            <Link
                                                to="/login"
                                                className="block w-full text-center rounded-3xl bg-teal-500 hover:bg-teal-600 px-5 py-2.5 text-sm font-medium text-white"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="block w-full text-center rounded-3xl border border-teal-500 bg-white hover:bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-700"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            <div className="h-16"></div>
        </>
    );
};
