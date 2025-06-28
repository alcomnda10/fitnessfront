import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';

const ProductsManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('https://shark-app-on96m.ondigitalocean.app/api/products');
            setProducts(res.data);
        } catch (err) {
            setError('Failed to load products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await axios.delete(`https://shark-app-on96m.ondigitalocean.app/api/products/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            alert('Failed to delete product.');
        }
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingProduct) {
                // تعديل
                await axios.post(`https://shark-app-on96m.ondigitalocean.app/api/products/${editingProduct.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // إضافة
                await axios.post('https://shark-app-on96m.ondigitalocean.app/api/products', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            setModalOpen(false);
            fetchProducts();
        } catch (err) {
            alert('Failed to save product.');
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
            <button
                className="cursor-pointer mb-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                onClick={openAddModal}
            >
                Add New Product
            </button>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="text-center">
                            <td className="border px-4 py-2">{product.id}</td>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.description}</td>
                            <td className="border px-4 py-2">${product.price}</td>
                            <td className="border px-4 py-2">
                                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
                            </td>
                            <td className="border px-4 py-2 space-x-2">
                                <button
                                    className="cursor-pointer px-2 py-1 rounded bg-teal-600 text-white hover:bg-teal-500"
                                    onClick={() => openEditModal(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="cursor-pointer bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddProduct
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                product={editingProduct}
            />
        </div>
    );
};

export default ProductsManagement;
