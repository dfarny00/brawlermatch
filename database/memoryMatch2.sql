-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 05, 2019 at 02:32 PM
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
  `accuracy` tinyint(3) UNSIGNED NOT NULL,
  `added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `highScore`
--

INSERT INTO `highScore` (`id`, `name`, `accuracy`, `added`) VALUES
(1, 'jase', 33, '2019-11-05 20:01:32'),
(2, 'jase', 33, '2008-05-15 22:00:00'),
(3, '', 9, '2019-11-06 04:33:36'),
(4, 'ww', 8, '2019-11-05 12:34:51'),
(5, 'barley', 33, '2019-11-06 04:56:18'),
(6, 'pcoo', 20, '2019-11-05 12:58:03'),
(7, 'car', 10, '2019-11-05 13:15:08'),
(8, 'faf', 25, '2019-11-05 13:15:48'),
(9, 'nita', 17, '2019-11-05 13:17:50'),
(10, 'carl', 50, '2019-11-05 13:19:33'),
(11, 'dara', 17, '2019-11-05 13:21:39'),
(12, 'nita', 50, '2019-11-05 13:27:10'),
(13, 'dwight', 20, '2019-11-05 13:31:29');

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
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
