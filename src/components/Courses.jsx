import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('auth_user'));
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        axios.get('https://shark-app-on96m.ondigitalocean.app/api/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error('Failed to fetch courses', err));
    }, []);

    // حذف كورس
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await axios.delete(`https://shark-app-on96m.ondigitalocean.app/api/courses/${id}`);
                setCourses(prev => prev.filter(course => course.id !== id));
            } catch (err) {
                console.error("Failed to delete course", err);
            }
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Our Courses</h2>
                    {isAdmin && (
                        <button
                            onClick={() => navigate('/components/courses/create')}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg"
                        >
                            + Add Course
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <div key={course.id} className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
                            <Link to={`/courses/${course.id}`}>
                                <img
                                    src={`https://shark-app-on96m.ondigitalocean.app${course.image}`}
                                    alt={course.title}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-bold text-teal-600">${course.price}</span>
                                    <Link
                                        to={`/courses/${course.id}`}
                                        className="text-sm text-white bg-teal-500 hover:bg-teal-600 px-3 py-1 rounded-lg"
                                    >
                                        View
                                    </Link>
                                </div>

                                {isAdmin && (
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => navigate(`/components/courses/edit/${course.id}`)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
