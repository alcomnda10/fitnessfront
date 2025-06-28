import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductFormModal = ({ isOpen, onClose, onSave, product }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price || '');
            setPreview(product.image || '');
            setImage(null);
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setPreview('');
        }
    }, [product]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert('Name and price are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);

        if (image) {
            formData.append('image', image);
        }

        if (product && product.id) {
            onSave(formData, product.id);
        } else {
            onSave(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-24 h-24 object-cover rounded"
                            />
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                        >
                            {product ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;

export const saveProduct = async (formData, productId) => {
    try {
        if (productId) {
            formData.append('_method', 'PUT'); 
            const response = await axios.post(
                `https://shark-app-on96m.ondigitalocean.app/api/products/${productId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert('Product updated successfully');
            return response.data;
        } else {
            const response = await axios.post(
                'https://shark-app-on96m.ondigitalocean.app/api/products',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert('Product added successfully');
            return response.data;
        }
    } catch (error) {
        console.error('Error saving product:', error.response?.data || error.message);
        alert('Failed to save product.');
    }
};
