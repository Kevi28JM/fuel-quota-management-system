-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2025 at 06:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dmt_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `dmt_vehicles`
--

CREATE TABLE `dmt_vehicles` (
  `id` int(11) NOT NULL,
  `vehicleNumber` varchar(255) NOT NULL,
  `chassisNumber` varchar(255) NOT NULL,
  `engineNumber` varchar(255) NOT NULL,
  `ownerName` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `registeredDate` date NOT NULL,
  `vehicleType` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dmt_vehicles`
--

INSERT INTO `dmt_vehicles` (`id`, `vehicleNumber`, `chassisNumber`, `engineNumber`, `ownerName`, `createdAt`, `registeredDate`, `vehicleType`) VALUES
(1, 'STU901', 'CH901234', 'EN901234', 'Robert Johnson', '2025-05-12 07:55:12', '2023-04-01', 'SUV'),
(2, 'VWX234', 'CH234567', 'EN234567', 'Linda Anderson', '2025-05-12 07:55:12', '2023-05-01', 'Sedan'),
(3, 'YZA567', 'CH567890', 'EN567890', 'Thomas Lee', '2025-05-12 07:55:12', '2023-06-01', 'Truck'),
(4, 'BCD890', 'CH890123', 'EN890123', 'Patricia White', '2025-05-12 07:55:12', '2023-07-01', 'Van'),
(5, 'EFG123', 'CH123456', 'EN123456', 'Charles Davis', '2025-05-12 07:55:12', '2023-08-01', 'Car'),
(10, 'CAR001', 'CHS1001', 'ENG1001', 'Alice Johnson', '2025-05-23 09:22:02', '2025-05-01', 'bus'),
(20, 'BUS002', 'CHS1002', 'ENG1002', 'Bob Smith', '2025-05-23 09:22:02', '2025-05-02', 'car'),
(30, 'TRK003', 'CHS1003', 'ENG1003', 'Charlie Williams', '2025-05-23 09:22:02', '2025-05-03', 'Truck'),
(40, 'MOTO004', 'CHS1004', 'ENG1004', 'Diana Brown', '2025-05-23 09:22:02', '2025-05-04', 'Motorcycle'),
(50, 'THW005', 'CHS1005', 'ENG1005', 'Evan Davis', '2025-05-23 09:22:02', '2025-05-05', 'Bus'),
(60, 'VAN006', 'CHS1006', 'ENG1006', 'Fiona Miller', '2025-05-23 09:22:02', '2025-05-06', 'Van');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dmt_vehicles`
--
ALTER TABLE `dmt_vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicleNumber` (`vehicleNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dmt_vehicles`
--
ALTER TABLE `dmt_vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
