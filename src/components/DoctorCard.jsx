import { motion } from "framer-motion";

export default function DoctorCard({ doctor, onVisit }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition"
    >
      <img
        src={`https://siddhantrkokate.tech/doctor-desk-backend/images/doctors/${doctor.D_profile}`}
        alt={doctor.D_FName}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl  font-semibold text-[#0077B6] mb-1">
          {doctor.D_FName}&nbsp;{doctor.D_LName}
        </h3>
        <p className="text-sm text-[#212529] mb-2">{doctor.D_specialize}</p>
        
        <button
          onClick={() => onVisit(doctor.id)}
          className="px-4 py-2 bg-[#F4A261] text-white font-medium rounded-lg hover:bg-[#e07b3b] transition"
        >
          Visit
        </button>
      </div>
    </motion.div>
  );
}
