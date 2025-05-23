-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2025 at 12:06 PM
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
-- Database: `fuel_quota_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`) VALUES
(1, 'hasi123', 'hasi1234@gmail.com', '$2b$10$rPZ.B0fzZQFTMzH.y9.iHeSt5WAK5HXE4ema6vtID9icm/bnTsc5.');

-- --------------------------------------------------------

--
-- Table structure for table `pending_station_and_owner`
--

CREATE TABLE `pending_station_and_owner` (
  `ID` int(11) NOT NULL,
  `OwnerName` varchar(25) NOT NULL,
  `Email` varchar(25) NOT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `NIC` varchar(20) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `RegistrationDate` datetime DEFAULT NULL,
  `Status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `StationName` varchar(55) NOT NULL,
  `Location` varchar(105) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Station_Contact` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `contact` varchar(10) NOT NULL,
  `Capacity` int(20) NOT NULL,
  `Current_qatar` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`id`, `name`, `location`, `owner_id`, `contact`, `Capacity`, `Current_qatar`) VALUES
(1, 'maharagama', 'maharagama', 13, '', 98, 650);

-- --------------------------------------------------------

--
-- Table structure for table `station_operator`
--

CREATE TABLE `station_operator` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `nic` varchar(12) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `station_id` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station_operator`
--

INSERT INTO `station_operator` (`id`, `name`, `nic`, `email`, `password`, `station_id`, `status`) VALUES
(1, 'sayagi', '200967888677', 'aayagi@gmail.com', 'sayagigi', 12, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `station_owner`
--

CREATE TABLE `station_owner` (
  `OwnerID` int(11) NOT NULL,
  `OwnerName` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `NIC` varchar(20) NOT NULL,
  `Password` varbinary(255) NOT NULL,
  `RegistrationDate` datetime DEFAULT NULL,
  `Status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station_owner`
--

INSERT INTO `station_owner` (`OwnerID`, `OwnerName`, `Email`, `Phone`, `NIC`, `Password`, `RegistrationDate`, `Status`) VALUES
(13, 'Tharushika Hirushani', 'tharushika@gmail.com', '0771294588', '200285700100', 0x24326224313024566558552f534d4a726d4a5538786d2f4158355a584f744769375642426663444f63717a70613834755875387a48365a744b655575, '2025-05-23 11:38:31', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `vehicleNumber` varchar(255) NOT NULL,
  `chassisNumber` varchar(255) NOT NULL,
  `engineNumber` varchar(255) NOT NULL,
  `ownerName` varchar(255) NOT NULL,
  `registeredDate` date NOT NULL,
  `vehicleType` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `qrCode` text NOT NULL,
  `quota` int(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicleNumber`, `chassisNumber`, `engineNumber`, `ownerName`, `registeredDate`, `vehicleType`, `color`, `qrCode`, `quota`, `createdAt`) VALUES
(1, '11', '11', '11', '11', '2025-05-13', '11', '11', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOGSURBVO3BQY5jiRUDwcwH3f/K9Cy84OoDglQ13TYjzD+Y+a9jphwz5Zgpx0w5ZsoxU46ZcsyUY6YcM+WYKcdMOWbKMVOOmfLiQyq/KQlN5Scl4RMqvykJnzhmyjFTjpny4suS8E0q70hCU2lJaCotCU2lJaGptCQ8ScI3qXzTMVOOmXLMlBc/TOUdSfiEyidUWhKaSkvCJ1TekYSfdMyUY6YcM+XFXy4JTeWJSktCU2kqLQlNpSXhb3bMlGOmHDPlxV9O5RMqT5Lw/+SYKcdMOWbKix+WhJ+UhE+o/JuS8Cc5ZsoxU46Z8uLLVH6TSktCU2lJeJKEptKS8AmVP9kxU46ZcswU8w/+h6g8ScITlU8k4W92zJRjphwz5cWHVFoSnqj8piQ0lSdJeIdKU2lJeKLSktBU3pGETxwz5Zgpx0x58aEkNJWWhJaEP0kSnqg8SUJT+aYk/KZjphwz5ZgpL36YSktCU3lHEp6otCQ8UWlJeIfKE5WWhCcqLQlPVFoSPnHMlGOmHDPlxZcl4ZuS8AmVloSm8iQJTaUl4YnKkyQ0labSkvCTjplyzJRjprz4kMo7kvAkCU3lHUloKk+S8ETlHSpPVFoSniThNx0z5Zgpx0wx/+ADKt+UhE+oPElCU3mShKbyjiQ0lSdJaCotCT/pmCnHTDlmyotfloSm8kSlJeGbktBU3pGEJyrfpPIkCZ84ZsoxU46Z8uLLktBUmsoTlZaEpvIkCU3liUpLwidUniThicqTJPykY6YcM+WYKS9+WBKayjtUvknlicqTJDSVd6h8k0pLwieOmXLMlGOmvPhQEt6RhG9SeZKEptKS8ETlHUl4h0pLQlP5TcdMOWbKMVNefEjlNyXhicqTJDSVd6i8Q6Ul4R1J+E3HTDlmyjFTXnxZEr5J5R1JaCpNpSWhqbQkNJV3JOEdKi0JT5LwTcdMOWbKMVNe/DCVdyThEyotCU3lJ6n8JJUnSfjEMVOOmXLMlBf/Z5LQVJ6otCQ0lZaEpvIkCU3l33TMlGOmHDPlxV8uCe9QaUloKi0JTaUloam0JDxR+ZMcM+WYKcdMefHDkvAnU3lHEp4k4YlKS0JTaSq/6Zgpx0w5ZsqLL1P5TSotCU3lm1Q+kYSm8iQJT1S+6Zgpx0w5Zor5BzP/dcyUY6YcM+WYKcdMOWbKMVOOmXLMlGOmHDPlmCnHTDlmyjFT/gPKlW1QrXTqaAAAAABJRU5ErkJggg==', 0, '2025-05-11 10:12:14');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_owners`
--

CREATE TABLE `vehicle_owners` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `nic_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_owners`
--

INSERT INTO `vehicle_owners` (`id`, `full_name`, `email`, `phone`, `password`, `nic_number`) VALUES
(1, 'M.G. Hasindu Thirasara', 'hasinduthirasaramg@gmail.com', '0717517940', '$2b$10$KiPXz/LbdJBk6jGUsNVlyup7pZ7kq9H7ndbsFb.D8l7.9A9NhtHFa', '44444');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `pending_station_and_owner`
--
ALTER TABLE `pending_station_and_owner`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `station_operator`
--
ALTER TABLE `station_operator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `station_owner`
--
ALTER TABLE `station_owner`
  ADD PRIMARY KEY (`OwnerID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `NIC` (`NIC`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicleNumber` (`vehicleNumber`);

--
-- Indexes for table `vehicle_owners`
--
ALTER TABLE `vehicle_owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pending_station_and_owner`
--
ALTER TABLE `pending_station_and_owner`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `station_operator`
--
ALTER TABLE `station_operator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `station_owner`
--
ALTER TABLE `station_owner`
  MODIFY `OwnerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vehicle_owners`
--
ALTER TABLE `vehicle_owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
