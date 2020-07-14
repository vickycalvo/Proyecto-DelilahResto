#CREO BASE DE DATOS
DROP DATABASE IF EXISTS `DelilahResto`;
CREATE DATABASE `DelilahResto`;
USE `DelilahResto`;


#CREO TABLA USUARIOS
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fullName` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address`varchar(120) NOT NULL,
  `phoneNumber` varchar(30) NOT NULL,
  `isAdmin` int(1) NOT NULL DEFAULT 0
) CHARSET=utf8;


#CREO TABLA PRODUCTOS
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(120) NOT NULL,
  `price` int(10) NOT NULL,
  `imageSrc` varchar(100) NOT NULL, 
  `isActive`int(1) NOT NULL DEFAULT 1
)CHARSET=utf8;


#CREO TABLA ORDERS 
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `idUser` int(10) NOT NULL,
  `state` varchar(30) NOT NULL, 
  `createdAt` DATETIME NOT NULL,
  `description` varchar(120) NOT NULL,
  `paymentMethod` varchar(120) NOT NULL,
  `paymentValue` float(7) NOT NULL,
  `updatedAt` DATETIME NOT NULL
)CHARSET=utf8;


#CREO TABLA ORDERS_PRODUCTS 
DROP TABLE IF EXISTS `orders_products`;
CREATE TABLE orders_products (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `idProduct` int(10) NOT NULL,
  `idOrder` int(10) NOT NULL,
  `productPrice` int(5) NOT NULL,
  `productAmount` int(3) NOT NULL,
  `subtotal` int(10) NOT NULL
);

#CARGA TABLA USUARIOS
INSERT INTO `users`
  (`id`, `username`,`password`,`fullName`,`email`,`address`,`phoneNumber`,`isAdmin`)
VALUE
  (1, 'vicky', 'hola123', 'Victoria Calvo', 'victoriacalvo97@hotmail.com', 'cordoba 2020', '3468408136', 1),
  (2, 'sofi', 'hola123', 'Sofia Calvo', 'soficalvo96@hotmail.com', 'rioja 30', '3468408136', 0);


#CARGA TABLA PRODUCTOS
INSERT INTO `products`
  (`id`, `name`,`description`,`price`,`imageSrc`, `isActive`)
VALUE
  (1, 'hamburguesa', 'completa', 300 , 'www.pinterest.com', 1),
  (2, 'gaseosa', 'coca cola 1.5 litros', 150, 'www.cocacola.com', 1),
  (3, 'pancho', 'con ketchup', 50, 'www.pancheria.com', 1);


#CARGA TABLA ORDERS
INSERT INTO `orders`
  (`id`, `idUser`,`state`,`createdAt`,`description`, `paymentMethod`, `paymentValue`, `updatedAt`)
VALUE
  (1, 1, 'nuevo', '2019-05-10 20:20:00', '3 hamburguesas - 2 panchos', 'efectivo', 1000, '2019-05-10 20:20:00'),
  (2, 1, 'nuevo', '2020-10-10 01:10:08', '5 gaseosas', 'tarjeta', 750, '2020-10-10 01:10:08'),
  (3, 2, 'nuevo', '2020-01-25 13:07:20', '1 gaseosa- 1 hamburgesa - 1 pancho', 'tarjeta', 500, '2020-01-25 13:07:20');

  
#CARGA TABLA ORDERS_PRODUCTS
INSERT INTO `orders_products`
  (`id`, `idProduct`,`idOrder`,`productPrice`,`productAmount`, `subtotal`)
VALUE
  (1, 1, 1, 300, 3, 900),
  (2, 3, 1, 50, 2, 100),
  (3, 2, 2, 150, 5, 750),
  (4, 2, 3, 150, 1, 150),
  (5, 1, 3, 300, 1, 300),
  (6, 3, 3, 50, 1, 50);