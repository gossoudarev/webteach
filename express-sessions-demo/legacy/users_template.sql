-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 10, 2016 at 12:14 AM
-- Server version: 5.5.24
-- PHP Version: 5.3.10-1ubuntu3.21

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `html`
--

-- --------------------------------------------------------

--
-- Table structure for table `users_template`
--

CREATE TABLE IF NOT EXISTS `users_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `log` text NOT NULL,
  `pas` text NOT NULL,
  `role` text NOT NULL,
  `hint` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users_template`
--

INSERT INTO `users_template` (`id`, `log`, `pas`, `role`, `hint`) VALUES
(1, 'admin', '95f44e0321ed96ba9d2961a54daab05e', 'root', '(root.reverse)*2'),
(2, 'bestboy', '1f3870be274f6c49b3e31a0c6728957f', 'staff', 'mcbook is by ...'),
(3, 'user', '23e7b876c736a1ecd4399440306a66f9', 'user', 'Qwe..3');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
