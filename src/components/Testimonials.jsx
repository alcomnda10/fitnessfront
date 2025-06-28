// import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
// import axios from 'axios';

const Testimonials = () => {
    // const [testimonials, setTestimonials] = useState([]);

    // useEffect(() => {
    //     axios.get('https://shark-app-on96m.ondigitalocean.app/api/testimonials')
    //         .then(response => setTestimonials(response.data))
    //         .catch(error => console.error(error));
    // }, []);

    // const renderStars = (rating) => {
    //     return [...Array(5)].map((_, index) => (
    //         <Star
    //             key={index}
    //             className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
    //         />
    //     ));
    // };

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Fitness Enthusiast',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'This fitness app has completely transformed my workout routine. The personalized plans and expert guidance have helped me achieve results I never thought possible.',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Amateur Athlete',
            image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'The variety of workouts and the achievement system keeps me motivated. I\'ve seen significant improvements in my strength and endurance.',
            rating: 5
        },
        {
            name: 'Emma Davis',
            role: 'Yoga Practitioner',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            content: 'The flexibility of the program fits perfectly with my busy schedule. The health monitoring features help me stay on track with my wellness goals.',
            rating: 4
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
            />
        ));
    };

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">What Our Members Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            <div className="flex items-center mb-4">
                                <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                />
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {   renderStars(testimonial.rating)}
                            </div>
                            <p className="text-gray-700">{testimonial.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
