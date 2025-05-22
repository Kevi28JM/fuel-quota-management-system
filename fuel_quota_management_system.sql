-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2025 at 08:16 AM
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
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `contact` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`id`, `name`, `location`, `owner_id`, `created_at`, `contact`) VALUES
(0, 'yatiyana', 'yatiyana matara', 3, '2025-05-13 08:50:46', '0717594017');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('vehicleOwner','stationOwner','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'M.G. Hasindu Thirasara', 'hasinduthirasaramg@gmail.com', '$2b$10$BP/POtyj.i2bfITDntlYzuJ8L5KDUv0erS4nHC1LeTv9pCWC5xlBS', 'vehicleOwner'),
(2, 'Thirasara', 'hasinduthirasara@gmail.com', '$2b$10$/ZoWZ2fc3ZS6knL3jca1xuTXBlqlAPQTMK2Fuz2Nh6BbkGvt4mxd2', 'vehicleOwner'),
(3, 'Thirasarav', 'hasinduthiara@gmail.com', '$2b$10$fsjDoxjs0epnNgPep5eFbu./uJdy5xZK8Ps8ZNzG2t.zVr7Yjgzce', 'stationOwner'),
(4, 'hasi', 'hasi@gmail.com', '$2b$10$Md48PqQejKwaZtCZpAdvMuSdclwsXO8wrjpaIzgem/sbZtWYoQXRi', 'admin'),
(5, 'jagath', 'jaga@gmail.com', '$2b$10$tyz5pbGK9qc.IOt3jxTsV.dQQPvZO0XsEVhmyZG3XLtb6afDPFG5u', 'vehicleOwner'),
(6, 'hasindu', 'hasi1234@gmail.com', '$2b$10$ZlH1odFse4o5T8/9bsJ8FunfNPsCEe.3gUrc/Uen4z4HnQMFHIBQ6', 'admin'),
(7, 'hasi1234', 'hasi12@gmail.com', '$2b$10$GCpz/CvMHuGeWpZn/8HIoeuQv2sA.llBlzTiZZTAv1LV5cnOvSrsK', 'admin'),
(8, 'kawda', 'kaw@gmail.com', '$2b$10$pOrzduyfDQ6J0CF6WMP3kucCUuSB6REbu3qrynC87/Si2IHGhhiA6', 'stationOwner'),
(9, 'hasi1', 'hasi1@gmail.com', '$2b$10$kkE9NdG0hI2axeRVns0E9uW8q4WkSYT4OVrK/JF5VtF1mKJYrvZ1m', 'stationOwner');

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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicleNumber`, `chassisNumber`, `engineNumber`, `ownerName`, `registeredDate`, `vehicleType`, `color`, `qrCode`, `createdAt`) VALUES
(1, '11', '11', '11', '11', '2025-05-13', '11', '11', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOGSURBVO3BQY5jiRUDwcwH3f/K9Cy84OoDglQ13TYjzD+Y+a9jphwz5Zgpx0w5ZsoxU46ZcsyUY6YcM+WYKcdMOWbKMVOOmfLiQyq/KQlN5Scl4RMqvykJnzhmyjFTjpny4suS8E0q70hCU2lJaCotCU2lJaGptCQ8ScI3qXzTMVOOmXLMlBc/TOUdSfiEyidUWhKaSkvCJ1TekYSfdMyUY6YcM+XFXy4JTeWJSktCU2kqLQlNpSXhb3bMlGOmHDPlxV9O5RMqT5Lw/+SYKcdMOWbKix+WhJ+UhE+o/JuS8Cc5ZsoxU46Z8uLLVH6TSktCU2lJeJKEptKS8AmVP9kxU46ZcswU8w/+h6g8ScITlU8k4W92zJRjphwz5cWHVFoSnqj8piQ0lSdJeIdKU2lJeKLSktBU3pGETxwz5Zgpx0x58aEkNJWWhJaEP0kSnqg8SUJT+aYk/KZjphwz5ZgpL36YSktCU3lHEp6otCQ8UWlJeIfKE5WWhCcqLQlPVFoSPnHMlGOmHDPlxZcl4ZuS8AmVloSm8iQJTaUl4YnKkyQ0labSkvCTjplyzJRjprz4kMo7kvAkCU3lHUloKk+S8ETlHSpPVFoSniThNx0z5Zgpx0wx/+ADKt+UhE+oPElCU3mShKbyjiQ0lSdJaCotCT/pmCnHTDlmyotfloSm8kSlJeGbktBU3pGEJyrfpPIkCZ84ZsoxU46Z8uLLktBUmsoTlZaEpvIkCU3liUpLwidUniThicqTJPykY6YcM+WYKS9+WBKayjtUvknlicqTJDSVd6h8k0pLwieOmXLMlGOmvPhQEt6RhG9SeZKEptKS8ETlHUl4h0pLQlP5TcdMOWbKMVNefEjlNyXhicqTJDSVd6i8Q6Ul4R1J+E3HTDlmyjFTXnxZEr5J5R1JaCpNpSWhqbQkNJV3JOEdKi0JT5LwTcdMOWbKMVNe/DCVdyThEyotCU3lJ6n8JJUnSfjEMVOOmXLMlBf/Z5LQVJ6otCQ0lZaEpvIkCU3l33TMlGOmHDPlxV8uCe9QaUloKi0JTaUloam0JDxR+ZMcM+WYKcdMefHDkvAnU3lHEp4k4YlKS0JTaSq/6Zgpx0w5ZsqLL1P5TSotCU3lm1Q+kYSm8iQJT1S+6Zgpx0w5Zor5BzP/dcyUY6YcM+WYKcdMOWbKMVOOmXLMlGOmHDPlmCnHTDlmyjFT/gPKlW1QrXTqaAAAAABJRU5ErkJggg==', '2025-05-11 10:12:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicleNumber` (`vehicleNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
