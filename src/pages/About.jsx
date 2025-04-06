// pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const teamMembers = [
  {
    name: "Vedant Patil",
    role: "Database Designer and Administrator",
    description:
      "Store, Retrieve, Update and Delete…! ....and Repeat! He is the unseen engine room, the silent force that keeps the system alive and breathing. Vedant carved the very foundation of the platform by designing a database so efficient, so robust, not a single byte goes misplaced. From structuring relational tables to ensuring smooth CRUD operations, every query speaks of his mastery.",
  },
  {
    name: "Rudra Langote",
    role: "Front End Design",
    description:
      "More than meets the eye...! Rudra has given his hands-on experience to make the platform smooth, simple and easy to navigate, that has ultimately contributed in its usability, feasibility and overall accessibility. His powerful designs raise the bar high to define what we call supremacy. He had his designs sorted and analysed as to how it looks the way it is…!",
  },
  {
    name: "Arvind Singh",
    role: "Front End Developer",
    description:
      "What was eye pleasing, was what he did…! All the execution and updation has been finely sorted and implemented and all that is thanks to Arvind...! He had his hands greyed over designing all that asked for precision and patience. Arvind put forth all the bells and whistles to execute the looks of the project.",
  },
  {
    name: "Siddhant Kokate",
    role: "Backend and API designer",
    description:
      "Is the beauty, so are the brains...! Siddhant proved his powerful expertise with designing APIs that seamlessly handled data throughout the pipeline that was unwavering and reliable…! He is all the brains of how things were designed to think and work along with all the might of Artificial Intelligence…!",
  },
  {
    name: "Angat Mali",
    role: "Digital Content & Design Executive",
    description:
      "What won the heart, was what was Angat’s thought…! The trademark, the logo, the content…. It was all Angat’s powerhouse. He had his unshaken creativity over the passing time that sustained throughout the stressful time which brought the eye catchy lines to reality. Indeed, he is one of the best Content Designers.",
  },
];

export default function About() {
  return (
    <motion.div
      className="bg-[#E9ECEF] min-h-screen py-10 px-6 sm:px-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-bold text-[#0077B6] mb-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        About DoctorDesk
      </motion.h1>

      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 border-l-4 border-[#F4A261] mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h2 className="text-2xl font-semibold text-[#34A0A4] mb-2">
          Website Description
        </motion.h2>
        <motion.p className="text-[#212529] leading-relaxed">
          DoctorDesk is a comprehensive healthcare platform designed to bridge the gap between patients and hospitals. It allows users to explore detailed information about nearby hospitals and the doctors affiliated with them. The application streamlines the process of discovering healthcare services, reading about specializations, and accessing vital contact details — all from a single, user-friendly interface. With a focus on accessibility, clarity, and reliability, DoctorDesk is committed to making medical care more approachable for everyone.
        </motion.p>
      </motion.div>

      <motion.h2
        className="text-3xl font-semibold text-[#0077B6] mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Meet the Team
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#0077B6] cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h3 className="text-2xl font-semibold text-[#34A0A4]">
              {member.name}
            </motion.h3>
            <motion.p className="text-sm text-[#212529] italic">
              ({member.role})
            </motion.p>
            <motion.p className="mt-2 text-[#212529]">
              {member.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
