import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';

const Cart = ({ isOpen, onClose, cartItems, setCartItems }) => {
    const [loading, setLoading] = useState(false);

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            })
        );
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            await axios.post('https://shark-app-on96m.ondigitalocean.app/api/orders', {
                items: cartItems,
                total: total.toFixed(2)
            });

            alert('Order placed successfully!');
            setCartItems([]);
            onClose();
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6 text-teal-600" />
                        <h2 className="text-xl font-semibold">Your Cart</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty</p>
                    ) : (
                        cartItems.map(item => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-teal-600 font-semibold">${item.price}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="border-t p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold text-teal-600">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={cartItems.length === 0 || loading}
                    >
                        {loading ? 'Processing...' : `Checkout ($${total.toFixed(2)})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
