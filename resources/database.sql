-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 06, 2025 at 04:19 AM
-- Server version: 10.11.10-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u718064366_doctordesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `D_id` varchar(8) NOT NULL,
  `D_FName` text DEFAULT NULL,
  `D_LName` text DEFAULT NULL,
  `D_specialize` text DEFAULT NULL,
  `D_phonenum` varchar(10) DEFAULT NULL,
  `D_email` varchar(50) DEFAULT NULL,
  `D_password` varchar(20) DEFAULT NULL,
  `D_desc` text DEFAULT NULL,
  `D_profile` text DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`D_id`, `D_FName`, `D_LName`, `D_specialize`, `D_phonenum`, `D_email`, `D_password`, `D_desc`, `D_profile`, `gender`) VALUES
('AAAA0004', 'Swati', 'Shelkar', 'Cardiologist', '4567891230', 'vedshelkar@gmail.com', '1234567890', 'Diagnoses and treats heart and blood vessel disorders. Manages conditions like heart attacks, hypertension, and arrhythmias using medication, lifestyle changes, or procedures.', 'doc_67f1e924de89d_1743907108.jpeg', 'Female'),
('AAAA0005', 'Nikhil', 'Shinde', 'Gyanecologist, Pediatrician', '1234567898', 'nikhil335@gmail.com', '1234567890', 'Treats female reproductive health issues and manages pregnancy and childbirth, including hormonal problems and infertility treatments.', 'doc_67f1e9d8be791_1743907288.jpg', 'Male'),
('AAAA0006', 'Ayush', 'Savaliya', 'Cardiologist', '4567891230', 'ayush1403@gmail.com', '1234567890', 'Diagnoses and treats heart and blood vessel disorders. Manages conditions like heart attacks, hypertension, and arrhythmias using medication, lifestyle changes, or procedures.', 'doc_67f1ea29204ec_1743907369.jpg', 'Male'),
('AAAA0007', 'Swati', 'Shelkar', 'Dermatologist', '5874693210', 'swati998@gmail.com', '1234567890', 'Treats skin, hair, and nail conditions. Manages acne, eczema, skin infections, and performs cosmetic and medical procedures like biopsies or laser therapy.', 'doc_67f1ea6c80421_1743907436.jpeg', 'Female'),
('AAAA0008', 'Ankit', 'Purohit', 'Gyanecologist', '9876543210', 'ankitp@gmail.com', '1234567890', 'Treats female reproductive health issues and manages pregnancy and childbirth, including hormonal problems and infertility treatments.', 'doc_67f1eadc7f984_1743907548.jpg', 'Male'),
('AAAA0009', 'Vedant', 'Naoghare', 'Oncologist', '5468791230', 'vednao@gmail.com', '1234567890', 'Focuses on cancer diagnosis and treatment. Uses chemotherapy, radiation, and other therapies to manage and monitor various cancers.', 'doc_67f1eb50d7026_1743907664.jpg', 'Male'),
('AAAA0010', 'Rishi', 'Mishra', 'Psychiatrist', '5736984120', 'rishim@gmail.com', '1234567890', 'Diagnoses and treats mental health disorders like depression, anxiety, schizophrenia, and addiction using medication and psychotherapy.', 'doc_67f1ebbcee4f7_1743907772.jpg', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_hospital`
--

CREATE TABLE `doctor_hospital` (
  `D_id` varchar(8) NOT NULL,
  `H_id` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctor_hospital`
--

INSERT INTO `doctor_hospital` (`D_id`, `H_id`) VALUES
('AAAA0004', 'AA0001'),
('AAAA0005', 'AA0001'),
('AAAA0006', 'AA0001'),
('AAAA0007', 'AA0002'),
('AAAA0008', 'AAA001'),
('AAAA0009', 'AAA001'),
('AAAA0010', 'AA0002');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `H_id` varchar(6) NOT NULL,
  `H_name` text DEFAULT NULL,
  `H_location` text DEFAULT NULL,
  `H_description` text DEFAULT NULL,
  `NIN_id` varchar(10) DEFAULT NULL,
  `H_password` varchar(20) DEFAULT NULL,
  `H_pic1` text DEFAULT NULL,
  `H_pic2` text DEFAULT NULL,
  `H_pic3` text DEFAULT NULL,
  `H_pic4` text DEFAULT NULL,
  `H_pic5` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`H_id`, `H_name`, `H_location`, `H_description`, `NIN_id`, `H_password`, `H_pic1`, `H_pic2`, `H_pic3`, `H_pic4`, `H_pic5`) VALUES
