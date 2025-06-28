import React, { useState, useEffect, useRef } from "react";
import axios from "../axios"; // تأكد أن هذا الملف يحتوي على إعداد baseURL لسيرفر Laravel
import { CameraIcon, SaveIcon, EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [profile, setProfile] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const token = localStorage.getItem("auth_token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get("/profile")
            .then((res) => {
                setProfile(res.data);
                setEditForm(res.data);
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        axios
            .put("/profile", editForm)
            .then((res) => {
                setProfile(res.data.user || res.data);
                setEditForm(res.data.user || res.data);
                setIsEditing(false);
                localStorage.setItem("auth_user", JSON.stringify(res.data.user || res.data));
            })
            .catch((err) => {
                console.error("Error updating profile", err);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        setIsUploading(true);
        axios
            .post("/profile/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                const updatedProfile = { ...profile, avatar: res.data.avatar_url };
                setProfile(updatedProfile);
                localStorage.setItem("auth_user", JSON.stringify(updatedProfile));
            })
            .catch((err) => {
                console.error("Upload error", err);
            })
            .finally(() => {
                setIsUploading(false);
            });
    };

    if (!profile) return <div className="text-center mt-10">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 mt-20">
            <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <img
                            src={profile.avatar}
                            alt="avatar"
                            className="w-24 h-24 rounded-full object-cover border"
                        />

                        <button
                            className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full"
                            onClick={handleImageClick}
                            title="Change avatar"
                        >
                            <CameraIcon className="w-4 h-4" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                            className="hidden"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{profile.first_name} {profile.last_name}</h2>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                        {isUploading && <p className="text-sm text-blue-500">Uploading...</p>}
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {[
                        { label: "First Name", name: "first_name" },
                        { label: "Last Name", name: "last_name" },
                        { label: "Phone", name: "phone" },
                        { label: "Location", name: "location" },
                        { label: "Bio", name: "bio", textarea: true },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            {isEditing ? (
                                field.textarea ? (
                                    <textarea
                                        name={field.name}
                                        value={editForm[field.name] || ""}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={editForm[field.name] || ""}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                )
                            ) : (
                                <p className="mt-1 text-gray-800">{profile[field.name] || "—"}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                            disabled={isSaving}
                        >
                            <SaveIcon className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            <EditIcon className="w-4 h-4" />
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
