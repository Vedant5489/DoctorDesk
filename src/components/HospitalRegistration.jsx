import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Cookies from "js-cookie"; // Import js-cookie

export default function HospitalRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    nin: "",
    email: "",
    password: "",
    photos: {
      pic1: null,
      pic2: null,
      pic3: null,
      pic4: null,
      pic5: null,
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photos") {
      const selectedFile = files[0];
      if (selectedFile) {
        const photoName = e.target.dataset.name;
        setFormData((prev) => ({
          ...prev,
          photos: {
            ...prev.photos,
            [photoName]: selectedFile,
          },
        }));
      }
    } else if (name === "nin") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, nin: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("H_name", formData.name);
    data.append("H_location", formData.location);
    data.append("H_description", formData.description);
    data.append("NIN_id", formData.nin);
    data.append("H_email", formData.email);
    data.append("H_password", formData.password);

    Object.keys(formData.photos).forEach((photoKey, index) => {
      const photo = formData.photos[photoKey];
      if (photo) {
        data.append(`H_pic${index + 1}`, photo);
      }
    });

    try {
      const response = await fetch(
        "https://siddhantrkokate.tech/doctor-desk-backend/api/hospital-registration.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        alert("Hospital registered successfully!");

        // ✅ Set cookie for hospital name
        Cookies.set("hospitalName", formData.name, { expires: 7 });

        // Optionally: Reset form
        setFormData({
          name: "",
          location: "",
          description: "",
          nin: "",
          email: "",
          password: "",
          photos: {
            pic1: null,
            pic2: null,
            pic3: null,
            pic4: null,
            pic5: null,
          },
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-xl p-6 shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center text-[#0077B6]">
        Hospital Registration
      </h2>

      {/* Hospital Name */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">
          Hospital Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          placeholder="Enter hospital name"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          placeholder="City, Address, etc."
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
          placeholder="hospital@example.com"
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
          placeholder="Briefly describe the hospital"
          required
        />
      </div>

      {/* NIN ID */}
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-1">
          NIN ID <span className="text-gray-500">(10 digits)</span>
        </label>
        <input
          type="text"
          name="nin"
          value={formData.nin}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4A261]"
          inputMode="numeric"
          maxLength={10}
          placeholder="e.g., 1234567890"
          required
        />
      </div>

      {/* Upload Photos */}
      <div className="space-y-4">
        {["pic1", "pic2", "pic3", "pic4", "pic5"].map((photo, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-[#212529] mb-2">
              Upload Photo {index + 1}
            </label>
            <label className="flex items-center gap-3 cursor-pointer px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F4A261] transition">
              <FaUpload className="text-[#F4A261]" />
              <span className="text-sm text-[#212529]">Choose Image</span>
              <input
                type="file"
                name="photos"
                accept="image/*"
                onChange={handleChange}
                data-name={photo}
                className="hidden"
              />
            </label>
            {formData.photos[photo] && (
              <div className="mt-2 text-sm text-green-700">
                {formData.photos[photo].name} selected
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#0077B6] hover:bg-[#34A0A4] text-white font-medium py-2 rounded-lg transition"
      >
        Submit Registration
      </button>
    </form>
  );
}
