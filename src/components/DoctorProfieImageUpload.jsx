import { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function DoctorProfileImageUpload({ userData }) {
  const [data, setData] = useState({
    user: userData,
    file: null,
  });

  const handleFileChange = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Data:", data);
    // TODO: Upload to server
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-center text-[#0077B6] mb-6">
        Upload Profile Picture
      </h2>

      <form className="space-y-6">
        <label
          htmlFor="profile-upload"
          className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 hover:border-[#F4A261] transition px-6 py-10 rounded-xl cursor-pointer text-gray-500 hover:text-[#F4A261]"
        >
          <FaUpload className="text-2xl mb-2" />
          {data.file ? (
            <span className="text-sm text-[#212529] font-medium">
              {data.file.name}
            </span>
          ) : (
            <>
              <span className="text-sm">Click to select an image</span>
              <span className="text-xs text-gray-400">(JPG, PNG, Max 5MB)</span>
            </>
          )}
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required
          />
        </label>

        <button
          onClick={handleUpload}
          className="w-full bg-[#0077B6] hover:bg-[#34A0A4] text-white font-medium py-2 rounded-lg transition"
        >
          Upload & Continue
        </button>
      </form>
    </div>
  );
}
