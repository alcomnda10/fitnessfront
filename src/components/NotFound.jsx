import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <h1 className="text-9xl font-bold text-teal-600">404</h1>
                <div className="absolute rotate-12 transform">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-300"></div>
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-300 rotate-90"></div>
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mt-8">Page Not Found</h2>
                <p className="text-gray-600 mt-4">
                    Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
                    Be sure to check your spelling.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg mt-8 hover:bg-teal-700 transition-colors"
                >
                    <Home className="w-5 h-5" />
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;