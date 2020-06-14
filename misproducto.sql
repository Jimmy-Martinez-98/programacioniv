-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2020 a las 04:18:11
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
(187, 24, 'San Miguel '),
(188, 26, 'Usulutan'),
(189, 27, 'San Rafael Oriente');

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
(9, 2, 'Lunes A vierness', '06:25', 'AM', 'PM', '07:25'),
(10, 2, 'Sabados y domingos', '08:00', 'AM', 'PM', '12:00');

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
(1, 25, '', 'no nada'),
(2, 24, 'Private/Modulos/about/imagenesco/633397250Cooperativas_interna.png', 'Fincomercio es una cooperativa de ahorro y crédito, sólida y confiable, que presta servicios financieros y sociales a personas naturales y jurídicas, para beneficiarlos con rentabilidad económica y social.'),
(3, 26, 'Private/Modulos/about/imagenesco/2105401588Cooperativas_interna.png', 'La Federación de Asociaciones Cooperativas de Ahorro y Crédito de El Salvador de Responsabilidad Limitada, FEDECACES de R.L., es la organización cooperativa de segundo piso, fundada el 11 de junio de 1966, con 52 años, con más de 115 agencias a nivel nacional las que atienden a diversos sectores de población salvadoreña, sean trabajadores asalariados privados o públicos, micro y pequeñas empresas, artesanos, agricultores, profesionales, y pequeños y medianos productores entre otros.');

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
  `codigo_producto` varchar(8) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `precio` float NOT NULL,
  `precio_venta` float NOT NULL,
  `existencias` varchar(100) NOT NULL,
  `descprod` varchar(500) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `Libra` varchar(5) NOT NULL,
  `Arroba` varchar(5) NOT NULL,
  `Quintal` varchar(5) NOT NULL,
  `Caja` varchar(5) NOT NULL,
  `fecha_subida` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `misproducto`
--

INSERT INTO `misproducto` (`miproducto`, `fk_idusuario`, `codigo_producto`, `nombre_producto`, `precio`, `precio_venta`, `existencias`, `descprod`, `imagen`, `categoria`, `Libra`, `Arroba`, `Quintal`, `Caja`, `fecha_subida`) VALUES
(36, 24, '0001', 'PAPAS', 1.15, 1.25, '100', 'SOLOMA', 'Private/Modulos/misproductos/imagenes/1904442263unnamed.jpg', 'Verduras', '1', '', '1', '', '2020-05-14'),
(41, 24, '0002', 'Chile Jalapeño', 0.35, 0.75, '1000', 'Chile jalapeño', 'Private/Modulos/misproductos/imagenes/1946703030chile-jalapeno.jpg', 'Verduras', '1', '', '1', '', '2020-05-14'),
(56, 24, '0003', 'Tomate Raf', 0.75, 1.5, '150', 'Nuestro tomate RAF más distinguido, asurcado por naturaleza, de color verde oscuro de diferente intensidad,textura crujiente, exquisito y dulce con un punto ácido. Sin duda la mejor opción para ensaladas o degustar directamente.', 'Private/Modulos/misproductos/imagenes/2032543906Tomata_Raf_2015-12-29-1543.jpg', 'Verduras', '1', '', '1', '', '2020-05-17'),
(57, 25, '0001', 'Tomate Raf', 1, 1.75, '1000', 'Nuestro tomate RAF más distinguido, asurcado por naturaleza, de color verde oscuro de diferente intensidad, textura crujiente, exquisito y dulce con un punto ácido. Sin duda la mejor opción para ensaladas o degustar directamente.', 'Private/Modulos/misproductos/imagenes/1869893357Tomata_Raf_2015-12-29-1543.jpg', 'Verduras', '', '', '', '', '2020-05-17'),
(58, 26, '0001', 'Tomatoides', 0.25, 0.5, '1000', 'Rojo tomate ', 'Private/Modulos/misproductos/imagenes/13439243721371809248tomate-1024x680.jpg', 'Verduras', '', '', '', '', '2020-05-23'),
(59, 24, '0004', 'Fresas', 1.5, 1.75, '1.000', 'Fresas Frescas!!!!!', 'Private/Modulos/misproductos/imagenes/1576200119fresa.jpg', 'Frutos', '', '', '', '1', '2020-05-29'),
(60, 27, '0001', 'Manzana ', 1.55, 2, '1000', 'Manzanas para elaborar mermeladas o cualquier otro producto de cocina a base de esta exquisita fruta. Nos hemos animado a poner esta oferta bajo la demanda de varios consumidores de las colmenas. ¡Debemos avisar que las manzanas que van son manzanas de desecho que no incluimos en venta de producto fresco, nunca van pochas, pero si con golpes, heridas en la piel, etc! No se debe adquirir este producto pensando en fruta de consumo, con la calidad de la misma.', 'Private/Modulos/misproductos/imagenes/1356474443manzana.jpg', 'Frutos', '', '', '', '', '2020-05-30'),
(61, 24, '0005', 'Piña', 2, 3.5, '1005', 'Piña dulce y jugosa, para postres y zumos Peso aproximado 2 Kg/unidad', 'Private/Modulos/misproductos/imagenes/553465475pina.jpg', 'Frutos', '', '', '1', '', '2020-05-31'),
(62, 24, '0006', 'Frijoles Rojos', 1.1, 1.6, '1000', 'frijol', 'Private/Modulos/misproductos/imagenes/1263173796ff.jfif', 'Legumbres', '1', '', '1', '', '2020-06-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idproducto` int(8) NOT NULL,
  `usuariofk` int(8) NOT NULL,
  `nombreproducto` varchar(200) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` float NOT NULL,
  `tipoHortaliza` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idproducto`, `usuariofk`, `nombreproducto`, `imagen`, `descripcion`, `precio`, `tipoHortaliza`) VALUES
