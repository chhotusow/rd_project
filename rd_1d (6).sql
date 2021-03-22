-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2021 at 01:23 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rd_1d`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `documentImage` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `type`, `documentImage`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'adhar', 'sfcsf.jpg', 3, '2021-03-08 05:35:46', '2021-03-08 05:35:46'),
(2, 'adhar', 'sfcsf.jpg', 4, '2021-03-08 05:58:42', '2021-03-08 05:58:42'),
(3, 'Sfsf', 'sfjsifksfj', 5, '2021-03-08 08:15:46', '2021-03-08 08:15:46'),
(4, 'Sfsf', 'sfjsifksfj', 6, '2021-03-08 08:17:29', '2021-03-08 08:17:29'),
(5, 'Sfsf', 'sfjsifksfj', 7, '2021-03-08 08:17:33', '2021-03-08 08:17:33'),
(6, 'Sfsf', 'sfjsifksfj', 8, '2021-03-08 08:17:37', '2021-03-08 08:17:37'),
(7, 'Sfsf', 'sfjsifksfj', 9, '2021-03-08 08:17:41', '2021-03-08 08:17:41'),
(8, 'Sfsf', 'sfjsifksfj', 10, '2021-03-08 08:17:44', '2021-03-08 08:17:44'),
(9, 'Sfsf', 'sfjsifksfj', 11, '2021-03-08 08:17:47', '2021-03-08 08:17:47'),
(10, 'Sfsf', 'sfjsifksfj', 12, '2021-03-08 08:17:51', '2021-03-08 08:17:51'),
(11, 'Sfsf', 'sfjsifksfj', 13, '2021-03-08 08:17:55', '2021-03-08 08:17:55'),
(12, 'Sfsf', 'sfjsifksfj', 14, '2021-03-08 08:18:00', '2021-03-08 08:18:00'),
(13, 'Sfsf', 'sfjsifksfj', 15, '2021-03-08 08:18:03', '2021-03-08 08:18:03'),
(14, 'Sfsf', 'sfjsifksfj', 16, '2021-03-08 08:18:06', '2021-03-08 08:18:06'),
(15, 'Sfsf', 'sfjsifksfj', 17, '2021-03-08 08:18:10', '2021-03-08 08:18:10'),
(16, NULL, NULL, 18, '2021-03-10 06:22:07', '2021-03-10 06:22:07'),
(17, NULL, NULL, 19, '2021-03-10 06:22:57', '2021-03-10 06:22:57'),
(18, NULL, NULL, 20, '2021-03-10 06:25:58', '2021-03-10 06:25:58'),
(19, NULL, NULL, 21, '2021-03-10 06:28:27', '2021-03-10 06:28:27'),
(20, NULL, NULL, 22, '2021-03-10 06:29:35', '2021-03-10 06:29:35'),
(21, NULL, NULL, 23, '2021-03-10 06:30:26', '2021-03-10 06:30:26'),
(22, NULL, NULL, 24, '2021-03-10 06:32:35', '2021-03-10 06:32:35'),
(23, NULL, NULL, 25, '2021-03-10 06:35:47', '2021-03-10 06:35:47'),
(24, NULL, NULL, 26, '2021-03-10 06:47:02', '2021-03-10 06:47:02'),
(25, NULL, NULL, 27, '2021-03-10 06:50:52', '2021-03-10 06:50:52'),
(26, NULL, NULL, 28, '2021-03-10 08:12:22', '2021-03-10 08:12:22');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `month` varchar(255) DEFAULT NULL,
  `year` int(255) DEFAULT NULL,
  `interest` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `month`, `year`, `interest`, `createdAt`, `updatedAt`) VALUES
(1, '12', 1, '8', '2021-03-04 11:58:50', '2021-03-04 11:58:50'),
(2, '36', 3, '9', '2021-03-04 11:58:50', '2021-03-04 11:58:50'),
(3, '60', 5, '10', '2021-02-24 13:50:16', '2021-02-22 13:22:54');

-- --------------------------------------------------------

--
-- Table structure for table `ranks`
--

CREATE TABLE `ranks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ranks`
--

INSERT INTO `ranks` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'Worker', '2021-01-06 00:53:50', '2021-01-06 00:53:50'),
(2, 'Team Leader', '2021-01-13 09:27:05', '2021-02-19 12:02:46'),
(3, 'Junior Manager', '2021-02-24 13:50:16', '2021-02-22 13:22:54'),
(4, 'Manager', '2021-02-24 13:50:16', '2021-02-24 13:56:45'),
(5, 'Junior Executive', '2021-03-02 15:01:21', '2021-03-02 15:01:21'),
(6, 'Senior Executive', '2021-03-03 15:01:41', '2021-03-02 15:01:41');

-- --------------------------------------------------------

--
-- Table structure for table `rd_details`
--

CREATE TABLE `rd_details` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `planId` int(11) DEFAULT NULL,
  `completeTransactionCount` int(11) DEFAULT NULL,
  `maturityAmount` decimal(10,0) DEFAULT NULL,
  `totalInvestment` decimal(10,0) DEFAULT NULL,
  `monthlyAmount` decimal(10,0) DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  `interestAmount` decimal(10,0) DEFAULT NULL,
  `rdActivateStatus` varchar(255) NOT NULL,
  `pendingAmount` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rd_details`
