// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Users, Target, Award, History } from 'lucide-react';

const AboutUs = () => {
  // const [teamMembers, setTeamMembers] = useState([]);

  // useEffect(() => {
  //   axios.get('https://urchin-app-2qxwc.ondigitalocean.app/api/team-members')
  //     .then(response => setTeamMembers(response.data))
  //     .catch(error => console.error('Error fetching team members:', error));
  // }, []);

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Head Trainer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Nutrition Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-black text-white py-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About <span className="text-teal-500">FitnessApp</span></h1>
        <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto">
          Transforming lives through innovative fitness solutions and personalized wellness journeys.
        </p>
      </div>

      {/* Mission and Values */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg transform hover:scale-105 transition duration-300">
            <Target className="w-12 h-12 text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-400">To empower individuals to achieve their fitness goals through expert guidance and cutting-edge technology.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg transform hover:scale-105 transition duration-300">
            <History className="w-12 h-12 text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our History</h3>
            <p className="text-gray-400">Founded in 2020, we've grown from a small startup to a leading fitness technology company.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg transform hover:scale-105 transition duration-300">
            <Users className="w-12 h-12 text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Community</h3>
            <p className="text-gray-400">Join our thriving community of over 100,000 fitness enthusiasts worldwide.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg transform hover:scale-105 transition duration-300">
            <Award className="w-12 h-12 text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Achievements</h3>
            <p className="text-gray-400">Recognized as the Best Fitness App of 2023 with numerous industry awards.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our <span className="text-teal-500">Team</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-teal-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
