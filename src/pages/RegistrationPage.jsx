import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HospitalRegistration from "../components/HospitalRegistration";
import UserRegistration from "../components/UserRegistration";
import DoctorRegistration from "../components/DoctorRegistration";

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState("user");

  const renderTab = () => {
    switch (activeTab) {
      case "hospital":
        return <HospitalRegistration />;
      case "doctor":
        return <DoctorRegistration />;
      default:
        return <UserRegistration />;
    }
  };

  const tabs = [
    { id: "user", label: "User" },
    { id: "hospital", label: "Hospital" },
    { id: "doctor", label: "Doctor" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0077B6] p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#E9ECEF] rounded-2xl shadow-lg overflow-hidden">

        {/* Sidebar Tabs */}
        <div className="md:w-1/3 bg-[#E9ECEF] p-6 flex flex-col items-center justify-center gap-4 border-r border-black">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Select Account Type</h2>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative w-full py-2 px-4 text-sm font-semibold rounded-full transition-all duration-300 text-center
                ${
                  activeTab === tab.id
                    ? "bg-[#0077B6] text-white shadow-md"
                    : "bg-white text-gray-700 hover:text-[#34A0A4] hover:border-[#34A0A4] border-2"
                }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Form Content with Scrollable Inner Form Component */}
        <div className="md:w-2/3 bg-[#E9ECEF] p-6">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Create an Account</h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-xl max-h-[65vh] overflow-y-auto"
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
