import { useState } from 'react';
import { BarChart3, Activity, Users, DollarSign, TrendingUp, Calendar, Settings, Bell, Package, Edit, Trash2, ShoppingCart, Eye, X } from 'lucide-react';

const Dashboard = () => {
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [showEditOrderModal, setShowEditOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [orders, setOrders] = useState([
        { id: '#ORD-001', customer: 'John Doe', products: 'Protein Powder, Pre-Workout', total: '$64.98', date: '2024-01-15', status: 'Completed' },
        { id: '#ORD-002', customer: 'Jane Smith', products: 'Resistance Band Set', total: '$19.99', date: '2024-01-16', status: 'Processing' },
        { id: '#ORD-003', customer: 'Mike Johnson', products: 'Gym Gloves, Protein Powder', total: '$44.98', date: '2024-01-16', status: 'Pending' },
        { id: '#ORD-004', customer: 'Sarah Wilson', products: 'Pre-Workout', total: '$34.99', date: '2024-01-17', status: 'Cancelled' },
    ]);
    const [newOrder, setNewOrder] = useState({
        customer: '',
        products: '',
        total: '',
        status: 'Pending'
    });
    const [products, setProducts] = useState([
        { id: 1, name: 'Protein Powder', category: 'Supplements', price: '29.99', stock: 45, status: 'In Stock' },
        { id: 2, name: 'Resistance Band Set', category: 'Equipment', price: '19.99', stock: 30, status: 'Low Stock' },
        { id: 3, name: 'Gym Gloves', category: 'Accessories', price: '14.99', stock: 0, status: 'Out of Stock' },
        { id: 4, name: 'Pre-Workout', category: 'Supplements', price: '34.99', stock: 25, status: 'In Stock' },
    ]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const status = parseInt(newProduct.stock) === 0 ? 'Out of Stock' :
            parseInt(newProduct.stock) <= 30 ? 'Low Stock' : 'In Stock';
        const product = {
            id: products.length + 1,
            ...newProduct,
            status
        };
        setProducts([...products, product]);
        setShowAddProductModal(false);
        setNewProduct({
            name: '',
            category: '',
            price: '',
            stock: ''
        });
    };

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    const handleAddOrder = (e) => {
        e.preventDefault();
        const order = {
            id: `#ORD-${String(orders.length + 1).padStart(3, '0')}`,
            ...newOrder,
            date: new Date().toISOString().split('T')[0]
        };
        setOrders([...orders, order]);
        setShowAddOrderModal(false);
        setNewOrder({
            customer: '',
            products: '',
            total: '',
            status: 'Pending'
        });
    };

    const handleUpdateOrder = (e) => {
        e.preventDefault();
        setOrders(orders.map(order =>
            order.id === selectedOrder.id ? { ...selectedOrder } : order
        ));
        setShowEditOrderModal(false);
        setSelectedOrder(null);
    };

    const handleDeleteOrder = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    const handleOrderInputChange = (e) => {
        const { name, value } = e.target;
        if (showEditOrderModal) {
            setSelectedOrder(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setNewOrder(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const stats = [
        { title: 'Total Users', value: '1,234', icon: Users, change: '+12%', color: 'bg-blue-500' },
        { title: 'Revenue', value: '$12,345', icon: DollarSign, change: '+8%', color: 'bg-green-500' },
        { title: 'Active Members', value: '856', icon: Activity, change: '+5%', color: 'bg-purple-500' },
        { title: 'Growth Rate', value: '23%', icon: TrendingUp, change: '+2%', color: 'bg-orange-500' },
    ];

    const recentActivities = [
        { user: 'John Doe', action: 'Started a new workout plan', time: '2 hours ago' },
        { user: 'Jane Smith', action: 'Completed daily challenge', time: '4 hours ago' },
        { user: 'Mike Johnson', action: 'Achieved fitness goal', time: '6 hours ago' },
        { user: 'Sarah Wilson', action: 'Joined premium membership', time: '8 hours ago' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                        <Bell className="h-6 w-6" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                        <Settings className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`rounded-full ${stat.color} p-3`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-sm font-medium text-green-600">{stat.change}</span>
                            <span className="ml-2 text-sm text-gray-600">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Activity Overview</h2>
                        <button className="text-sm text-teal-600 hover:text-teal-700">View All</button>
                    </div>
                    <div className="relative h-[300px] w-full">
                        <div className="flex h-full items-end justify-between gap-2">
                            {[40, 70, 45, 90, 65, 30, 85].map((height, index) => (
                                <div key={index} className="w-full">
                                    <div
                                        className="bg-teal-500 transition-all hover:bg-teal-600"
                                        style={{ height: `${height}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-4">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                                <span key={index} className="text-sm text-gray-600">{day}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                        <button className="text-sm text-teal-600 hover:text-teal-700">View All</button>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0">
                                <div className="rounded-full bg-gray-100 p-2">
                                    <Calendar className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{activity.user}</p>
                                    <p className="text-sm text-gray-600">{activity.action}</p>
                                    <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Management Section */}
            <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Products Management</h2>
                    <button
                        onClick={() => setShowAddProductModal(true)}
                        className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                    >
                        Add New Product
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <Package className="mr-2 h-5 w-5 text-gray-400" />
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.category}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.price}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' : product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setShowEditProductModal(true);
                                                }}
                                                className="cursor-pointer text-blue-600 hover:text-blue-900"
                                                title="Edit Product"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="cursor-pointer text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Orders Management Section */}
            <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Orders Management</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowAddOrderModal(true)}
                            className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                        >
                            Add New Order
                        </button>
                        <select
                            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm"
                            value={filterStatus || 'all'}
                            onChange={(e) => {
                                if (typeof setFilterStatus === 'function') {
                                    setFilterStatus(e.target.value);
                                }
                            }}
                        >
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Products</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <ShoppingCart className="mr-2 h-5 w-5 text-gray-400" />
                                            <span className="font-medium text-gray-900">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{order.customer}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{order.products}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowEditOrderModal(true);
                                                }}
                                                className="cursor-pointer text-blue-600 hover:text-blue-900"
                                                title="Edit Order"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="cursor-pointer text-red-600 hover:text-red-900"
                                                title="Delete Order"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Product Modal */}
            {showAddProductModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Product</h3>
                            <button
                                onClick={() => setShowAddProductModal(false)}
                                className="cursor-pointer text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Supplements">Supplements</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={newProduct.stock}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddProductModal(false)}
                                    className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Edit Product Modal */}
            {showEditProductModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Edit Product</h3>
                            <button
                                onClick={() => {
                                    setShowEditProductModal(false);
                                    setSelectedProduct(null);
                                }}
                                className="cursor-pointer text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                setProducts(products.map(product =>
                                    product.id === selectedProduct.id ? selectedProduct : product
                                ));
                                setShowEditProductModal(false);
                                setSelectedProduct(null);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={selectedProduct.name}
                                    onChange={e => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={selectedProduct.category}
                                    onChange={e => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Supplements">Supplements</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                <input
                                    type="number"
                                    value={selectedProduct.price}
                                    onChange={e => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    value={selectedProduct.stock}
                                    onChange={e => {
                                        const stock = e.target.value;
                                        let status = 'In Stock';
                                        if (parseInt(stock) === 0) status = 'Out of Stock';
                                        else if (parseInt(stock) <= 30) status = 'Low Stock';
                                        setSelectedProduct({ ...selectedProduct, stock, status });
                                    }}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditProductModal(false);
                                        setSelectedProduct(null);
                                    }}
                                    className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Order Modal */}
            {showAddOrderModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Order</h3>
                            <button
                                onClick={() => setShowAddOrderModal(false)}
                                className="cursor-pointer text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddOrder} className="space-y-4">
                            <div>
                                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    id="customer"
                                    name="customer"
                                    value={newOrder.customer}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="products" className="block text-sm font-medium text-gray-700">
                                    Products
                                </label>
                                <input
                                    type="text"
                                    id="products"
                                    name="products"
                                    value={newOrder.products}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                                    Total Amount ($)
                                </label>
                                <input
                                    type="text"
                                    id="total"
                                    name="total"
                                    value={newOrder.total}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newOrder.status}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddOrderModal(false)}
                                    className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                                >
                                    Add Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Order Modal */}
            {showEditOrderModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Edit Order</h3>
                            <button
                                onClick={() => {
                                    setSelectedOrder(false); // Pass the current order directly
                                    setShowEditOrderModal(true);
                                }}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateOrder} className="space-y-4">
                            <div>
                                <label htmlFor="edit-customer" className="block text-sm font-medium text-gray-700">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    id="edit-customer"
                                    name="customer"
                                    value={selectedOrder.customer}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-products" className="block text-sm font-medium text-gray-700">
                                    Products
                                </label>
                                <input
                                    type="text"
                                    id="edit-products"
                                    name="products"
                                    value={selectedOrder.products}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-total" className="block text-sm font-medium text-gray-700">
                                    Total Amount ($)
                                </label>
                                <input
                                    type="text"
                                    id="edit-total"
                                    name="total"
                                    value={selectedOrder.total}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="edit-status"
                                    name="status"
                                    value={selectedOrder.status}
                                    onChange={handleOrderInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditOrderModal(false);
                                        setSelectedOrder(null);
                                    }}
                                    className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                                >
                                    Update Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;