-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2020 a las 18:10:44
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comercializacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misproducto`
--

CREATE TABLE `misproducto` (
  `miproducto` int(8) NOT NULL,
  `fk_idusuario` int(8) NOT NULL,
  `codigo_producto` varchar(8) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `precio` float NOT NULL,
  `precio_venta` float NOT NULL,
  `existencias` varchar(100) NOT NULL,
  `descprod` varchar(500) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `fecha_subida` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `misproducto`
--

INSERT INTO `misproducto` (`miproducto`, `fk_idusuario`, `codigo_producto`, `nombre_producto`, `precio`, `precio_venta`, `existencias`, `descprod`, `imagen`, `categoria`, `fecha_subida`) VALUES
(36, 24, '0001', 'PAPAS', 1.15, 1.25, '100', 'SOLOMA', 'Private/Modulos/misproductos/imagenes/1904442263unnamed.jpg', 'Verduras', '2020-05-14'),
(41, 24, '0002', 'Chile Jalapeño', 0.35, 0.75, '1000', 'Chile jalapeño', 'Private/Modulos/misproductos/imagenes/1946703030chile-jalapeno.jpg', 'Verduras', '2020-05-14'),
(56, 24, '0003', 'Tomate Raf', 0.75, 1.5, '150', 'Nuestro tomate RAF más distinguido, asurcado por naturaleza, de color verde oscuro de diferente intensidad, textura crujiente, exquisito y dulce con un punto ácido. Sin duda la mejor opción para ensaladas o degustar directamente.', 'Private/Modulos/misproductos/imagenes/2032543906Tomata_Raf_2015-12-29-1543.jpg', 'Verduras', '2020-05-17'),
(57, 25, '0001', 'Tomate Raf', 1, 1.75, '1000', 'Nuestro tomate RAF más distinguido, asurcado por naturaleza, de color verde oscuro de diferente intensidad, textura crujiente, exquisito y dulce con un punto ácido. Sin duda la mejor opción para ensaladas o degustar directamente.', 'Private/Modulos/misproductos/imagenes/1869893357Tomata_Raf_2015-12-29-1543.jpg', 'Verdura', '2020-05-17'),
(58, 26, '0001', 'Tomatoides', 0.25, 0.5, '1000', 'Rojo tomate ', 'Private/Modulos/misproductos/imagenes/13439243721371809248tomate-1024x680.jpg', 'verdura', '2020-05-23'),
(59, 24, '0004', 'Fresas', 1.5, 1.75, '1.000', 'Fresas Frescas!!!!!', 'Private/Modulos/misproductos/imagenes/1576200119fresa.jpg', 'Frutos', '2020-05-29'),
(60, 27, '0001', 'Manzana ', 1.55, 2, '1000', 'Manzanas para elaborar mermeladas o cualquier otro producto de cocina a base de esta exquisita fruta. Nos hemos animado a poner esta oferta bajo la demanda de varios consumidores de las colmenas. ¡Debemos avisar que las manzanas que van son manzanas de desecho que no incluimos en venta de producto fresco, nunca van pochas, pero si con golpes, heridas en la piel, etc! No se debe adquirir este producto pensando en fruta de consumo, con la calidad de la misma.', 'Private/Modulos/misproductos/imagenes/1356474443manzana.jpg', 'Fruta', '2020-05-30'),
(61, 24, '0005', 'Piña', 2, 3.5, '1005', 'Piña dulce y jugosa, para postres y zumos Peso aproximado 2 Kg/unidad', 'Private/Modulos/misproductos/imagenes/553465475pina.jpg', 'Frutos', '2020-05-31'),
(62, 24, '0006', 'Frijoles Rojos', 1.1, 1.6, '1000', 'frijol', 'Private/Modulos/misproductos/imagenes/1263173796ff.jfif', 'Legumbres', '2020-06-09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `misproducto`
--
ALTER TABLE `misproducto`
  ADD PRIMARY KEY (`miproducto`),
  ADD KEY `fk_idusuario` (`fk_idusuario`),
  ADD KEY `fk_idusuario_2` (`fk_idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `misproducto`
--
ALTER TABLE `misproducto`
  MODIFY `miproducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `misproducto`
--
ALTER TABLE `misproducto`
  ADD CONSTRAINT `misproducto_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
