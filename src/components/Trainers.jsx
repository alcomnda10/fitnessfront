import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import TrainerProfile from './TrainerProfile';

const Trainers = () => {
  const navigate = useNavigate();

  const trainers = [
    {
      id: 1,
      name: 'Michael Chen',
      specialization: 'Strength Training',
      experience: '8 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop',
      description: 'Certified strength and conditioning specialist with expertise in powerlifting and functional training.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      specialization: 'Yoga & Flexibility',
      experience: '6 years',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop',
      description: 'Experienced yoga instructor specializing in flexibility training and mindfulness practices.'
    },
    {
      id: 3,
      name: 'David Martinez',
      specialization: 'HIIT & Cardio',
      experience: '5 years',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop',
      description: 'High-energy trainer focused on cardio fitness and high-intensity interval training.'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      specialization: 'Nutrition & Weight Loss',
      experience: '7 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop',
      description: 'Certified nutritionist and personal trainer specializing in sustainable weight loss programs.'
    }
  ];

  const handleTrainerClick = (trainerId) => {
    navigate(`/trainer/${trainerId}`);
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Our <span className="text-teal-500">Expert Trainers</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-gray-900 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => handleTrainerClick(trainer.id)}
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                <p className="text-teal-500 mb-2">{trainer.specialization}</p>
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{trainer.rating}</span>
                  <span className="text-gray-400 ml-2">{trainer.experience}</span>
                </div>
                <p className="text-gray-400 text-sm">{trainer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;