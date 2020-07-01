-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2020 a las 03:48:16
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
(173, 25, 'Usulutan'),
(188, 26, 'Usulutan'),
(189, 27, 'San Rafael Oriente'),
(200, 61, 'San Miguel'),
(201, 24, 'Usulutan');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id_horario` int(8) NOT NULL,
  `id_info` int(8) NOT NULL,
  `Dias` varchar(70) NOT NULL,
  `Horas1` varchar(5) NOT NULL,
  `DE` varchar(5) NOT NULL,
  `A` varchar(5) NOT NULL,
  `HORA2` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id_horario`, `id_info`, `Dias`, `Horas1`, `DE`, `A`, `HORA2`) VALUES
(20, 2, 'Lunes a Jueves', '05:41', 'AM', 'PM', '06:41'),
(22, 11, 'Lunes a viernes', '10:25', 'AM', 'PM', '10:25'),
(28, 1, 'Martes a Sabado', '07:01', 'AM', 'PM', '07:00'),
(30, 2, 'Sabado Y domingo', '07:06', 'AM', 'PM', '10:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacionnosotros`
--

CREATE TABLE `informacionnosotros` (
  `infoUsuario` int(8) NOT NULL,
  `fk_idusuario` int(8) NOT NULL,
  `imagen` varchar(500) NOT NULL,
  `descripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `informacionnosotros`
--

INSERT INTO `informacionnosotros` (`infoUsuario`, `fk_idusuario`, `imagen`, `descripcion`) VALUES
(1, 25, 'Private/Modulos/about/imagenesco/192532823cyber2.jpg', 'no nada'),
(2, 24, 'Private/Modulos/about/imagenesco/1088958184ra.jpg', 'Fincomercio es una cooperativa de ahorro y crédito, sólida y confiable, que presta servicios financieros y sociales a personas naturales y jurídicas, para beneficiarlos con rentabilidad económica y social.  '),
(3, 26, 'Private/Modulos/about/imagenesco/2105401588Cooperativas_interna.png', 'La Federación de Asociaciones Cooperativas de Ahorro y Crédito de El Salvador de Responsabilidad Limitada, FEDECACES de R.L., es la organización cooperativa de segundo piso, fundada el 11 de junio de 1966, con 52 años, con más de 115 agencias a nivel nacional las que atienden a diversos sectores de población salvadoreña, sean trabajadores asalariados privados o públicos, micro y pequeñas empresas, artesanos, agricultores, profesionales, y pequeños y medianos productores entre otros.'),
(11, 61, 'Private/Modulos/about/imagenesco/1485062701kali.jpg', 'asdas'),
(14, 75, 'Private/Modulos/about/imagenesco/1115300299cyber2.jpg', 'sadfasda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_deseos`
--

CREATE TABLE `lista_deseos` (
  `id_desos` int(8) NOT NULL,
  `id_miproducto` int(8) NOT NULL,
  `id_usuario` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lista_deseos`
--

INSERT INTO `lista_deseos` (`id_desos`, `id_miproducto`, `id_usuario`) VALUES
(7, 59, 61),
(9, 56, 61),
(120, 36, 24),
(126, 36, 24),
(127, 36, 24),
(128, 57, 24),
(129, 36, 24),
(138, 36, 25),
(139, 41, 25),
(142, 58, 25),
(143, 57, 25),
(147, 70, 25),
(148, 71, 24),
(149, 58, 25),
(150, 41, 69),
(152, 41, 24),
(153, 71, 0),
(154, 69, 24),
(155, 36, 24),
(156, 36, 24),
(157, 41, 24),
(158, 36, 75),
(159, 41, 24);

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
  `descprod` varchar(250) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `Libra` varchar(5) NOT NULL,
  `Arroba` varchar(5) NOT NULL,
  `Quintal` varchar(5) NOT NULL,
  `Caja` varchar(5) NOT NULL,
  `fecha_subida` date NOT NULL,
  `isagotado` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `misproducto`
--

INSERT INTO `misproducto` (`miproducto`, `fk_idusuario`, `codigo_producto`, `nombre_producto`, `precio`, `precio_venta`, `existencias`, `descprod`, `imagen`, `categoria`, `Libra`, `Arroba`, `Quintal`, `Caja`, `fecha_subida`, `isagotado`) VALUES
(36, 24, '0001', 'PAPAS', 1.15, 1.25, '100', 'SOLOMA', 'Private/Modulos/misproductos/imagenes/1904442263unnamed.jpg', 'Verduras', '1', '', '1', '1', '2020-05-14', 'NO'),
(41, 24, '0002', 'Chile Jalapeño', 1.35, 1.75, '1000', 'Chile jalapeño', 'Private/Modulos/misproductos/imagenes/1946703030chile-jalapeno.jpg', 'Verduras', '1', '', '1', '0', '2020-05-14', 'NO'),
(57, 25, '0001', 'Tomate Raf', 1, 1.75, '1000', 'Nuestro tomate RAF más distinguido, asurcado por naturaleza, de color verde oscuro de diferente intensidad, textura crujiente, exquisito y dulce con un punto ácido. Sin duda la mejor opción para ensaladas o degustar directamente.', 'Private/Modulos/misproductos/imagenes/1869893357Tomata_Raf_2015-12-29-1543.jpg', 'Verduras', '0', '0', '0', '0', '2020-05-17', 'NO'),
(58, 26, '0001', 'Tomatoides', 0.25, 0.5, '1000', 'Rojo tomate ', 'Private/Modulos/misproductos/imagenes/13439243721371809248tomate-1024x680.jpg', 'Verduras', '0', '0', '0', '0', '2020-05-23', 'NO'),
(60, 27, '0001', 'Manzana ', 1.55, 2, '1000', 'Manzanas para elaborar mermeladas o cualquier otro producto de cocina a base de esta exquisita fruta. Nos hemos animado a poner esta oferta bajo la demanda de varios consumidores de las colmenas. ¡Debemos avisar que las manzanas que van son manzanas ', 'Private/Modulos/misproductos/imagenes/1356474443manzana.jpg', 'Frutos', '0', '0', '0', '0', '2020-05-30', 'NO'),
(69, 61, '01', 'Lechuga', 1, 1.5, '100', 'Fresca', 'Private/Modulos/misproductos/imagenes/1250126831descarga.jpeg', 'Legumbres', '', '', '', '1', '2020-06-16', 'SI'),
(70, 24, '0003', 'Lechuga', 1.5, 2.25, '100.00', 'regional', 'Private/Modulos/misproductos/imagenes/1891327410lechuga.jpg', 'Verduras', '', '', '', '1', '2020-06-18', 'NO'),
(71, 25, '0002', 'Mango Rojo', 1.5, 2, '100.00', '....', 'Private/Modulos/misproductos/imagenes/1475155466mang.jpeg', 'Frutos', '', '', '', '1', '2020-06-21', 'NO'),
(72, 75, '0001', 'Mango', 1.5, 1.75, '001.00', 'Rojo Mango', 'Private/Modulos/misproductos/imagenes/390333460descarga.jpg', 'Frutos', '', '', '', '1', '2020-06-23', 'NO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mis_compras`
--

CREATE TABLE `mis_compras` (
  `id_compras` int(8) NOT NULL,
  `usuario` int(8) NOT NULL,
  `fk_miproducto` int(8) NOT NULL,
  `cantidad_compra` int(10) NOT NULL,
  `forma_compra` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mis_compras`
--

INSERT INTO `mis_compras` (`id_compras`, `usuario`, `fk_miproducto`, `cantidad_compra`, `forma_compra`) VALUES
(32, 24, 41, 9, 'Libra'),
(33, 24, 36, 1, 'Libra'),
(34, 24, 36, 1, 'Libra'),
(35, 24, 36, 1, 'Libra'),
(36, 24, 41, 3, 'Quintal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_oferta`
--

CREATE TABLE `productos_oferta` (
  `idoferta` int(11) NOT NULL,
  `fk_producto` int(11) NOT NULL,
  `precio_oferta` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos_oferta`
--

INSERT INTO `productos_oferta` (`idoferta`, `fk_producto`, `precio_oferta`) VALUES
(1, 36, '1');

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
  `activo` varchar(4) NOT NULL,
  `fechaR` date NOT NULL,
  `hash` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombreu`, `imagen`, `nombrecooperativa`, `telefono`, `tipoUsuario`, `correo`, `passwords`, `activo`, `fechaR`, `hash`) VALUES
(24, 'Michael', 'Private/Modulos/usuarios/imagenesp/1010194283FB_IMG_1589509010037.jpg', 'Cooperativa Lider', '72745936', 'cooperativa', 'cooperativalider@gmail.com', 'Slayer.60', '1', '2020-04-26', ''),
(25, 'Melissa Estefania', 'Private/Modulos/usuarios/imagenesp/364910472cyber2.jpg', 'Cooperativa mango', '72737475', 'cooperativa', 'cooperativamango@gmail.com', '12345678', '1', '2020-03-27', ''),
(26, 'Jimmy', 'Private/Modulos/usuarios/imagenesp/18076638751130709656wallpaper.jpg', 'cooperativa milos', '72737273', 'cooperativa', 'cooperativamilos@gmail.com', '123456', '1', '2020-04-28', ''),
(27, 'Cecilia Maria', 'Private/Modulos/usuarios/imagenesp/1091557139aaa.jpg', '', '76824693', 'Productor Pequeño', 'ceciliamaria@gmail.com', '12345678', '0', '2020-04-28', ''),
(28, 'Arely', '', 'Coopiref', '77745991', 'Cooperativa', 'coopiref@gmail.com', '12345678', '0', '2020-03-29', ''),
(35, 'Maria Contreras', '', 'Contreras US', '7274-5936', 'Cooperativa', 'contrerascopi@gmail.com', '12345678', '0', '2020-05-06', ''),
(58, 'scott', '', '', '73737377', 'Cliente', 'scottlovos503@gmail.com', 'Slayer.1', '1', '2020-06-09', '1693'),
(61, 'Cecilia Rodríguez', '', '', '76814676', 'Cliente', 'cecyrodriguez73@gmail.com', 'Ocwanomarino.73', '1', '2020-06-16', '2407'),
(62, 'Tania', '', '', '31231231', 'Cliente', 'toisplisetsky@gmail.com', 'Slayer.60', '1', '2020-06-17', '2348'),
(69, 'juan', '', '', '34321231', 'Productor Pequeño', 'michael5031rodriguez@gmail.com', 'Slayer.60', '1', '2020-06-21', '7750'),
(70, 'Michi', '', '', '82828282', 'Cliente', 'agroproducers2020@gmail.com', 'Slayer.60', 'cero', '2020-06-21', '2975'),
(71, '', '', '', '', '', '', 'sdf', '0', '0000-00-00', '2349'),
(72, '', '', '', '', '', '', 'sdf', '0', '0000-00-00', '6495'),
(73, '', '', '', '', '', '', 'sdf', '0', '0000-00-00', '2453'),
(74, 'michael', '', '', '', 'Productor Pequeño', '', 'sdf', '0', '0000-00-00', '6178'),
(75, 'Michael', '', '', '72745936', 'Cliente', 'luishernandez@ugb.edu.sv', 'Slayer.60', '1', '2020-06-23', '5765');

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
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `id_info` (`id_info`);

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
  ADD PRIMARY KEY (`id_desos`);

--
-- Indices de la tabla `misproducto`
--
ALTER TABLE `misproducto`
  ADD PRIMARY KEY (`miproducto`),
  ADD KEY `fk_idusuario` (`fk_idusuario`),
  ADD KEY `fk_idusuario_2` (`fk_idusuario`);

--
-- Indices de la tabla `mis_compras`
--
ALTER TABLE `mis_compras`
  ADD PRIMARY KEY (`id_compras`),
  ADD KEY `fk_miproducto` (`fk_miproducto`);

--
-- Indices de la tabla `productos_oferta`
--
ALTER TABLE `productos_oferta`
  ADD PRIMARY KEY (`idoferta`),
  ADD KEY `fk_producto` (`fk_producto`);

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
  MODIFY `idDireccion` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  MODIFY `infoUsuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `lista_deseos`
--
ALTER TABLE `lista_deseos`
  MODIFY `id_desos` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT de la tabla `misproducto`
--
ALTER TABLE `misproducto`
  MODIFY `miproducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `mis_compras`
--
ALTER TABLE `mis_compras`
  MODIFY `id_compras` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `productos_oferta`
--
ALTER TABLE `productos_oferta`
  MODIFY `idoferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `direcciones_ibfk_1` FOREIGN KEY (`fkUsuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`id_info`) REFERENCES `informacionnosotros` (`infoUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  ADD CONSTRAINT `informacionnosotros_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `misproducto`
--
ALTER TABLE `misproducto`
  ADD CONSTRAINT `misproducto_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mis_compras`
--
ALTER TABLE `mis_compras`
  ADD CONSTRAINT `mis_compras_ibfk_1` FOREIGN KEY (`fk_miproducto`) REFERENCES `misproducto` (`miproducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos_oferta`
--
ALTER TABLE `productos_oferta`
  ADD CONSTRAINT `productos_oferta_ibfk_1` FOREIGN KEY (`fk_producto`) REFERENCES `misproducto` (`miproducto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
