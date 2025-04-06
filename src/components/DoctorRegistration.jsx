import React, { useEffect, useState } from "react";
import $ from "jquery";
import { FaUpload } from "react-icons/fa";
import Cookies from "js-cookie";

export default function DoctorForm() {
 const [Hospital, setHospital] = useState([]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        specialization: "",
        H_id: "", // ✅ New field
        phoneNumber: "",
        email: "",
        password: "",
        description: "",
        gender: "",
    });

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await fetch(
                    "https://siddhantrkokate.tech/doctor-desk-backend/api/hospital-data-for-doctor-registration.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                    }
                );
                const data = await response.json();
                setHospital(data);
                console.log(data);

            } catch (error) {
                console.error("Error fetching hospital data:", error);
            }
        };

        fetchHospitalData();
    }, []);



    


    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            if (/^\d{0,10}$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        data.append("profile_image", selectedImage);

        $.ajax({
            url: "https://siddhantrkokate.tech/doctor-desk-backend/api/doctors-registration.php",
            method: "POST",
            data,
            contentType: false,
            processData: false,
            success: (response) => {
                setLoading(false);

                if (response.status === "success") {
                    setMessage("✅ Doctor registered successfully!");
                    console.log(response);
                    Cookies.set("doctor_token", response.token, { expires: 7 });

                    setFormData({
                        firstName: "",
                        lastName: "",
                        specialization: "",
                        H_id: "", // ✅ Reset new field
                        phoneNumber: "",
                        email: "",
                        password: "",
                        description: "",
                        gender: "",
                    });
                    setSelectedImage(null);
                } else {
                    setMessage("❌ " + (response.message || "Registration failed."));
                }
            },
            error: () => {
                setLoading(false);
                setMessage("❌ Something went wrong. Please try again.");
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white rounded-xl p-6 shadow-md"
        >
            <h2 className="text-2xl font-semibold text-center text-[#0077B6]">
                Doctor Registration
            </h2>

            {message && (
                <div className="text-sm font-medium text-center">{message}</div>
            )}

            {/* First Name */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="Enter first name"
                    required
                />
            </div>

            {/* Last Name */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="Enter last name"
                    required
                />
            </div>

            {/* H_id Dropdown */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Hospital
                </label>
                <select
                    name="H_id"
                    value={formData.H_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    required
                >
                    <option value="">Select H_id</option>
                    {Hospital.map((dept, index) => (
                        <option key={index} className=" space-x-2" value={dept[1]}>
                            {dept[0]}
                        </option>
                    ))}
                </select>
            </div>

            {/* Specialization */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Specialization
                </label>
                <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="e.g. Cardiologist, Neurologist"
                    required
                />
            </div>

            {/* Phone Number */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Phone Number <span className="text-gray-500">(10 digits)</span>
                </label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    maxLength={10}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="e.g., 9876543210"
                    required
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="doctor@example.com"
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="Enter a secure password"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
                    placeholder="Write about the doctor"
                    required
                />
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-1">
                    Gender
                </label>
                <div className="flex items-center space-x-4">
                    {["Male", "Female", "Other"].map((gender) => (
                        <label className="flex items-center space-x-2" key={gender}>
                            <input
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={formData.gender === gender}
                                onChange={handleChange}
                                required
                            />
                            <span>{gender}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Upload Profile Image */}
            <div>
                <label className="block text-sm font-medium text-[#212529] mb-2">
                    Profile Image
                </label>
                <label className="flex items-center gap-3 cursor-pointer px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F4A261] transition">
                    <FaUpload className="text-[#F4A261]" />
                    <span className="text-sm text-[#212529]">
                        {selectedImage ? selectedImage.name : "Choose Image"}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                    />
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-[#0077B6] hover:bg-[#34A0A4] text-white font-medium py-2 rounded-lg transition"
                disabled={loading}
            >
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}
