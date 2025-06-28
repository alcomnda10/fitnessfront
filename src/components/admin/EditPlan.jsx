import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true); // إعادة تفعيل التحميل عند تغيير ID
        axios.get(`https://shark-app-on96m.ondigitalocean.app/api/plans/${id}`)
            .then(res => {
                const data = res.data;

                // معالجة آمنة للـ features
                if (typeof data.features === "string") {
                    try {
                        data.features = JSON.parse(data.features);
                    } catch (e) {
                        data.features = [];
                    }
                } else if (!Array.isArray(data.features)) {
                    data.features = [];
                }

                setPlan(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load plan.', err);
                setError("Failed to load plan.");
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPlan(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFeatureChange = (index, value) => {
        const updated = [...plan.features];
        updated[index] = value;
        setPlan(prev => ({ ...prev, features: updated }));
    };

    const addFeature = () => {
        setPlan(prev => ({ ...prev, features: [...prev.features, ""] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://shark-app-on96m.ondigitalocean.app/api/plans/${id}`, {
            ...plan,
            features: JSON.stringify(plan.features),
        })
            .then(() => {
                alert("Plan updated successfully");
                navigate("/admin/plans");
            })
            .catch(err => {
                console.error(err);
                alert("Update failed");
            });
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Edit Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={plan.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
                <input name="description" value={plan.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
                <input name="price" type="number" value={plan.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
                <input name="period" value={plan.period} onChange={handleChange} placeholder="Period" className="w-full p-2 border rounded" />
                <input name="button_text" value={plan.button_text || ""} onChange={handleChange} placeholder="Button Text" className="w-full p-2 border rounded" />

                <div className="flex items-center space-x-2">
                    <input type="checkbox" name="highlighted" checked={!!plan.highlighted} onChange={handleChange} />
                    <label>Highlighted</label>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Features:</label>
                    {plan.features.map((f, idx) => (
                        <input
                            key={idx}
                            value={f}
                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                            className="w-full p-2 mb-2 border rounded"
                        />
                    ))}
                    <button type="button" onClick={addFeature} className="text-sm text-teal-600 mt-2">+ Add Feature</button>
                </div>

                <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditPlan;