--

INSERT INTO `rd_details` (`id`, `userId`, `planId`, `completeTransactionCount`, `maturityAmount`, `totalInvestment`, `monthlyAmount`, `interest`, `interestAmount`, `rdActivateStatus`, `pendingAmount`, `createdAt`, `updatedAt`) VALUES
(1, 6, 1, 2, '6265', '6000', '500', '8%', '265', 'Active', 0, '2021-03-08 08:17:29', '2021-03-11 12:20:32'),
(2, 7, 1, 1, '6265', '6000', '1000', '8%', '265', 'Active', 1000, '2021-03-08 08:17:34', '2021-03-08 12:32:50'),
(3, 8, 1, 2, '6265', '6000', '500', '8%', '265', 'Active', 0, '2021-03-08 08:17:38', '2021-03-11 12:05:59'),
(4, 9, 1, 2, '6265', '6000', '500', '8%', '265', 'Active', 0, '2021-03-08 08:17:41', '2021-03-11 10:36:11'),
(5, 10, 1, 2, '6265', '6000', '500', '8%', '265', 'Active', 0, '2021-03-08 08:17:44', '2021-03-11 08:41:09'),
(6, 11, 1, 2, '6265', '6000', '500', '8%', '265', 'Active', 0, '2021-03-08 08:17:48', '2021-03-11 12:20:21'),
(7, 12, 1, 2, '6265', '6000', '500', '8%', '265', 'Active', 0, '2021-03-08 08:17:51', '2021-03-11 12:14:39'),
(8, 13, 1, 1, '6265', '6000', '500', '8%', '265', 'Active', 500, '2021-03-08 08:17:55', '2021-03-11 12:07:36'),
(9, 14, 1, 0, '6265', '6000', '500', '8%', '265', 'Active', 1000, '2021-03-08 08:18:00', '2021-03-08 12:32:51'),
(10, 15, 1, 1, '6265', '6000', '500', '8%', '265', 'Active', 500, '2021-03-08 08:18:03', '2021-03-11 12:20:27'),
(11, 16, 1, 1, '6265', '6000', '500', '8%', '265', 'Active', 500, '2021-03-08 08:18:07', '2021-03-11 12:19:10'),
(12, 17, 1, 2, '6265', '6000', '500', '8%', '265', 'Active', 0, '2021-03-08 08:18:10', '2021-03-11 12:09:14'),
(13, 20, 1, NULL, '6265', '6000', '500', '8%', '265', 'Pending', 0, '2021-03-10 06:25:58', '2021-03-10 06:25:58'),
(14, 23, 1, NULL, '6265', '6000', '500', '8%', '265', 'Pending', 0, '2021-03-10 06:30:27', '2021-03-10 06:30:27'),
(15, 28, 1, NULL, '6265', '6000', '500', '8%', '265', 'as', 0, '2021-03-10 08:12:22', '2021-03-10 08:12:22'),
(16, 28, 2, NULL, '6265', '6000', '1000', '8%', '265', 'Pendibg', 0, '2021-03-10 08:12:22', '2021-03-10 08:12:22');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '2021-03-02 14:59:26', '2021-03-02 14:59:26'),
(2, 'Adviser', '2021-03-02 14:59:26', '2021-03-02 14:59:26'),
(3, 'Customer', '2021-03-02 14:59:56', '2021-03-02 14:59:56');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'Active', '2021-03-02 15:06:33', '2021-03-02 15:06:33'),
(2, 'Deactive', '2021-03-02 15:06:33', '2021-03-02 15:06:33');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `payable_type` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `rdDetailId` int(11) NOT NULL,
  `walletId` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `month` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `confirmed` decimal(10,0) DEFAULT NULL,
  `meta` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `payable_type`, `userId`, `rdDetailId`, `walletId`, `amount`, `month`, `type`, `confirmed`, `meta`, `uuid`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 6, 1, 1, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:28', '2021-03-11 12:04:40'),
