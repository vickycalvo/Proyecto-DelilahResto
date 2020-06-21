
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
    (1, 'dulce de leche','marca la serenisima estilo colonial', 100 ,'www.hola.com', 1),
    (2, 'queso', 'marca la serenisima',300,'www.hola.com', 1)



#CARGA TABLA ORDERS
INSERT INTO `orders`
    (`id`, `username`,`state`,`timeCreated`,`description`, `paymentMethod`, `paymentValue`, `updatedAt`)
VALUE
    (1, 'vicky','nuevo', "20:00:00" ,'3 hamburguesas', "efectivo", 1300, "20:00:00"),
    (2, 'sofi','entreagado', "20:00:00",'3 pizzas', "tarjeta", 1300, "22:00:00")


#CARGA TABLA ORDERS_PRODUCTS
INSERT INTO `orders_products`
    (`id`, `id_product`,`id_order`,`productPrice`,`productAmount`, `subtotal`)
VALUE
    (1, 1, 1, 100, 1, 100),
    (2, 1, 3, 200, 2, 400),
    (3, 2, 1, 100, 3, 300)