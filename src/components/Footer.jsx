import React from 'react';
import { Facebook, Instagram, Twitter, Github, Dribbble, Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Brand Section */}
                    <div className="flex flex-col items-start">
                        <div className="flex items-center justify-center text-teal-600 dark:text-teal-400">
                            <h2 className='font-bold text-3xl'>Royal Fitness</h2>
                        </div>
                        
                        <p className="mt-4 max-w-md text-left text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            Empowering your fitness journey with expert guidance, personalized workouts, and a supportive community.
                        </p>
                        
                        <div className="mt-6 flex space-x-4">
                            <a href="tel:+15551234567" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                                <Phone className="h-5 w-5 mr-2" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </a>
                        </div>
                        
                        <div className="mt-2 flex space-x-4">
                            <a href="mailto:contact@fitnessapp.com" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                                <Mail className="h-5 w-5 mr-2" />
                                <span className="text-sm">contact@fitnessapp.com</span>
                            </a>
                        </div>
                        
                        <div className="mt-2 flex space-x-4">
                            <a href="#" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                                <MapPin className="h-5 w-5 mr-2" />
                                <span className="text-sm">123 Fitness Street, Healthy City</span>
                            </a>
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">About</a>
                                </li>
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">Careers</a>
                                </li>
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">History</a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Services</h3>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">Workouts</a>
                                </li>
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">Nutrition</a>
                                </li>
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">Coaching</a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resources</h3>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">Blog</a>
                                </li>
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">Guides</a>
                                </li>
                                <li>
                                    <a className="text-gray-700 dark:text-gray-300 text-sm transition hover:text-teal-600 dark:hover:text-teal-400" href="#">Support</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} Royal Fitness. All rights reserved. Made with <Heart className="inline-block h-3 w-3 text-red-500" /> for a healthier world.
                        </p>
                        
                        <ul className="flex justify-center gap-6">
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <Facebook className="h-5 w-5" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <Github className="h-5 w-5" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-300 transition hover:text-teal-600 dark:hover:text-teal-400"
                                >
                                    <span className="sr-only">Dribbble</span>
                                    <Dribbble className="h-5 w-5" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
