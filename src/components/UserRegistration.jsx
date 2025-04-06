import { useEffect,useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// ...inside component

export default function UserRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    password: "",
    gender: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("https://siddhantrkokate.tech/doctor-desk-backend/api/patient-registration.php", formData); // Replace with your real API

      // Store user info in cookies
      Cookies.set("userData", JSON.stringify(response.data), { expires: 7 });

      setMessage("✅ Registration successful!");
      console.log("Response saved in cookies:", response.data);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("❌ Registration failed:", error);
      setMessage("❌ Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-center text-[#0077B6]">User Registration</h2>

      {message && <div className="text-sm font-medium text-center">{message}</div>}

      {/* All input fields (same as your previous code) */}
      {/* ... (firstName, lastName, gender, email, birthDate, address, phoneNumber, password) */}

      {/* Example of one input field */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">First Name</label>
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
        <label className="block text-sm font-medium text-[#212529] mb-1">Last Name</label>
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

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">Gender</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <span>Female</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            <span>Other</span>
          </label>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Birthdate */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">Birthdate</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          required
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          placeholder="Street, City, ZIP"
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          inputMode="numeric"
          maxLength={10}
          placeholder="1234567890"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bor{/* Continue adding the other fields like before... */}der border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          placeholder="Enter a strong password"
          required
        />
      </div>

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
