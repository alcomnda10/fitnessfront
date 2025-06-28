import React from 'react';
import { Dumbbell, Utensils, Users, Brain, HeartPulse, Award } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Dumbbell className="w-12 h-12 text-teal-500" />,
            title: 'Personal Training',
            description: 'One-on-one customized workout sessions with certified trainers to help you achieve your fitness goals faster.'
        },
        {
            icon: <Utensils className="w-12 h-12 text-teal-500" />,
            title: 'Nutrition Planning',
            description: 'Personalized meal plans designed by nutritionists to complement your workout routine and maximize results.'
        },
        {
            icon: <Users className="w-12 h-12 text-teal-500" />,
            title: 'Group Classes',
            description: 'Energetic group sessions including HIIT, yoga, spinning, and more to make fitness fun and engaging.'
        },
        {
            icon: <Brain className="w-12 h-12 text-teal-500" />,
            title: 'Mindfulness & Recovery',
            description: 'Specialized sessions focusing on mental wellness, stress reduction, and proper recovery techniques.'
        },
        {
            icon: <HeartPulse className="w-12 h-12 text-teal-500" />,
            title: 'Health Assessment',
            description: 'Comprehensive fitness evaluations and health screenings to track your progress and optimize your fitness journey.'
        },
        {
            icon: <Award className="w-12 h-12 text-teal-500" />,
            title: 'Elite Coaching',
            description: 'Advanced training programs for athletes and fitness enthusiasts looking to take their performance to the next level.'
        }
    ];

    return (
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Comprehensive fitness solutions tailored to your unique needs and goals
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 ease-in-out group"
                        >
                            <div className="p-8">
                                <div className="flex justify-center items-center h-24 w-24 rounded-full bg-gray-700 mx-auto mb-6 group-hover:bg-teal-900 transition-colors duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white text-center mb-4 group-hover:text-teal-400 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-center">
                                    {service.description}
                                </p>
                            </div>
                            <div className="bg-gray-700 py-4 px-8 group-hover:bg-teal-800 transition-colors duration-300">
                                <button className="w-full text-white font-medium cursor-pointer text-center">Learn More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;