('AA0001', 'Shri Samarth Narayan Multispeciality Hospital', 'Dhule, Maharashtra', '\r\n#1 Best Multi Speciality Hospital in Dhule\r\nShree Samarth Narayan Multi Speciality Hospital in Dhule\r\nShree Samarth Narayan Multi Speciality Hospital in Dhule provides a wide range of medical services. Our highly-qualified doctors and staff are committed to delivering excellent healthcare services by offering expert care and treatments in specialties such as Neurology, Orthopedics, Urology, Gynaecology, Cardiology, Gastroenterology, and more.', '5874123690', '1234567890', 'H_pic1_67f1d2e92c95e_1743901417.jpg', 'H_pic2_67f1d2e92cf26_1743901417.jpg', 'H_pic3_67f1d2e92d1fd_1743901417.jpg', 'H_pic4_67f1d2e92d4d7_1743901417.jpg', 'H_pic5_67f1d2e92d849_1743901417.jpg'),
('AA0002', 'Life Care', 'pune', 'Life care with personal cure.', '1234567890', 'ygjhghjghhjjgjh', 'H_pic1_67f1e64bb84cd_1743906379.jpeg', 'H_pic2_67f1e64bb877d_1743906379.jpeg', 'H_pic3_67f1e64bb8879_1743906379.jpeg', 'H_pic4_67f1e64bb89a2_1743906379.jpeg', 'H_pic5_67f1e64bb8ab9_1743906379.jpeg'),
('AAA000', 'Lotus Multispeciality Hospital', 'Shivaji Nagar, Pune', 'A leading multi-speciality hospital offering advanced healthcare services including cardiology, orthopedics, neurology, and emergency care. Known for its experienced doctors and cutting-edge facilities.', '1234567890', '12345678', 'H_pic1_67f1cc3651cf7_1743899702.jpg', 'H_pic2_67f1cc36523c4_1743899702.jpg', 'H_pic3_67f1cc36526ec_1743899702.jpg', 'H_pic4_67f1cc3652aa7_1743899702.jpg', 'H_pic5_67f1cc3652dff_1743899702.jpg'),
('AAA001', 'Ruby Hall Clinic', 'Deccan, Pune', 'Ruby Hall Clinic is one of the most trusted hospitals in Pune, renowned for its intensive care units and advanced surgical departments. It provides 24/7 emergency services and a wide range of diagnostics.', '9876543210', '1234567890', 'H_pic1_67f1ce0c05ca5_1743900172.jpg', 'H_pic2_67f1ce0c05f8e_1743900172.jpg', 'H_pic3_67f1ce0c060ee_1743900172.jpg', 'H_pic4_67f1ce0c0622c_1743900172.jpg', 'H_pic5_67f1ce0c06334_1743900172.jpg'),
('AAA002', 'Sahyadri Hospital', 'Kothrud, Pune', 'Sahyadri Hospital is a reputed chain of hospitals in Maharashtra, offering high-quality treatment in oncology, nephrology, and cardiology. The hospital emphasizes patient-centric care and transparency.', '8795462130', '123456789', 'H_pic1_67f1ce8b8673f_1743900299.jpg', 'H_pic2_67f1ce8b86c27_1743900299.jpg', 'H_pic3_67f1ce8b86e45_1743900299.jpg', 'H_pic4_67f1ce8b871dd_1743900299.jpg', 'H_pic5_67f1ce8b8775a_1743900299.jpg'),
('AAA003', 'Jehangir Hospital', 'Bund Garden, Pune', 'Established in 1946, Jehangir Hospital is known for its excellence in patient care, modern infrastructure, and a team of top medical professionals. It is NABH-accredited and has advanced robotic surgery units.', '7894561230', '123456789', 'H_pic1_67f1cf0f8a652_1743900431.jpg', 'H_pic2_67f1cf0f8ad2e_1743900431.jpg', 'H_pic3_67f1cf0f8b070_1743900431.jpg', 'H_pic4_67f1cf0f8b3a0_1743900431.jpg', 'H_pic5_67f1cf0f8b6c2_1743900431.jpg'),
('AAA004', 'Columbia Asia Hospital', 'Hadapsar, Pune', 'Columbia Asia is an international standard hospital offering comprehensive treatments in pediatrics, internal medicine, ENT, and dermatology. It is equipped with advanced ICU and trauma care units.', '0147852369', '1234567890', 'H_pic1_67f1cf8c13464_1743900556.jpg', 'H_pic2_67f1cf8c13914_1743900556.jpg', 'H_pic3_67f1cf8c13af6_1743900556.jpg', 'H_pic4_67f1cf8c13ccd_1743900556.jpg', 'H_pic5_67f1cf8c13ea0_1743900556.jpg'),
('AAA005', 'Inamdar Multispeciality Hospital', 'Fatima Nagar, Pune', 'Inamdar Hospital combines affordability with high-end healthcare services. It houses specialists across 15+ departments, state-of-the-art diagnostic labs, and modern operation theatres.', '5826934710', '1234567890', 'H_pic1_67f1d0299ecbd_1743900713.jpg', 'H_pic2_67f1d0299f603_1743900713.jpg', 'H_pic3_67f1d0299f8e9_1743900713.jpg', 'H_pic4_67f1d0299fba8_1743900713.jpg', 'H_pic5_67f1d0299fead_1743900713.jpg'),
('AAA006', 'Noble Hospital', 'Magarpatta, Pune', 'Noble Hospital is a reputed tertiary care center that provides specialized treatment in oncology, gastroenterology, and organ transplants. The hospital is ISO-certified and highly rated by patients.', '5915736842', '12345678902', 'H_pic1_67f1d0a5c6320_1743900837.jpg', 'H_pic2_67f1d0a5c67a0_1743900837.jpg', 'H_pic3_67f1d0a5c69a2_1743900837.jpg', 'H_pic4_67f1d0a5c6baa_1743900837.jpg', 'H_pic5_67f1d0a5c6da5_1743900837.jpg'),
('AAA007', 'Deenanath Mangeshkar Hospital', 'Erandwane, Pune', 'A charitable hospital with world-class infrastructure, Deenanath Mangeshkar Hospital offers holistic treatment across departments. It is famous for its cancer research center and surgical excellence.', '5715938426', '1234567890', 'H_pic1_67f1d108d47a8_1743900936.jpg', 'H_pic2_67f1d108d4bae_1743900936.jpg', 'H_pic3_67f1d108d4d55_1743900936.jpg', 'H_pic4_67f1d108d4efc_1743900936.jpg', 'H_pic5_67f1d108d5098_1743900936.jpg'),
('AAA008', 'Aditya Birla Memorial Hospital', 'Chinchwad, Pune', 'Aditya Birla Memorial Hospital is a super-speciality healthcare facility certified with JCI & NABH. It offers a wide range of services from diagnostics to critical care and telemedicine.', '6824759310', '1234567890', 'H_pic1_67f1d174ea086_1743901044.jpg', 'H_pic2_67f1d174ea5a5_1743901044.jpg', 'H_pic3_67f1d174ea81f_1743901044.jpg', 'H_pic4_67f1d174eaa31_1743901044.jpg', 'H_pic5_67f1d174eac3b_1743901044.jpg'),
('AAA009', 'Ace Hospital', 'Erandwane, Pune', 'Ace Hospital is recognized for its expertise in urology, laparoscopy, and general surgery. It combines quality medical care with personalized attention and affordable packages for all patients.', '4827519305', '1234567890', 'H_pic1_67f1d1e006fb5_1743901152.jpg', 'H_pic2_67f1d1e0072f5_1743901152.jpg', 'H_pic3_67f1d1e007493_1743901152.jpg', 'H_pic4_67f1d1e007600_1743901152.jpg', 'H_pic5_67f1d1e00777a_1743901152.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `P_id` varchar(20) NOT NULL,
  `P_FName` text DEFAULT NULL,
  `P_LName` text DEFAULT NULL,
  `P_Bdate` date DEFAULT NULL,
  `P_Address` text DEFAULT NULL,
  `P_phonenum` varchar(10) DEFAULT NULL,
  `P_password` varchar(20) DEFAULT NULL,
  `P_email` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`P_id`, `P_FName`, `P_LName`, `P_Bdate`, `P_Address`, `P_phonenum`, `P_password`, `P_email`, `gender`) VALUES
