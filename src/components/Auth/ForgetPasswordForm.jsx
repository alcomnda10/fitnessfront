import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mail, Loader2 } from 'lucide-react'

export const ForgetPasswordForm = ({ onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            // Mock API call to send reset email
            await fakeSendResetEmail(data.email);
            onSuccess(); // Show success message
        } catch (errors) {
            console.error('Error:', errors);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <section className='min-h-screen flex items-center justify-center p-4 bg-gray-50'>
            <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8'>
                <h2 className='font-bold text-3xl text-gray-900 text-center mb-6'>Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="Email">Email</label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type="email"
                                className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-colors'
                                id='Email'
                                placeholder='Enter your email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className='mt-6 space-y-4'>
                        <button 
                            type='submit' 
                            disabled={isLoading}
                            className='cursor-pointer flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                            {isLoading ? (
                                <>
                                    <Loader2 className='animate-spin -ml-1 mr-2 h-5 w-5' />
                                    Processing...
                                </>
                            ) : 'Send Reset Link'}
                        </button>
                        <p className="text-sm text-center text-gray-600">
                            Remember your password?{' '}
                            <Link to='/login' className="text-blue-600 hover:text-blue-700 font-medium">Back to Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}

// Mock API function
const fakeSendResetEmail = (email) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Reset link sent to ${email}`);
            resolve();
        }, 1500);
    });
};
