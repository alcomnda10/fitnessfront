import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Award, ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
 // Assuming TrainerProfile is in the same directory


const TrainerProfile = () => {
  const { id } = useParams();

  // This would typically come from an API or database
  const trainers = [
    {
      id: 1,
      name: 'Michael Chen',
      specialization: 'Strength Training',
      experience: '8 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop',
      description: 'Certified strength and conditioning specialist with expertise in powerlifting and functional training.',
      email: 'michael.chen@fitnessapp.com',
      phone: '+1 (555) 123-4567',
      availability: 'Mon-Fri: 7AM-8PM',
      certifications: ['NASM Certified Personal Trainer', 'Certified Strength and Conditioning Specialist', 'First Aid Certified'],
      specialties: ['Strength Training', 'Powerlifting', 'Functional Training', 'Athletic Performance']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      specialization: 'Yoga & Flexibility',
      experience: '6 years',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop',
      description: 'Experienced yoga instructor specializing in flexibility training and mindfulness practices.',
      email: 'Sarah.Johnson@fitnessapp.com',
      phone: '+1 (555) 123-4567',
      availability: 'Mon-Fri: 7AM-8PM',
      certifications: ['NASM Certified Personal Trainer', 'Certified Strength and Conditioning Specialist', 'First Aid Certified'],
      specialties: ['Strength Training', 'Powerlifting', 'Functional Training', 'Athletic Performance']
    },
    {
      id: 3,
      name: 'David Martinez',
      specialization: 'HIIT & Cardio',
      experience: '5 years',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop',
      description: 'High-energy trainer focused on cardio fitness and high-intensity interval training.',
      email: 'David.Martinez@fitnessapp.com',
      phone: '+1 (555) 123-4567',
      availability: 'Mon-Fri: 7AM-8PM',
      certifications: ['NASM Certified Personal Trainer', 'Certified Strength and Conditioning Specialist', 'First Aid Certified'],
      specialties: ['Strength Training', 'Powerlifting', 'Functional Training', 'Athletic Performance']
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      specialization: 'Nutrition & Weight Loss',
      experience: '7 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop',
      description: 'Certified nutritionist and personal trainer specializing in sustainable weight loss programs.',
      email: 'Emily.Rodriguez@fitnessapp.com',
      phone: '+1 (555) 123-4567',
      availability: 'Mon-Fri: 7AM-8PM',
      certifications: ['NASM Certified Personal Trainer', 'Certified Strength and Conditioning Specialist', 'First Aid Certified'],
      specialties: ['Strength Training', 'Powerlifting', 'Functional Training', 'Athletic Performance']
    },
    // Add other trainers with similar detailed information
  ];

  const trainer = trainers.find(t => t.id === parseInt(id));

  if (!trainer) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Trainer not found</h2>
          <Link to="/trainers" className="text-teal-500 hover:text-teal-400 flex items-center justify-center">
            <ArrowLeft className="mr-2" /> Back to Trainers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <Link to="/trainers" className="text-teal-500 hover:text-teal-400 flex items-center mb-8">
          <ArrowLeft className="mr-2" /> Back to Trainers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainer Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{trainer.name}</h1>
                <p className="text-teal-500 text-xl mb-4">{trainer.specialization}</p>
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-xl">{trainer.rating}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-teal-500" />
                    <span>{trainer.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-teal-500" />
                    <span>{trainer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-teal-500" />
                    <span>{trainer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-teal-500" />
                    <span>{trainer.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trainer Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-gray-300">{trainer.description}</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainer.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="w-5 h-5 text-teal-500 mr-3" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {trainer.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="cursor-pointer bg-teal-500 text-white px-4 py-2 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Book a Session</h2>
              <button className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                Schedule Training
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;