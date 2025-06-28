import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePlan = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('auth_token')

            await axios.post('https://shark-app-on96m.ondigitalocean.app/api/plans', {
                ...data,
                highlighted: data.highlighted === "true", 
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            alert("Plan created successfully!")
            navigate('/pricing')
        } catch (error) {
            console.error(error.response?.data)
            alert("Error creating plan.")
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Plan</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block mb-1 font-medium">Plan Name</label>
                    <input type="text" {...register("name", { required: "Name is required" })} className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input type="number" step="0.01" {...register("price", { required: "Price is required" })} className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Period</label>
                    <input type="text" {...register("period", { required: "Period is required" })} placeholder="e.g. per month" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    {errors.period && <p className="text-red-500 text-sm">{errors.period.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea {...register("description", { required: "Description is required" })} className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Highlighted?</label>
                    <select {...register("highlighted", { required: "Please select highlighted status" })} className="w-full border border-gray-300 px-4 py-2 rounded-md">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                    {errors.highlighted && <p className="text-red-500 text-sm">{errors.highlighted.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Features (comma-separated)</label>
                    <input type="text" {...register("features", { required: "Features are required" })} placeholder="e.g. Gym Access, Personal Trainer, Diet Plan" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    {errors.features && <p className="text-red-500 text-sm">{errors.features.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Button Text</label>
                    <input type="text" {...register("button_text", { required: "Button text is required" })} placeholder="e.g. Choose Plan" className="w-full border border-gray-300 px-4 py-2 rounded-md" />
                    {errors.button_text && <p className="text-red-500 text-sm">{errors.button_text.message}</p>}
                </div>

                <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition">Create Plan</button>
            </form>
        </div>
    )
}

export default CreatePlan
