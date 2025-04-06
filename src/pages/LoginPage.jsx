import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [formData, setFormData] = useState({ userID: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const doctorToken = Cookies.get("doctor_token");
    const userToken = Cookies.get("user_token");
    const hospitalToken = Cookies.get("hospital_token");

    if (doctorToken || userToken || hospitalToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://siddhantrkokate.tech/doctor-desk-backend/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (formData.userID.length == 8) {
        Cookies.set("doctor_token", data, { expires: 7 });
      } else if (formData.userID.length == 9) {
        Cookies.set("userData", data, { expires: 7 });
      } else if (formData.userID.length == 6) {
        Cookies.set("hospitalName", data, { expires: 7 });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9ECEF] px-4">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Logo value={6} />
        </motion.div>

        <h2 className="text-3xl font-bold text-center text-[#212529] mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block mb-1 font-medium text-[#212529]">User ID</label>
            <input
              type="text"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#34A0A4]"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block mb-1 font-medium text-[#212529]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#34A0A4]"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#0077B6] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#023E8A] transition"
          >
            Log In
          </motion.button>

          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-sm text-[#212529]">Don't have an account? </span>
            <Link
              to="/register"
              className="text-sm text-[#F4A261] font-medium hover:underline"
            >
              Register as a new user
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
