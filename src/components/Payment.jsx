import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const plan = location.state?.plan;
  const course = location.state?.course;

  const [form, setForm] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://shark-app-on96m.ondigitalocean.app/api/orders', {
        plan_id: plan?.id || null,
        course_id: course?.id || null,
        price: plan?.price || course?.price,
        address: {
          address: form.address,
          city: form.city,
          state: form.state,
          postal_code: form.postalCode
        },
        payment_info: {
          card_name: form.cardName,
          card_number: form.cardNumber,
          expiry: form.expiry,
          cvc: form.cvc
        }
      });

      alert('Payment successful!');
      navigate('/thank-you');
    } catch (error) {
      console.error(error);
      alert('Payment failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!plan && !course)
    return <div className="text-center text-white py-20">No plan or course selected.</div>;

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl p-6 md:p-8">
        <div className="flex items-center mb-6">
          <Link to="/pricing" className="text-teal-500 hover:text-teal-400 flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Plans
          </Link>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12">
            <img src="/src/assets/react.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Card Payment</h1>
            <h2 className="text-xl text-white">{plan ? plan.name : course?.title}</h2>
            <p className="text-gray-400 text-sm">
              Price: ${plan ? plan.price : course?.price}
              {plan && ` / ${plan.period}`}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Personal details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="address" value={form.address} onChange={handleChange} placeholder="Enter your address" required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input name="city" value={form.city} onChange={handleChange} placeholder="Enter your city" required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input name="state" value={form.state} onChange={handleChange} placeholder="Enter your state" required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal code" required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Card details</h3>
            <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Cardholder name" required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white mb-4"
            />
            <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" required
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input name="cvc" value={form.cvc} onChange={handleChange} placeholder="CVC" required
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay $${plan ? plan.price : course?.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
