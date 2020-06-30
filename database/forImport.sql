
#CREO BASE DE DATOS
CREATE DATABASE IF NO EXISTS DelilahResto
USE `DelilahResto`


#CREO TABLA USUARIOS
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) NOT NULL PRIMARY KEY,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fullName` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
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
  `username` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL, 
  `timeCreated` TIME NOT NULL,
  `description` varchar(120) NOT NULL,
  `paymentMethod` varchar(120) NOT NULL,
  `paymentValue` float(7) NOT NULL,
  `updatedAt` TIME
)CHARSET=utf8;


#CREO TABLA ORDERS_PRODUCTS 
DROP TABLE IF EXISTS `orders_products`;

CREATE TABLE orders_products (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `id_product` int(10) NOT NULL,
  `id_order` int(10) NOT NULL,
  `productPrice` int(5) NOT NULL,
  `productAmount` int(3) NOT NULL,
  `subtotal` int(10) NOT NULL
);




#CARGA TABLA USUARIOS
INSERT INTO `users`
    (`id`, `username`,`password`,`fullName`,`email`,`phoneNumber`,`isAdmin`)
VALUE
    (1, 'vicky','hola123', 'Victoria Calvo','victoriacalvo97@hotmail.com','3468408136',1),
    (1, 'sofi','hola123', 'Sofia Calvo','soficalvo96@hotmail.com','3468408136',0)



#CARGA TABLA PRODUCTOS
INSERT INTO `products`
    (`id`, `name`,`description`,`price`,`imageSrc`, `isActive`)
VALUE
    (1, 'hamburguesa','completa', 300 ,'www.google.com', 1),
    (2, 'gaseosa', 'coca cola 1.5 litros',150,'www.hola.com', 1),
    (3, 'pancho', 'con ketchup',50,'www.hola.com', 1)




#CARGA TABLA ORDERS
INSERT INTO `orders`
    (`id`, `username`,`state`,`timeCreated`,`description`, `paymentMethod`, `paymentValue`)
VALUE
    (1, 'vicky','nuevo', "20:00:00" ,'3 hamburguesas - 2 panchos', "efectivo", 1000)
    (2, 'santi','nuevo', "20:00:00",'5 gaseosas', "tarjeta", 750),
    (3, 'sofi','nuevo', "20:00:00",'1 gaseosa- 1 hamburgesa - 1 pancho', "tarjeta", 500)



#CARGA TABLA ORDERS_PRODUCTS
INSERT INTO `orders_products`
    (`id`, `id_product`,`id_order`,`productPrice`,`productAmount`, `subtotal`)
VALUE
    (1, 1, 1, 300, 3, 900),
    (2, 3, 1, 50, 2, 100),
    (3, 2, 2, 150, 5, 750),
    (4, 2, 3, 150, 1, 150),
    (5, 1, 3, 300, 1, 300),
    (6, 3, 3, 50, 21, 50)
