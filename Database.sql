-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2022 at 02:35 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plantasusi`
--
CREATE DATABASE IF NOT EXISTS `plantasusi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `plantasusi`;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `street` varchar(100) NOT NULL,
  `number` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `street`, `number`, `city`, `state`, `postal_code`, `name`, `user_id`) VALUES
(6, 'Gianantonio', 4000, 'capital federal', 'Ciudad Autónoma de Buenos Aires', '1202', 'unica', 1),
(7, 'Gianantonio', 3950, 'capital federal', 'Ciudad Autónoma de Buenos Aires', '1202', 'unica', 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`) VALUES
(1, 'Planta Floral', 'Plantas cuyas vasculares con semillas flores presentan verticilos, sépalos, pétalos, estambres, carpelos y con semilla vestida haciendo referencia a la presencia de frutos'),
(2, 'Aromática', 'Desprenden sabores agradables y aromas perfumados, suaves y dulces. Predominan los aromas sobre los sabores y el color.'),
(3, 'Arbusto', 'Su tamaño suele ser bastante más reducido, tiene sus tallos y sus ramas duras y rígidas,gran cantidad de raíces y gran resistencia'),
(4, 'Suculenta', 'Aquellas en las que algún órgano está especializado en el almacenamiento de agua en cantidades mayores que las plantas sin esta adaptación'),
(5, 'Frutal', 'Plantas con flores que producen una fruta que se consume o se es utilizada por los seres humanos');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
CREATE TABLE `discount` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `percentage` decimal(10,0) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `name`, `percentage`, `active`) VALUES
(1, 'En Oferta', '10', 1),
(2, 'Coleccion Primavera', '25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_to_product`
--

DROP TABLE IF EXISTS `order_to_product`;
CREATE TABLE `order_to_product` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `care_level` varchar(40) NOT NULL,
  `description` text DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `discount_id` int(11) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `label` varchar(45) DEFAULT NULL,
  `img` varchar(100) NOT NULL DEFAULT '/img/plantas/aglaonema.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `care_level`, `description`, `stock`, `discount_id`, `price`, `label`, `img`) VALUES
(1, 'algaonema', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/aglaonema.png'),
(2, 'Bromelia', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/bromelia.png'),
(3, 'Abedul', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/abedul.png'),
(4, 'Acebo', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/aglaonema.png'),
(5, 'Anís', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/aglaonema.png'),
(6, 'Anturio', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/anturio.png'),
(7, 'Aspidistra', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/aspidistra.png'),
(8, 'Banderilla', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/aglaonema.png'),
(9, 'Campanilla ', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/campanilla.png'),
(10, 'Tulipán', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Oferta', '/img/plantas/tulipanes.png'),
(11, 'Tilo plateado', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/aglaonema.png'),
(12, 'Tilandsia', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/tillandsia.png'),
(13, 'Saúco', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/sauco.png'),
(14, 'Salvia', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/salvia.png'),
(15, 'Romero', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/romero.png'),
(16, 'Plumbago', 1, 'Experto', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/plumbago.png'),
(17, 'Petunia', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/petunia.png'),
(18, 'Ombú', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/aglaonema.png'),
(19, 'Nopal', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'Mas Vendida', '/img/plantas/nopal.png'),
(20, 'Melisa', 2, 'Básico', 'La Melisa es una planta aromatica con propiedades similares a la Menta.', 20, 1, '2500', 'none', '/img/plantas/planta-1655446946997.png'),
(21, 'Magnolia', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(22, 'Lirio ', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(23, 'Lavanda', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(24, 'Laurel', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(25, 'Jacaranda', 1, 'Básico', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(26, 'Higuera', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(27, 'Girasol', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(28, 'Galanga', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(29, 'Fresno', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(30, 'Ficus', 1, 'Intermedio', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 20, 1, '3000', 'none', '/img/plantas/aglaonema.png'),
(33, 'Homero Simpson', 1, 'Básico', '', 0, 1, '500', 'none', '/img/plantas/aglaonema.png'),
(34, 'El Barto Simpson', 1, 'Básico', 'strhwrs', 3, 1, '2400', 'none', '/img/plantas/aglaonema.png'),
(35, 'Lisa Simpson', 3, 'Básico', 'strhwrs', 55, 1, '5500', 'none', '/img/plantas/aglaonema.png'),
(37, 'plantita feliz', 1, 'Básico', 'una prueba', 1, 1, '5000', 'none', '/img/plantas/planta-1654730447683.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` char(100) NOT NULL DEFAULT '/img/otros/user.png',
  `mobile` int(11) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `user_category_id` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `img`, `mobile`, `date_of_birth`, `user_category_id`) VALUES
(1, 'Joaquin', 'Phoenix', 'joaquinP@digitalhouse.com', '$2a$10$4rQtOtjZk4y7aS/nretzYO1Ht4WMP/o7YsiCGP5cOKah8oISm3qKa', '/img/users/avatar/user-undefined-1657563466724.jpg', 1234567890, '1988-05-06', 1),
(2, 'Tom', 'Cruise', 'tomC@digitalhouse.com', '$2a$10$4rQtOtjZk4y7aS/nretzYO1Ht4WMP/o7YsiCGP5cOKah8oISm3qKa', '/img/otros/user.png', 1234567890, '1970-11-26', 2),
(3, 'Elliot', 'Page', 'elliotP@digitalhouse.com', '$2a$10$4rQtOtjZk4y7aS/nretzYO1Ht4WMP/o7YsiCGP5cOKah8oISm3qKa', '/img/otros/user.png', 1234567890, '1998-09-03', 3),
(4, 'Eva', 'Longoria', 'evaL@digitalhouse.com', '$2a$10$4rQtOtjZk4y7aS/nretzYO1Ht4WMP/o7YsiCGP5cOKah8oISm3qKa', '/img/otros/user.png', 1234567890, '1978-07-15', 3),
(5, 'Emma', 'Watson', 'emmaW@digitalhouse.com', '$2a$10$4rQtOtjZk4y7aS/nretzYO1Ht4WMP/o7YsiCGP5cOKah8oISm3qKa', '/img/otros/user.png', 1234567890, '1990-09-22', 3),
(10, 'prueba5000', 'basedatos', 'prueba5@database.com', '$2a$10$d5tXMO.4sYDfMFEqUWLwUugsi3ZOnklBOuBWUeBjluQhB8/sXiU.e', '/img/otros/user.png', NULL, NULL, 3),
(11, 'prueba5000', 'basedatos', 'prueba5@database.com', '$2a$10$Cude.8WjhMiKMEVwOI5b0.HH.j7aS6vCVmocTN/BYXa.xs3fkyUca', '/img/otros/user.png', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_category`
--

DROP TABLE IF EXISTS `user_category`;
CREATE TABLE `user_category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_category`
--

INSERT INTO `user_category` (`id`, `name`, `description`) VALUES
(1, 'Administrador', 'Este usuario tiene permisos de administrador'),
(2, 'Editor', 'Este usuario tiene permisos de edición'),
(3, 'Usuario', 'Este usuario tiene permisos de lecutra');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_method_id` (`payment_method_id`),
  ADD KEY `users_id` (`user_Id`);

--
-- Indexes for table `order_to_product`
--
ALTER TABLE `order_to_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `products_id` (`product_id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `discount_id` (`discount_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_category_Id` (`user_category_id`);

--
-- Indexes for table `user_category`
--
ALTER TABLE `user_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_to_product`
--
ALTER TABLE `order_to_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_category`
--
ALTER TABLE `user_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `payment_method_id` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  ADD CONSTRAINT `users_id` FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_to_product`
--
ALTER TABLE `order_to_product`
  ADD CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `products_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `discount_id` FOREIGN KEY (`discount_id`) REFERENCES `discount` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user_category_Id` FOREIGN KEY (`user_category_id`) REFERENCES `user_category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
