import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function HospitalRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    nin: "",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photos") {
      const selectedFiles = Array.from(files);
      if (selectedFiles.length > 5) {
        alert("You can only upload up to 5 photos.");
        return;
      }
      setFormData({ ...formData, photos: selectedFiles });
    } else if (name === "nin") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, nin: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hospital Form Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-xl p-6 shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center text-[#023047]">Hospital Registration</h2>

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
      <div>
        <label className="block text-sm font-medium text-[#212529] mb-2">
          Upload Photos <span className="text-gray-500">(Max 5)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F4A261] transition">
          <FaUpload className="text-[#F4A261]" />
          <span className="text-sm text-gray-600">Choose Images</span>
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {formData.photos.length > 0 && (
          <div className="mt-2 text-sm text-green-700">
            {formData.photos.length} photo(s) selected
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-white border-2 border-[#34A0A4] hover:text-white text-[#34A0A4] font-medium py-2 rounded-lg hover:bg-[#34A0A4] transition"
      >
        Submit Registration
      </button>
    </form>
  );
}
