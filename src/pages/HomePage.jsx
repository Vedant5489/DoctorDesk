import GeminiHealthSearch from "../components/GeminiHealthSearch";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function HomePage() {
  const navigate = useNavigate(); 
  useEffect(() => {
    const doctorToken = Cookies.get("doctor_token");
    const userToken = Cookies.get("userData");
    const hospitalToken = Cookies.get("hospitalName");

    if (doctorToken || userToken || hospitalToken) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className="bg-[#E9ECEF] text-[#212529]">
      {/* Top-right Logo */}
      <div className="absolute top-4 right-8 z-50">
        <Logo value={2} />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 gap-12">
        {/* Text Side */}
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#212529]">
            Your Health, Our Priority — <br />
            <span className="text-[#0077B6]">Trusted Care at Your Fingertips</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
            Consult trusted doctors, book appointments, and access modern diagnostics — all in one place. Your well-being is our mission at <span className="font-semibold text-[#0077B6]">DoctorDesk</span>.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <Link to="/login">
              <button className="bg-[#0077B6] w-40 hover:bg-[#34A0A4] text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-500 ease-in-out">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="border border-[#0077B6] w-40 text-[#0077B6] px-6 py-2 rounded-lg hover:bg-[#34A0A4] hover:text-white hover:shadow-lg transition-all duration-500 ease-in-out">
                Sign Up
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          className="md:w-1/2 relative rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0077B6]/60 via-transparent to-[#34A0A4]/60 z-10 rounded-xl pointer-events-none" />
          <img
            src="/doctor.jpeg"
            alt="Doctor consulting patient"
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-in-out hover:scale-105"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="text-center py-16 px-4 md:px-12">
        <motion.h2
          className="text-3xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <span className="text-[#34A0A4]">Our Commitment</span> to the society
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Feature title="Locate" description="Locate the best hospital and doctor to get yourself cured in worst condition." />
          <Feature title="Consult" description="Book appointments and consult doctors easily and securely." />
          <Feature title="Rehabilitate" description="Access the best treatment and rehabilitation plans post-consultation." />
        </div>
      </section>

      {/* Doctors */}
      <section className="py-12 px-4 md:px-12">
        <motion.h2
          className="text-3xl font-semibold text-center mb-8 text-[#0077B6]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          Doctors & Specialists
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <DoctorCard name="Dr. Arvind" image="./arvind.jpeg" specialty="Cardiologist" />
          <DoctorCard name="Dr. Rudra" image="./rudra.jpeg" specialty="Gynecologist" />
          <DoctorCard name="Dr. Angat" image="../angad.jpeg" specialty="Pediatrician" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-12 bg-[#E9ECEF]">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-center text-[#0077B6] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <Testimonial content='“This platform transformed how we manage healthcare—saving us time and improving outcomes!”' name="Shraddha Rajput" />
          <Testimonial content='"Such a helpful website to get perfect consutation and it’s easy to operate the website for finding perfect doctor and hospital to get perfect cure for diseases"' name="Vedant Patil" />
          <Testimonial content='"I was suffering from a lot of chest pain and I was assuming that it might be cardiac arrest or similar to that but the website’s AI symptoms checker gave me a rough idea about the disease in which chest pain can be seen and through AI summary I got the perfect details of doctor and hospital and it’s ease to get an appointment through the website"' name="Siddhant Kokate" />
        </div>
      </section>

      {/* Chatbot */}
      <section className="py-20 px-4 md:px-12 bg-[#E9ECEF] border-t border-[#E9ECEF]">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#0077B6] mb-4">
          Need Help? Chat with Our AI Assistant
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Ask anything — from symptoms to appointment queries — and get instant, reliable responses from our intelligent healthcare chatbot.
        </p>
        <div className="max-w-4xl mx-auto bg-[#E9ECEF] p-6 rounded-xl ">
          <GeminiHealthSearch />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#E9ECEF] text-[#212529] py-12 px-4 mt-8 border-t border-gray-300">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <Logo value={2} />

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a href="#" className="hover:underline hover:text-[#F4A261] transition duration-300">Home</a>
            <Link to="/about" className="hover:underline hover:text-[#F4A261] transition duration-300">About</Link>
            <a href="#" className="hover:underline hover:text-[#F4A261] transition duration-300">Services</a>
            <a href="#" className="hover:underline hover:text-[#F4A261] transition duration-300">Specialists</a>
            <a href="#" className="hover:underline hover:text-[#F4A261] transition duration-300">Terms & Conditions</a>
          </div>

          <p className="text-xs text-[#212529] text-center mt-4">
            © {new Date().getFullYear()} DoctorDesk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-[#f8f9fa] cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h3 className="font-semibold text-lg text-[#0077B6] mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function DoctorCard({ name, specialty, image }) {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-500 ease-in-out"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full h-60 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="font-semibold text-[#0077B6] text-lg">{name}</h4>
      <p className="text-sm text-gray-600">{specialty}</p>
    </motion.div>
  );
}

function Testimonial({ name, content }) {
  return (
    <motion.div
      className="bg-white p-6 h-72 rounded-xl shadow-md border-t-4 border-[#F4A261] max-w-sm hover:shadow-lg transition-all duration-500 ease-in-out"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <p className="text-gray-700 italic mb-4">
        {content}
      </p>
      <p className="text-sm text-[#0077B6] font-semibold">{name}</p>
    </motion.div>
  );
}