('AAAAA0001', 'Angat', 'Mali', '2005-06-03', '03,Vraj Bhavan, Mali Ni Vadi,, Opp To Bus Stand, Zalod', '8160301657', 'Ang@t78', 'maliharish894@gmail.com', 'Male'),
('AAAAA0002', 'kxlkdjf', 'ksflksj', '2025-04-07', 'Gawliwada, bhingar, Ahmednagar', '8484898112', 'lksaj;lksahfl', 'yashlangote97@gmail.com', 'Male'),
('AAAAA0003', ',njk', 'nklj', '2025-04-09', 'Gawliwada, bhingar, Ahmednagar', '8484898112', 'nkkkboj', 'yashlangote97@gmail.com', 'Female'),
('AAAAA0004', 'rudre', 'dsfsdf', '2025-04-17', 'India', '9876543212', '123', 'arvind@gmail.com', 'Male'),
('AAAAA0005', 'bkb', 'lkjlk', '2025-04-03', 'Gawliwada, bhingar, Ahmednagar', '8484898112', 'kjbklb', 'yashlangote97@gmail.com', 'Male'),
('AAAAA0006', 'xzjlk', 'd;c;l', '2025-04-08', 'Gawliwada, bhingar, Ahmednagar', '8484898112', 'kjklj', 'yashlangote97@gmail.com', 'Male'),
('AAAAA0007', 'Angat', 'Mali', '2005-06-03', '03,Vraj Bhavan, Mali Ni Vadi,, Opp To Bus Stand, Zalod', '8160301657', 'Ang@134', 'maliharish894@gmail.com', 'Male'),
('AAAAA0008', 'Vedant', 'Patil', '2005-07-31', 'Anushka Apartment, Jai Malhar City, Lohegaon, Pune', '8830107534', 'Vedant5489', 'vedant5489@gmail.com', 'Male'),
('AAAAA0009', 'aljk', 'ejf', '2025-04-01', 'Gawliwada, bhingar, Ahmednagar', '8484898112', 'slkjdlkwj', 'yashlangote97@gmail.com', 'Female'),
('AAAAA0010', 'Siddhant ', 'Kokate', '2004-05-07', 'Chiplun', '7559436376', '1234567890', 'siddhantrkokate@gmail.com', 'Male'),
('AAAAA0011', 'Angat', 'Mali', '2020-01-28', '03,Vraj Bhavan, Mali Ni Vadi,, Opp To Bus Stand, Zalod', '8160301657', 'angat67', 'maliharish894@gmail.com', 'Male'),
('AAAAA0012', 'llkjhlkj', 'lkjlkj', '2025-04-02', 'Gawliwada, bhingar, Ahmednagar', '8484898112', 'kklj', 'yashlangote97@gmail.com', 'Male'),
('AAAAA0013', 'Ayush', 'Savaliya', '2005-03-14', 'Nehrul, Navi Mumbai', '8104537391', '1234567890', 'ayush1403@gmail.com', 'Male'),
('AAAAA0014', 'gfdg', 'fgdffg', '2025-04-26', 'gdsf', '1234567890', '12r', 'arvind@gmail.com', 'Male'),
('AAAAA0015', 'bbjvk', 'kbk', '2025-04-01', 'Gawliwada, bhingar, Ahmednagar', '8484898112', 'jhbjkh', 'yashlangote97@gmail.com', 'Male'),
('AAAAA0016', 'Angat', 'Mali', '2005-02-07', 'dasdsad', '3444324323', '1234567890', 'maliharish894@gmail.com', 'Male'),
('AAAAA0017', 'Vedant', 'Patil', '4343-08-31', '5235235', '3523532352', '324234324', 'siddhantrkokate@gmail.com', 'Male'),
('AAAAA0018', 'asdada', 'Kokate', '0000-00-00', 'dsdfdasaf', '3532535325', '352335325', 'siddhantrkokate@gmail.com', 'Female'),
('AAAAA0019', 'Vedant', 'Patil', '2232-12-23', 'fdgsdggdfgsdgdgddgsggd', '7559436376', 'dsfsddsfsdfs', 'vedant5429@gmail.com', 'Male'),
('AAAAA0020', 'Siddhant', 'kokate', '2004-03-31', 'weaas', '1242421142', '24124214142414414', 'captainv3107@gmail.com', 'Male'),
('AAAAA0021', 'Siddhant', 'Kokate', '1212-02-11', 'qwqa', '3133312334', 'SDASDSDSSDAS', 'siddhantrkokate@gmail.com', 'Male'),
('AAAAA0022', 'asdf', 'asdf', '2025-04-08', 'India', '9876543212', '1234', 'asdfghjk@gmail.com', 'Male'),
('AAAAA0023', 'mohit', 'mali', '2005-05-12', 'dasdasfdbzxca avsdaca aga', '0987654321', 'as23e467uyhj', 'angat.mali@adypu.edu.in', 'Male'),
('AAAAA0024', 'siddhant', 'kokate', '0434-03-11', 'wssdssdssdsd', '2424242422', '424244242', 'siddhantrkokate@gmail.com', 'Male'),
('AAAAA0025', 'Angat', 'Mali', '0501-05-31', '03,Vraj Bhavan, Mali Ni Vadi,, Opp To Bus Stand, Zalod', '8160301657', 'a;fmafaslca', 'maliharish894@gmail.com', 'Male'),
('AAAAA0026', 'Siddhant', 'kokate', '3433-05-07', 'Sawarde', '7559436376', '25443543543545', 'siddhantrkokate@gmail.com', 'Male'),
('AAAAA0027', 'kasjhfkjs', 'skjahkjdh', '2025-04-01', 'akjsKLJH', '1234567890', 'dkjfhkajfh', 'yashlangote97@gmail.com', 'Male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`D_id`);

--
-- Indexes for table `doctor_hospital`
--
ALTER TABLE `doctor_hospital`
  ADD PRIMARY KEY (`D_id`,`H_id`),
  ADD KEY `H_id` (`H_id`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`H_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`P_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_hospital`
--
ALTER TABLE `doctor_hospital`
  ADD CONSTRAINT `doctor_hospital_ibfk_1` FOREIGN KEY (`D_id`) REFERENCES `doctors` (`D_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `doctor_hospital_ibfk_2` FOREIGN KEY (`H_id`) REFERENCES `hospital` (`H_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
