-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 28, 2019 at 12:25 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `memoryMatch`
--

-- --------------------------------------------------------

--
-- Table structure for table `highScore`
--

CREATE TABLE `highScore` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(30) CHARACTER SET utf16 COLLATE utf16_unicode_ci NOT NULL,
  `attempts` tinyint(4) UNSIGNED NOT NULL,
  `accuracy` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `highScore`
--

INSERT INTO `highScore` (`id`, `name`, `attempts`, `accuracy`) VALUES
(156, 'El Primo', 3, 33),
(157, 'Nita', 10, 10),
(158, 'Penny', 1, 100),
(159, 'Poco', 4, 25),
(160, 'Brawler', 2, 50),
(161, 'wowo', 3, 33),
(162, 'frank', 5, 20),
(163, 'Carl', 1, 100),
(164, 'Brandon', 7, 14),
(165, 'Saria', 3, 33),
(166, 'Evelyn', 9, 11),
(167, 'Cody', 9, 11),
(168, 'Carl', 2, 50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `highScore`
--
ALTER TABLE `highScore`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `highScore`
--
ALTER TABLE `highScore`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
