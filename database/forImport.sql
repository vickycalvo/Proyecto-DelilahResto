
#CREO BASE DE DATOS
CREATE DATABASE IF NO EXISTS DelilahResto
USE DelilahResto


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
  `imageSrc` varchar(100)
)



#CARGA TABLA USUARIOS
INSERT INTO `users`
    (`id`, `username`,`password`,`fullName`,`email`,`phoneNumber`,`isAdmin`)
VALUE
    (1, 'vicky','hola123', 'Victoria Calvo','victoriacalvo97@hotmail.com','3468408136',1),
    (1, 'sofi','hola123', 'Sofia Calvo','soficalvo96@hotmail.com','3468408136',0)



#CARGA TABLA PRODUCTOS
INSERT INTO `products`
    (`id`, `name`,`description`,`price`,`imageSrc`)
VALUE
    (1, 'dulce de leche','marca la serenisima estilo colonial', 100 ,'www.hola.com'),
    (2, 'queso', 'marca la serenisima',300,'www.hola.com')