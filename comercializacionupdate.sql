-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2020 a las 05:38:31
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
(167, 24, 'San MigueL'),
(173, 25, 'Usulutan');

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
-- Estructura de tabla para la tabla `lista_deseos`
--

CREATE TABLE `lista_deseos` (
  `idlistadeseos` int(11) NOT NULL,
  `id_usuario_propiettario` int(11) NOT NULL,
  `id_usuario_vendedor` int(11) NOT NULL,
  `id_datos_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista_deseos`
--

INSERT INTO `lista_deseos` (`idlistadeseos`, `id_usuario_propiettario`, `id_usuario_vendedor`, `id_datos_producto`) VALUES
(2, 24, 25, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misproducto`
--

CREATE TABLE `misproducto` (
  `miproducto` int(8) NOT NULL,
  `fk_idusuario` int(8) NOT NULL,
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

INSERT INTO `misproducto` (`miproducto`, `fk_idusuario`, `nombre_producto`, `precio`, `precio_venta`, `existencias`, `descprod`, `imagen`, `categoria`, `fecha_subida`) VALUES
(36, 24, 'PAPAS', 1.1, 1.25, '100', 'SOLOMA', 'Private/Modulos/misproductos/imagenes/1904442263unnamed.jpg', 'verdura', '2020-05-14'),
(40, 24, 'Tomates', 0.26, 0.75, '1000', 'Rojo Tomate', 'Private/Modulos/misproductos/imagenes/751420557tomate-1024x680.jpg', 'Verdura', '2020-05-14'),
(41, 24, 'Chile Jalapeño', 0.35, 0.075, '1000', 'Chile jalapeño', 'Private/Modulos/misproductos/imagenes/1946703030chile-jalapeno.jpg', 'Verdura', '2020-05-14'),
(43, 25, 'Tomates', 0.25, 0.75, '100', 'Rojos grandes', 'Private/Modulos/misproductos/imagenes/314810718751420557tomate-1024x680.jpg', 'Verdura', '2020-05-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idproducto` int(8) NOT NULL,
  `usuariofk` int(8) NOT NULL,
  `nombreproducto` varchar(200) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` float NOT NULL,
  `tipoHortaliza` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idproducto`, `usuariofk`, `nombreproducto`, `descripcion`, `precio`, `tipoHortaliza`) VALUES
(1, 24, 'Lechuga', 'Lechuga tipo iceberg costera produce cabezas atractivas y uniformes adecuadas para mercado fresco. Sure Shot proporciona a los productores una larga ventana de cosecha de primavera', 1.5, 'Verdura'),
(2, 25, 'NARANJAS ZUMO + AGUACATES - Navelina', 'Nuestras naranjas y aguacates se cultivan de forma respetuosa con el medio ambiente.\r\n\r\nSi desea una caja de naranjas no lo dudes, es el momento, pídela y en en este instante iremos a recolectarlas para usted, y se lo mandaremos el mismo día.\r\n\r\nNuestro aguacate HASS destaca por su gran calidad y auténtico sabor,esto es debido a que los recolectamos en el punto exacto de maduración,los más frescos del mercado,cultivados en Valencia.', 10, 'Frutas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(8) NOT NULL,
  `nombreu` varchar(100) NOT NULL,
  `imagen` varchar(255) NOT NULL,
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
(24, 'Michael', 'Private/Modulos/misproductos/imagenes/1904442263unnamed.jpg', 'Cooperativa Lider', '72745936', 'cooperativa', 'cooperativalider@gmail.com', '12345678', '2020-04-26'),
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
-- Indices de la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  ADD PRIMARY KEY (`infoUsuario`),
  ADD KEY `fk_idusuario` (`fk_idusuario`);

--
-- Indices de la tabla `lista_deseos`
--
ALTER TABLE `lista_deseos`
  ADD PRIMARY KEY (`idlistadeseos`),
  ADD KEY `id_usuario_propiettario` (`id_usuario_propiettario`),
  ADD KEY `id_usuario_vendedor` (`id_usuario_vendedor`),
  ADD KEY `id_datos_producto` (`id_datos_producto`);

--
-- Indices de la tabla `misproducto`
--
ALTER TABLE `misproducto`
  ADD PRIMARY KEY (`miproducto`),
  ADD KEY `fk_idusuario` (`fk_idusuario`),
  ADD KEY `fk_idusuario_2` (`fk_idusuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `fkUsuarios` (`usuariofk`);

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
  MODIFY `idDireccion` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT de la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  MODIFY `infoUsuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `lista_deseos`
--
ALTER TABLE `lista_deseos`
  MODIFY `idlistadeseos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `misproducto`
--
ALTER TABLE `misproducto`
  MODIFY `miproducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idproducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Filtros para la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  ADD CONSTRAINT `informacionnosotros_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lista_deseos`
--
ALTER TABLE `lista_deseos`
  ADD CONSTRAINT `lista_deseos_ibfk_1` FOREIGN KEY (`id_usuario_propiettario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lista_deseos_ibfk_2` FOREIGN KEY (`id_usuario_vendedor`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lista_deseos_ibfk_3` FOREIGN KEY (`id_datos_producto`) REFERENCES `productos` (`idproducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `misproducto`
--
ALTER TABLE `misproducto`
  ADD CONSTRAINT `misproducto_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`usuariofk`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
