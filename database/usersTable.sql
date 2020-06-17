
#CREO BASE DE DATOS
CREATE DATABASE IF NO EXISTS DelilahResto
USE DelilahResto


#CREO TABLA USUARIOS
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,

) CHARSET=utf8;


#CREO TABLA PRODUCTOS
DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  
) CHARSET=utf8;




#CARGA TABLA USUARIOS
INSERT INTO `users`
    (`id`, `nombre`)
VALUE
    (`1`, `vicky`),
    (`2`, `sofi`),





#CARGA TABLA PRODUCTOS