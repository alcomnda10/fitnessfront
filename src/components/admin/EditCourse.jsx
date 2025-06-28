import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCourse = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
    });
    const [imagePreview, setImagePreview] = useState('');
    const [newImage, setNewImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/courses/${id}`)
            .then(res => {
                const { title, description, price, image } = res.data;
                setForm({ title, description, price });
                setImagePreview(image); // الصورة القديمة
            })
            .catch(err => console.error('Failed to fetch course', err));
    }, [id]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = e => {
        setNewImage(e.target.files[0]);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('price', form.price);
        if (newImage) {
            formData.append('image', newImage);
        }

        try {
            await axios.post(
                `http://localhost:8000/api/courses/${id}?_method=PUT`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate('/courses');
        } catch (err) {
            console.error('Failed to update course', err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border p-2 rounded"
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Current"
                        className="w-32 h-32 object-cover rounded border"
                    />
                )}
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditCourse;
