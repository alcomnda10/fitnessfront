import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://shark-app-on96m.ondigitalocean.app/api/courses/${id}`)
            .then(res => setCourse(res.data))
            .catch(err => console.error('Failed to fetch course details', err));
    }, [id]);

    const handleBuyNow = () => {
        if (course) {
            navigate('/payment', { state: { course } });
        }
    };

    if (!course) return <div className="text-center py-20 text-gray-500">Loading...</div>;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
                    <img
                        src={`https://shark-app-on96m.ondigitalocean.app/${course.image}`}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                    />                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h2>
                        <p className="text-gray-700 mb-6">{course.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-teal-600">${course.price}</span>
                            <button
                                onClick={handleBuyNow}
                                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
