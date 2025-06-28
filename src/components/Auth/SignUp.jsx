import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Loader2 } from 'lucide-react';

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://shark-app-on96m.ondigitalocean.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.errors);
        const errorMessages = result.errors
          ? Object.values(result.errors).flat().join('\n')
          : result.message || 'Signup failed';
        alert(errorMessages);
        return;
      }


      alert('Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='min-h-screen flex items-center justify-center p-4 bg-gray-50'>
      <div className='w-full max-w-2xl bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8'>
        <h2 className='font-bold text-2xl sm:text-3xl text-gray-900 text-center mb-4 sm:mb-6'>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                <input
                  type='text'
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-colors'
                  placeholder='Enter your first name'
                  {...register('firstName', { required: 'First Name is required' })}
                />
              </div>
              {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName.message}</p>}
            </div>

            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                <input
                  type='text'
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-colors'
                  placeholder='Enter your last name'
                  {...register('lastName', { required: 'Last Name is required' })}
                />
              </div>
              {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName.message}</p>}
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                <input
                  type='email'
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-colors'
                  placeholder='Enter your email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' },
                  })}
                />
              </div>
              {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
            </div>

            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                <input
                  type='password'
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-colors'
                  placeholder='Enter your password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                />
              </div>
              {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
            </div>
          </div>

          <div className='mt-6 space-y-4'>
            <button
              type='submit'
              disabled={isLoading}
              className='cursor-pointer flex items-center justify-center w-full px-3 sm:px-4 py-2.5 sm:py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
            >
              {isLoading ? (
                <>
                  <Loader2 className='animate-spin -ml-1 mr-2 h-5 w-5' />
                  Processing...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
            <p className='text-sm text-center text-gray-600'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-600 hover:text-blue-700 font-medium'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
