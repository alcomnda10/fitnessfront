import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import axios from 'axios';

const Pricing = ({ plans }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("auth_user") || "null");
    const userRole = user?.role || "";

    const handleDelete = (planId) => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            axios.delete(`https://shark-app-on96m.ondigitalocean.app/api/plans/${planId}`)
                .then(() => {
                    alert("Plan deleted successfully");
                    window.location.reload(); // Reload plans list
                })
                .catch(err => {
                    console.error(err);
                    alert("Failed to delete plan.");
                });
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Choose Your Plan</h2>

                {userRole === 'admin' && (
                    <div className="text-center mb-12">
                        <Link to="/components/plans/create">
                            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl text-sm md:text-base transition duration-300">
                                + Add New Plan
                            </button>
                        </Link>
                    </div>
                )}

                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Select the perfect plan that matches your fitness journey and goals
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => {
                        const features = Array.isArray(plan.features)
                            ? plan.features
                            : typeof plan.features === 'string'
                                ? plan.features.split(',').map(f => f.trim())
                                : [];

                        const isHighlighted = plan.name?.toLowerCase() === 'pro' || plan.name?.toLowerCase() === 'premium';

                        return (
                            <div
                                key={plan.id || index}
                                className={`rounded-2xl p-8 ${isHighlighted ? 'bg-teal-500 text-white transform scale-105' : 'bg-white'} shadow-xl transition-all duration-300 hover:transform hover:scale-105`}
                            >
                                <h3 className={`text-2xl font-bold mb-2 ${isHighlighted ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                                <p className={isHighlighted ? 'text-teal-100' : 'text-gray-600'}>{plan.description}</p>
                                <div className="my-8">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className={`${isHighlighted ? 'text-teal-100' : 'text-gray-600'}`}> / {plan.period}</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <Check className={`w-5 h-5 mr-3 ${isHighlighted ? 'text-white' : 'text-teal-500'}`} />
                                            <span className={isHighlighted ? 'text-white' : 'text-gray-700'}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => {
                                        if (!user) {
                                            navigate("/login");
                                        } else {
                                            navigate("/payment", { state: { plan } });
                                        }
                                    }}
                                    className={`cursor-pointer w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-200 ${isHighlighted ? 'bg-white text-teal-500 hover:bg-gray-100' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
                                >
                                    {plan.button_text || "Choose Plan"}
                                </button>

                                {userRole === 'admin' && (
                                    <div className="flex flex-col gap-2 mt-4">
                                        <Link to={`/components/plans/${plan.id}/edit`}>
                                            <button
                                                className={`w-full py-2 px-6 rounded-xl font-semibold transition-colors duration-200 border ${isHighlighted ? 'border-white text-white hover:bg-white hover:text-teal-500' : 'border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white'}`}
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(plan.id)}
                                            className={`w-full py-2 px-6 rounded-xl font-semibold transition-colors duration-200 border ${isHighlighted ? 'border-white text-white hover:bg-red-100 hover:text-red-600' : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
