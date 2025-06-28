import React, { useEffect, useState } from 'react';
import axios from 'axios';
import hero from '../assets/hero.png';
import { Link } from 'react-router-dom';
import Features from './Features';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import Contact from './Contact';

const Home = () => {
    const isLoggedIn = !!localStorage.getItem('auth_token');
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('https://shark-app-on96m.ondigitalocean.app/api/plans')
            .then(res => {
                const formattedPlans = res.data.map(plan => {
                    let features = plan.features;
                    if (typeof features === 'string') {
                        try {
                            features = JSON.parse(features);
                        } catch {
                            features = [features];
                        }
                    }
                    return { ...plan, features };
                });
                setPlans(formattedPlans);
            })
            .catch(err => {
                console.error('Failed to fetch plans:', err);
            });
    }, []);

    return (
        <div className="bg-black">
            <section className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 py-8 md:py-0">
                <div className='flex flex-col items-center md:items-start justify-center text-white p-4 md:p-8 lg:p-16 xl:p-24 max-w-2xl'>
                    <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl pb-6 md:pb-8 tracking-wide text-center md:text-left poppins-bold'>
                        Build Your <br className="hidden md:block" />
                        <span className='text-teal-500 mt-4 md:mt-6 block md:inline'> Dream Physique </span>
                    </h1>
                    <p className='text-base md:text-lg text-center md:text-left font-sans max-w-lg mb-8'>
                        Transform your body and mind with our expert-guided fitness programs and supportive community.
                    </p>

                    {!isLoggedIn && (
                        <Link to='/signup' className='w-full md:w-auto'>
                            <button className='w-full md:w-auto bg-teal-500 hover:bg-teal-700 text-white px-8 md:px-10 py-3 rounded-3xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'>
                                Join Us
                            </button>
                        </Link>
                    )}
                </div>
                <div className='w-full md:w-1/2 mt-8 md:mt-0'>
                    <img className='w-full h-auto object-cover max-w-xl mx-auto' src={hero} alt="Hero Image" />
                </div>
            </section>
            <Features />
            <Testimonials />
            <Pricing plans={plans} />
            <Contact />
        </div>
    );
};

export default Home;
