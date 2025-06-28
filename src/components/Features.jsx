import React, { useEffect, useState } from 'react';
import { Dumbbell, Heart, Clock, Trophy } from 'lucide-react';
import axios from 'axios';

const iconMap = {
    dumbbell: Dumbbell,
    heart: Heart,
    clock: Clock,
    trophy: Trophy,
};

const Features = () => {
    // const [features, setFeatures] = useState([]);

    // useEffect(() => {
    //     axios.get('https://shark-app-on96m.ondigitalocean.app/api/features')
    //         .then(res => setFeatures(res.data))
    //         .catch(err => console.error(err));
    // }, []);

    const features = [
        {
            icon: <Dumbbell className="w-8 h-8 text-teal-500" />,
            title: 'Expert Training',
            description: 'Get personalized workout plans from certified fitness experts tailored to your goals.'
        },
        {
            icon: <Heart className="w-8 h-8 text-teal-500" />,
            title: 'Health Monitoring',
            description: 'Track your progress with advanced health metrics and real-time monitoring.'
        },
        {
            icon: <Clock className="w-8 h-8 text-teal-500" />,
            title: 'Flexible Schedule',
            description: 'Access workouts anytime, anywhere with our 24/7 available training programs.'
        },
        {
            icon: <Trophy className="w-8 h-8 text-teal-500" />,
            title: 'Achievement System',
            description: 'Stay motivated with our rewards system and track your fitness milestones.'
        }
    ];

    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon] || Dumbbell; // fallback icon
                        return (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                                <div className="flex items-center justify-center mb-4">
                                    <IconComponent className="w-8 h-8 text-teal-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white text-center mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-center">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
