-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2020 a las 18:23:03
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
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `idDireccion` int(8) NOT NULL,
  `fkUsuario` int(8) NOT NULL,
  `Direccion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `direcciones`
--

INSERT INTO `direcciones` (`idDireccion`, `fkUsuario`, `Direccion`) VALUES
(167, 24, 'San Rafael Oriente '),
(173, 25, 'Usulután, Centro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imgperfill`
--

CREATE TABLE `imgperfill` (
  `idimagen` int(8) NOT NULL,
  `fk_usuairo` int(8) NOT NULL,
  `imgperfil` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacionnosotros`
--

CREATE TABLE `informacionnosotros` (
  `infoUsuario` int(8) NOT NULL,
  `fk_idusuario` int(8) NOT NULL,
  `Mision` varchar(500) NOT NULL,
  `Vision` varchar(500) NOT NULL,
  `Valores` varchar(500) NOT NULL,
  `Principios` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `informacionnosotros`
--

INSERT INTO `informacionnosotros` (`infoUsuario`, `fk_idusuario`, `Mision`, `Vision`, `Valores`, `Principios`) VALUES
(1, 25, 'Fincomercio es una cooperativa de ahorro y crédito, sólida y confiable, que presta servicios financieros y sociales a personas naturales y jurídicas, para beneficiarlos con rentabilidad económica y social.', 'somos locos', 'nos respetamos', 'principiamos'),
(2, 24, 'Fincomercio es una cooperativa de ahorro y crédito, sólida y confiable, que presta servicios financieros y sociales a personas naturales y jurídicas, para beneficiarlos con rentabilidad económica y social.', 'Ser una cooperativa de ahorro y crédito comprometida con la transformación social y económica de los asociados y sus familias, y de las personas jurídicas asociadas, para apoyar en las soluciones de las necesidades de su ciclo de vida, apoyándolos en la formación de su patrimonio, en su bienestar y en su seguridad futura.', 'Escuchamos con atención a nuestro asociados y no asociados y a nuestro capital humano, para conocer con exactitud sus necesidades y proponerle soluciones adecuadas.\r\n\r\nTenemos los ojos y los oídos del asociado y no asociado en cualquier operación que desarrollemos, preguntándonos continuamente por su satisfacción.\r\n\r\nEscuchamos activamente, con actitud abierta y respeto la opinión de todas las partes implicadas en una situación.', 'Adhesión voluntaria y abierta.\r\nGestión democrática por parte de los socios.\r\nParticipación económica de los socios.\r\nAutonomía e independencia.\r\nEducación, formación e información.\r\nCooperación entre cooperativas.\r\nInterés por la comunidad.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misproductos`
--

CREATE TABLE `misproductos` (
  `miproductoid` int(8) NOT NULL,
  `fkUsuarios` int(8) NOT NULL,
  `nombreproducto` varchar(200) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` float NOT NULL,
  `tipoHortaliza` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `misproductos`
--

INSERT INTO `misproductos` (`miproductoid`, `fkUsuarios`, `nombreproducto`, `descripcion`, `precio`, `tipoHortaliza`) VALUES
(1, 24, 'Lechuga', 'Lechuga tipo iceberg costera produce cabezas atractivas y uniformes adecuadas para mercado fresco. Sure Shot proporciona a los productores una larga ventana de cosecha de primavera', 1.5, 'Verdura');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int(8) NOT NULL,
  `fk_idusuario` int(8) NOT NULL,
  `nombreprod` varchar(100) NOT NULL,
  `precio` float NOT NULL,
  `precio_venta` float NOT NULL,
  `descprod` varchar(500) NOT NULL,
  `imagen` blob NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `fecha_subida` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idproducto`, `fk_idusuario`, `nombreprod`, `precio`, `precio_venta`, `descprod`, `imagen`, `categoria`, `fecha_subida`) VALUES
(21, 24, 'Tomates', 0.25, 0, 'Los híbridos de tomate Seminis destacan por sus rendimientos sobresalientes y frutos de la más elevada calidad. Nuestras dos grandes categorías, indeterminados y determinados, cumplen las exigencias del mercado; la primera, especializada para cultivos protegidos en invernadero y mallasombra; la segunda, apta para campo abierto por sus resistencias a las enfermedades de mayor incidencias en las zonas de producción.', 0x6e756c6c, 'verdura', '0000-00-00'),
(22, 24, 'Zanahoria', 0.5, 0, 'Especializadas en formas de tubérculos, las zanahorias ofrecen resistencia a las principales enfermedades causadas por el suelo, que al mismo tiempo brindan a los productores tubérculos precoces con la calidad requerida para procesadores y mercados de consumo fresco', 0x6e756c6c, 'verdura', '0000-00-00'),
(23, 24, 'Sandia', 5, 0, 'Las sandías Seminis tienen un sabor dulce único y se distinguen por sus frutos con pulpa firme y crujiente, con o sin semilla, su tolerancia a corazón hueco y sus tamaños ideales para empaquetar en caja. Además, preocupados por las afectaciones por enfermedades como Antracnosis y Fusarium, innovamos mejorando nuestro portafolio de productos con variedades resistentes a estas enfermedades.', 0x6e756c6c, 'Fruta', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(8) NOT NULL,
  `nombreu` varchar(100) NOT NULL,
  `imagen` blob NOT NULL,
  `nombrecooperativa` varchar(100) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `tipoUsuario` text NOT NULL,
  `correo` varchar(200) NOT NULL,
  `passwords` varchar(100) NOT NULL,
  `fechaR` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombreu`, `imagen`, `nombrecooperativa`, `telefono`, `tipoUsuario`, `correo`, `passwords`, `fechaR`) VALUES
(24, 'Michael', '', 'Cooperativa Lider', '72745936', 'cooperativa', 'cooperativalider@gmail.com', '12345678', '2020-04-26'),
(25, 'Melissa Estefania', '', 'Cooperativa mango', '72737475', 'cooperativa', 'cooperativamango@gmail.com', '12345678', '2020-03-27'),
(26, 'Jimmy', '', 'cooperativa milos', '72737273', 'cooperativa', 'cooperativamilos@gmail.com', '123456', '2020-04-28'),
(27, 'Cecilia Maria', '', '', '76824693', 'Productor Pequeño', 'ceciliamaria@gmail.com', '12345678', '2020-04-28'),
(28, 'Arely', '', 'Coopiref', '77745991', 'Cooperativa', 'coopiref@gmail.com', '12345678', '2020-03-29'),
(35, 'Maria Contreras', '', 'Contreras US', '7274-5936', 'Cooperativa', 'contrerascopi@gmail.com', '12345678', '2020-05-06');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`idDireccion`),
  ADD KEY `fkUsuario` (`fkUsuario`);

--
-- Indices de la tabla `imgperfill`
--
ALTER TABLE `imgperfill`
  ADD PRIMARY KEY (`idimagen`),
  ADD KEY `fk_usuairo` (`fk_usuairo`);

--
-- Indices de la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  ADD PRIMARY KEY (`infoUsuario`),
  ADD KEY `fk_idusuario` (`fk_idusuario`);

--
-- Indices de la tabla `misproductos`
--
ALTER TABLE `misproductos`
  ADD PRIMARY KEY (`miproductoid`),
  ADD KEY `fkUsuarios` (`fkUsuarios`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `fk_idusuario` (`fk_idusuario`),
  ADD KEY `fk_idusuario_2` (`fk_idusuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `idDireccion` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT de la tabla `imgperfill`
--
ALTER TABLE `imgperfill`
  MODIFY `idimagen` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  MODIFY `infoUsuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `misproductos`
--
ALTER TABLE `misproductos`
  MODIFY `miproductoid` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `direcciones_ibfk_1` FOREIGN KEY (`fkUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `imgperfill`
--
ALTER TABLE `imgperfill`
  ADD CONSTRAINT `imgperfill_ibfk_1` FOREIGN KEY (`fk_usuairo`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  ADD CONSTRAINT `informacionnosotros_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `misproductos`
--
ALTER TABLE `misproductos`
  ADD CONSTRAINT `misproductos_ibfk_1` FOREIGN KEY (`fkUsuarios`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
