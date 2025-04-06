import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function Profile() {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    birthDate: "",
    address: "",
    phone: "",
    email: "",
    gender: "",
  });

  // useEffect to update the form data once the component mounts
  useEffect(() => {
    const data = Cookies.get('userData') || Cookies.get('hospitalName') || Cookies.get('doctor_token');

    if (data) {
      try {
        const parseData = JSON.parse(data); // Parse the cookie data
        setFormData({
          userId: parseData.user_data.P_id || "", // Make sure the key exists in the data
          name: parseData.user_data?.firstName || "",
          birthDate: parseData.user_data?.birthDate || "",
          address: parseData.user_data?.address || "",
          phone: parseData.user_data?.phoneNumber || "", // Ensure this key is correct
          email: parseData.user_data?.email || "",
          gender: parseData.user_data?.gender || "",
        });

        console.log(parseData.user_data); // To verify the data
      } catch (err) {
        console.error("Failed to parse cookie data:", err);
      }
    }
  }, []);

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Profile saved:", formData);
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto mt-10 border border-gray-200"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0077B6]">My Profile</h2>
        {!editing && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditing(true)}
            className="text-sm px-4 py-1 border border-[#0077B6] text-[#0077B6] rounded-full hover:bg-[#0077B6] hover:text-white transition"
          >
            Edit
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AnimatedField
          label="User ID"
          value={formData.userId}
          disabled
        />
        <AnimatedField
          label="Name"
          name="name"
          value={formData.name}
          editing={editing}
          onChange={handleChange}
        />
        <AnimatedField
          label="Birth Date"
          name="birthDate"
          value={formData.birthDate}
          type="date"
          editing={editing}
          onChange={handleChange}
        />
        <AnimatedField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          type="text"
          editing={editing}
          onChange={handleChange}
        />
        <AnimatedField
          label="Email"
          name="email"
          value={formData.email}
          type="email"
          editing={editing}
          onChange={handleChange}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-[#212529] mb-1">Gender</label>
          <select
            name="gender"
            disabled={!editing}
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border transition ${
              editing
                ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34A0A4]"
                : "bg-gray-100 text-gray-600 border-transparent"
            }`}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </motion.div>

        <AnimatedField
          label="Address"
          name="address"
          value={formData.address}
          editing={editing}
          onChange={handleChange}
          full
        />
      </div>

      {editing && (
        <motion.div
          className="flex justify-end gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditing(false)}
            className="px-5 py-2 bg-gray-200 text-[#212529] rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-5 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#023E8A] transition"
          >
            Save Changes
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Field with motion animation
function AnimatedField({ label, name, value, onChange, type = "text", disabled = false, editing, full = false }) {
  return (
    <motion.div
      className={full ? "col-span-full" : ""}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <label className="block text-sm font-medium text-[#212529] mb-1">{label}</label>
      <input
        type={type}
        name={name}
        disabled={disabled || !editing}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg border transition ${
          disabled || !editing
            ? "bg-gray-100 text-gray-600 border-transparent"
            : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34A0A4]"
        }`}
      />
    </motion.div>
  );
}