(2, NULL, 7, 2, 2, 1000, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:29', '2021-03-08 12:27:20'),
(3, NULL, 8, 3, 3, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:29', '2021-03-11 12:05:59'),
(4, NULL, 9, 4, 4, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:30', '2021-03-11 08:38:08'),
(5, NULL, 10, 5, 5, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:30', '2021-03-11 08:39:32'),
(6, NULL, 11, 6, 6, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:30', '2021-03-11 12:20:21'),
(7, NULL, 12, 7, 7, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:31', '2021-03-11 12:07:18'),
(8, NULL, 13, 8, 8, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:31', '2021-03-11 12:07:36'),
(9, NULL, 14, 9, 9, 500, 'Feb', 'pending', NULL, NULL, NULL, '2021-03-08 12:25:31', '2021-03-08 12:25:31'),
(10, NULL, 15, 10, 10, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:31', '2021-03-11 12:20:27'),
(11, NULL, 16, 11, 11, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:31', '2021-03-11 12:19:10'),
(12, NULL, 17, 12, 12, 500, 'Feb', 'deposit', NULL, NULL, NULL, '2021-03-08 12:25:32', '2021-03-11 10:29:55'),
(13, NULL, 6, 1, 1, 500, 'March', 'deposit', NULL, NULL, NULL, '2021-03-08 12:32:49', '2021-03-11 12:20:32'),
(14, NULL, 7, 2, 2, 1000, 'March', 'pending', NULL, NULL, NULL, '2021-03-08 12:32:50', '2021-03-08 12:32:50'),
(15, NULL, 8, 3, 3, 500, 'March', 'deposit', NULL, NULL, NULL, '2021-03-08 12:32:50', '2021-03-11 10:56:55'),
(16, NULL, 9, 4, 4, 500, 'March', 'deposit', NULL, NULL, NULL, '2021-03-08 12:32:50', '2021-03-11 10:36:10'),
(17, NULL, 10, 5, 5, 500, 'March', 'deposit', NULL, NULL, NULL, '2021-03-08 12:32:50', '2021-03-11 08:41:09'),
(18, NULL, 11, 6, 6, 500, 'March', 'deposit', NULL, NULL, NULL, '2021-03-08 12:32:50', '2021-03-11 10:57:43'),
(19, NULL, 12, 7, 7, 500, 'March', 'deposit', NULL, NULL, NULL, '2021-03-08 12:32:51', '2021-03-11 12:14:39'),
(20, NULL, 13, 8, 8, 500, 'March', 'pending', NULL, NULL, NULL, '2021-03-08 12:32:51', '2021-03-08 12:32:51'),
(21, NULL, 14, 9, 9, 500, 'March', 'pending', NULL, NULL, NULL, '2021-03-08 12:32:51', '2021-03-08 12:32:51'),
(22, NULL, 15, 10, 10, 500, 'March', 'pending', NULL, NULL, NULL, '2021-03-08 12:32:51', '2021-03-08 12:32:51'),
(23, NULL, 16, 11, 11, 500, 'March', 'pending', NULL, NULL, NULL, '2021-03-08 12:32:51', '2021-03-08 12:32:51'),
(24, NULL, 17, 12, 12, 500, 'March', 'deposit', NULL, NULL, NULL, '2021-03-08 12:32:51', '2021-03-11 12:09:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `rankId` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `mobileNo` varchar(255) NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `createdById` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `roleId`, `rankId`, `count`, `otp`, `mobileNo`, `profilePic`, `statusId`, `email`, `gender`, `address`, `dob`, `createdById`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 1, NULL, 0, 670087, '8219263810', 'qwfevg.jpg', 1, 'yash.codestarc@gmail.com', 'male', 'mohali', '31/08/1998', NULL, '2021-03-08 10:57:04', '2021-03-11 08:34:35'),
(2, 'karan', 2, 1, 8, 444968, '8219263811', NULL, 1, NULL, NULL, NULL, NULL, NULL, '2021-03-08 05:29:47', '2021-03-10 06:50:52'),
(3, 'keshav', 3, NULL, 0, NULL, '9876543210', 'adadsfds.jpg', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 05:35:45', '2021-03-08 05:35:45'),
(4, 'kirab', 3, NULL, 0, 139470, '9787654310', 'qddwdwdwdwd', 1, NULL, NULL, NULL, NULL, 2, '2021-03-08 05:58:42', '2021-03-10 08:01:37'),
(5, 'cfwsfw', 3, NULL, 0, NULL, '7412589637', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:15:46', '2021-03-08 08:15:46'),
(6, 'cfwsfw', 3, NULL, 0, NULL, '7412588963', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:29', '2021-03-08 08:17:29'),
(7, 'cfwsfw', 3, NULL, 0, NULL, '7412588964', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:33', '2021-03-08 08:17:33'),
(8, 'cfwsfw', 3, NULL, 0, NULL, '7412588965', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:37', '2021-03-08 08:17:37'),
(9, 'cfwsfw', 3, NULL, 0, NULL, '7412588995', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:41', '2021-03-08 08:17:41'),
(10, 'cfwsfw', 3, NULL, 0, NULL, '7412588795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:44', '2021-03-08 08:17:44'),
(11, 'cfwsfw', 3, NULL, NULL, NULL, '7112588795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:47', '2021-03-08 08:17:47'),
(12, 'cfwsfw', 3, NULL, NULL, NULL, '1112588795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:51', '2021-03-08 08:17:51'),
(13, 'cfwsfw', 3, NULL, NULL, NULL, '1112589795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:55', '2021-03-08 08:17:55'),
(14, 'cfwsfw', 3, NULL, NULL, NULL, '1112509795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:17:59', '2021-03-08 08:17:59'),
(15, 'cfwsfw', 3, NULL, NULL, NULL, '1112909795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:18:03', '2021-03-08 08:18:03'),
(16, 'cfwsfw', 3, NULL, NULL, NULL, '1112901795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:18:06', '2021-03-08 08:18:06'),
(17, 'cfwsfw', 3, NULL, NULL, NULL, '1112961795', 'dvfecvesc', 2, NULL, NULL, NULL, NULL, 2, '2021-03-08 08:18:10', '2021-03-08 08:18:10'),
(18, 'shivani', 2, 1, 0, NULL, '7894561230', NULL, 2, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:22:07', '2021-03-10 06:22:07'),
(19, 'shivani', 2, 1, 0, NULL, '7894571230', NULL, 1, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:22:57', '2021-03-10 06:22:57'),
(20, 'afasf', 3, NULL, 0, NULL, '7412589630', NULL, 2, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:25:57', '2021-03-10 06:25:57'),
(21, 'shivani', 2, 1, 0, NULL, '7894571270', NULL, 1, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:28:27', '2021-03-10 06:28:27'),
(22, 'shivani', 2, 1, 0, NULL, '7894577270', NULL, 1, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:29:35', '2021-03-10 06:29:35'),
(23, 'afasf', 3, NULL, 0, NULL, '7412589634', NULL, 2, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:30:26', '2021-03-10 06:30:26'),
(24, 'shivani', 2, 1, 0, NULL, '7894577271', NULL, 1, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:32:35', '2021-03-10 06:32:35'),
(25, 'shivani', 2, 1, 0, NULL, '7894577278', NULL, 1, NULL, NULL, NULL, NULL, 2, '2021-03-10 06:35:47', '2021-03-10 06:35:47'),
(26, 'shivani', 2, 1, NULL, NULL, '7894777278', 'wsfafa.jpg', 1, 'ygasidgi@ja.com', 'female', NULL, '31/25/1545', 2, '2021-03-10 06:47:02', '2021-03-10 06:47:02'),
(27, 'shivani', 2, 1, NULL, NULL, '7894777268', 'wsfafa.jpg', 2, 'ygasidgi@ja.com', 'female', 'mojhali', '31/25/1545', 2, '2021-03-10 06:50:52', '2021-03-10 06:50:52'),
(28, 'Harry', 3, NULL, NULL, 151515, '7412581634', 'q', 1, 'ASDS', 'A', 'AF', '31/08/1998', 2, '2021-03-10 08:12:22', '2021-03-10 08:12:22');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `rdId` int(11) DEFAULT NULL,
  `holder_type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `meta` varchar(255) DEFAULT NULL,
  `balance` decimal(10,0) DEFAULT NULL,
  `decimal_places` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `userId`, `rdId`, `holder_type`, `name`, `slug`, `description`, `meta`, `balance`, `decimal_places`, `createdAt`, `updatedAt`) VALUES
(1, 6, 1, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:29', '2021-03-11 12:20:32'),
(2, 7, 2, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:29', '2021-03-08 12:27:20'),
(3, 8, 3, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:29', '2021-03-11 12:05:59'),
(4, 9, 4, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:30', '2021-03-11 10:36:11'),
(5, 10, 5, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:30', '2021-03-11 08:41:09'),
(6, 11, 6, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:30', '2021-03-11 12:20:22'),
(7, 12, 7, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:31', '2021-03-11 12:14:39'),
(8, 13, 8, NULL, 'cfwsfw', NULL, NULL, NULL, '500', NULL, '2021-03-08 12:25:31', '2021-03-11 12:07:36'),
(9, 14, 9, NULL, 'cfwsfw', NULL, NULL, NULL, '0', NULL, '2021-03-08 12:25:31', '2021-03-08 12:25:31'),
(10, 15, 10, NULL, 'cfwsfw', NULL, NULL, NULL, '500', NULL, '2021-03-08 12:25:31', '2021-03-11 12:20:27'),
(11, 16, 11, NULL, 'cfwsfw', NULL, NULL, NULL, '500', NULL, '2021-03-08 12:25:31', '2021-03-11 12:19:10'),
(12, 17, 12, NULL, 'cfwsfw', NULL, NULL, NULL, '1000', NULL, '2021-03-08 12:25:32', '2021-03-11 12:09:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ranks`
--
ALTER TABLE `ranks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rd_details`
--
ALTER TABLE `rd_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `planId` (`planId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `rdDetailId` (`rdDetailId`),
  ADD KEY `walletId` (`walletId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobileNo` (`mobileNo`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `rankId` (`rankId`),
  ADD KEY `statusId` (`statusId`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rdId` (`rdId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ranks`
--
ALTER TABLE `ranks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rd_details`
--
ALTER TABLE `rd_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rd_details`
--
ALTER TABLE `rd_details`
  ADD CONSTRAINT `rd_details_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rd_details_ibfk_2` FOREIGN KEY (`planId`) REFERENCES `plans` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`rdDetailId`) REFERENCES `rd_details` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`walletId`) REFERENCES `wallets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`rankId`) REFERENCES `ranks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `wallets_ibfk_2` FOREIGN KEY (`rdId`) REFERENCES `rd_details` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