(1, 24, 'Lechuga', 'Private/Modulos/misproductos/imagenes/lechuga.jpg', 'Lechuga tipo iceberg costera produce cabezas atractivas y uniformes adecuadas para mercado fresco. Sure Shot proporciona a los productores una larga ventana de cosecha de primavera', 1.5, 'Verdura'),
(2, 25, 'NARANJAS ZUMO + AGUACATES - Navelina', '', 'Nuestras naranjas y aguacates se cultivan de forma respetuosa con el medio ambiente.\r\n\r\nSi desea una caja de naranjas no lo dudes, es el momento, pídela y en en este instante iremos a recolectarlas para usted, y se lo mandaremos el mismo día.\r\n\r\nNuestro aguacate HASS destaca por su gran calidad y auténtico sabor,esto es debido a que los recolectamos en el punto exacto de maduración,los más frescos del mercado,cultivados en Valencia.', 10, 'Frutas');

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
(24, 'Michael', 'Private/Modulos/usuarios/imagenesp/479267407FB_IMG_1589509010037.jpg', 'Cooperativa Lider', '72745936', 'cooperativa', 'cooperativalider@gmail.com', 'TheSlayer.60', '1', '2020-04-26', ''),
(25, 'Melissa Estefania', 'Private/Modulos/usuarios/imagenesp/364910472cyber2.jpg', 'Cooperativa mango', '72737475', 'cooperativa', 'cooperativamango@gmail.com', '12345678', '1', '2020-03-27', ''),
(26, 'Jimmy', 'Private/Modulos/usuarios/imagenesp/18076638751130709656wallpaper.jpg', 'cooperativa milos', '72737273', 'cooperativa', 'cooperativamilos@gmail.com', '123456', '1', '2020-04-28', ''),
(27, 'Cecilia Maria', 'Private/Modulos/usuarios/imagenesp/1091557139aaa.jpg', '', '76824693', 'Productor Pequeño', 'ceciliamaria@gmail.com', '12345678', '0', '2020-04-28', ''),
(28, 'Arely', '', 'Coopiref', '77745991', 'Cooperativa', 'coopiref@gmail.com', '12345678', '0', '2020-03-29', ''),
(35, 'Maria Contreras', '', 'Contreras US', '7274-5936', 'Cooperativa', 'contrerascopi@gmail.com', '12345678', '0', '2020-05-06', ''),
(58, 'scott', '', '', '73737377', 'Cliente', 'scottlovos503@gmail.com', 'Slayer.1', '1', '2020-06-09', '1693'),
(59, 'Cecy', '', '', '76814676', 'Cliente', 'Cecyrodriguez73@gmail. Com', 'Slayer.1', 'cero', '2020-06-10', '1792');

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
  MODIFY `idDireccion` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `informacionnosotros`
--
ALTER TABLE `informacionnosotros`
  MODIFY `infoUsuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `lista_deseos`
--
ALTER TABLE `lista_deseos`
  MODIFY `idlistadeseos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `misproducto`
--
ALTER TABLE `misproducto`
  MODIFY `miproducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idproducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos_oferta`
--
ALTER TABLE `productos_oferta`
  MODIFY `idoferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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

--
-- Filtros para la tabla `productos_oferta`
--
ALTER TABLE `productos_oferta`
  ADD CONSTRAINT `productos_oferta_ibfk_1` FOREIGN KEY (`fk_producto`) REFERENCES `misproducto` (`miproducto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
