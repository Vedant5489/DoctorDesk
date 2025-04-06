import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HospitalRegistration from "../components/HospitalRegistration";
import UserRegistration from "../components/UserRegistration";
import DoctorRegistration from "../components/DoctorRegistration";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Cookies from "js-cookie";

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState("client");
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const doctorToken = Cookies.get("doctor_token");
    const userToken = Cookies.get("userData");
    const hospitalToken = Cookies.get("hospitalName");

    if (doctorToken || userToken || hospitalToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

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
    { id: "client", label: "Client" },
    { id: "hospital", label: "Hospital" },
    { id: "doctor", label: "Doctor" },
  ];



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0077B6] p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#E9ECEF] rounded-2xl shadow-lg overflow-hidden">

        {/* Sidebar */}
        <div className="md:w-1/3 bg-[#E9ECEF] p-6 flex flex-col items-center justify-between gap-6 border-r border-[#212529]">
          
          {/* Logo + Tabs */}
          <div className="w-full flex flex-col items-center">
            <Logo value={24} />

            <h2 className="text-xl font-bold mb-4 text-[#212529] text-center">
              Select Account Type
            </h2>

            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative w-full py-2 px-4 text-sm font-semibold rounded-full transition-all duration-300 text-center mb-2
                ${activeTab === tab.id
                    ? "bg-[#0077B6] text-white shadow-md"
                    : "bg-white text-[#212529] hover:text-[#34A0A4] hover:border-[#34A0A4] border-2 border-[#212529]"
                  }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Login Link */}
          <div className="text-sm text-[#212529] text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#0077B6] font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Form Area */}
        <div className="md:w-2/3 bg-[#E9ECEF] p-6">
          <h1 className="text-3xl font-semibold text-center mb-6 text-[#212529]">
            Create an Account
          </h1>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
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
