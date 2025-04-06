// components/Hospitals.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DoctorCard from "./DoctorCard"; // Make sure this file exists

const dummyDoctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Cardiologist",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Raj Patel",
    specialization: "Orthopedic",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
  },
];

export default function Hospitals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "https://siddhantrkokate.tech/doctor-desk-backend/api/hospital-data-glance.php",
          {
            method: "POST",
          }
        );
        const data = await response.json();
        setHospitals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleCardClick = async (hospitalId) => {
    try {
      const res = await fetch("https://siddhantrkokate.tech/doctor-desk-backend/api/doctors-show.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitalID: hospitalId }),
      });
      const result = await res.json();
      console.log("Clicked hospital:", result.doctors);
      setDoctor(result.doctors);
      handleViewDoctors(hospitalId);
    } catch (error) {
      console.error("Hospital click failed:", error);
    }
  };

  const handleViewDoctors = (hospitalId) => {
    setSelectedHospitalId(hospitalId);
  };

  const handleBack = () => {
    setSelectedHospitalId(null);
  };

  const filteredHospitals = hospitals.filter((h) =>
    (h.H_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#E9ECEF] min-h-screen p-6">
      {!selectedHospitalId ? (
        <>
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-6 px-4 py-2 border border-[#34A0A4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261] bg-white text-[#212529]"
          />

          {loading ? (
            <p className="text-center text-[#212529]">Loading hospitals...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital, index) => (
                <motion.div
                  key={hospital.H_id}
                  onClick={() => handleCardClick(hospital.H_id)}
                  className="bg-white p-4 rounded-xl shadow-md border border-[#34A0A4] hover:shadow-lg transition flex flex-col cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={hospital.H_pic1}
                    alt={hospital.H_name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold text-[#0077B6] mb-1">
                    {hospital.H_name}
                  </h3>
                  <p className="text-sm text-[#212529] mb-1">
                    {hospital.H_location}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {hospital.H_description}
                  </p>
                  <div className="text-sm text-gray-500 mt-2">
                    {new Date(hospital.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(hospital.H_id);
                    }}
                    className="mt-4 bg-[#0077B6] hover:bg-[#34A0A4] text-white text-sm py-2 px-4 rounded-lg transition self-start"
                  >
                    View Doctors
                  </button>
                </motion.div>
              ))}
              {filteredHospitals.length === 0 && (
                <p className="text-[#212529] col-span-full text-center">
                  No hospitals found.
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <div>
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#023E8A]"
          >
            Back to Hospitals
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctor.map((doc) => (
              <DoctorCard key={doc.D_id} doctor={doc} onVisit={() => alert(`Visiting ${doc.D_FName}`)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}