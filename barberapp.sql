-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2025 a las 19:25:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `barberapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `tipo` enum('producto','servicio') NOT NULL,
  `itemId` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `categoria` varchar(50) DEFAULT NULL,
  `creadoEn` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `categoria`, `creadoEn`) VALUES
(1, 'Aceite Grave', 'Aceite especial para barba y cuero cabelludo', 22000.00, 0, 'cuidado personal', '2025-05-07 12:01:28'),
(2, 'Balsamo Grave', 'Bálsamo suavizante para barba', 24000.00, 0, 'cuidado personal', '2025-05-07 12:01:28'),
(3, 'Mimofoam', 'Espuma limpiadora facial y capilar', 42000.00, 0, 'limpieza', '2025-05-07 12:01:28'),
(4, 'Reelance Cejas', 'Producto para diseño y fijación de cejas', 25000.00, 0, 'cejas', '2025-05-07 12:01:28'),
(5, 'Reelance Capilar', 'Tratamiento capilar intensivo', 30000.00, 0, 'cabello', '2025-05-07 12:01:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `metodoPago` varchar(50) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `estado` enum('pendiente','confirmada','cancelada','en progreso','completada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva_servicio`
--

CREATE TABLE `reserva_servicio` (
  `id` int(11) NOT NULL,
  `reservaId` int(11) NOT NULL,
  `servicioId` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `etiqueta` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `descripcion`, `precio`, `imagen`, `etiqueta`) VALUES
(1, 'Corte básico', 'Se realiza un corte limpio y moderno siguiendo estilos actuales como el fade degradado, taper clásico, crop texturizado y undercut. Se ajusta al tipo de rostro y al volumen del cabello para lograr un acabado definido. El servicio incluye lavado, definición con máquina o tijera, y productos de fijación para mantener el peinado durante el día', 20000.00, NULL, 'corte'),
(2, 'Barba', 'El perfilado incluye recorte y definición de la barba con máquina o navaja, aplicando vapor con aceites esenciales para abrir poros y facilitar el trabajo. Se marca la línea de mejillas, cuello y bigote, y se finaliza con productos que hidratan y evitan la irritación. La barba queda alineada, recortada y simétrica.', 15000.00, NULL, 'barba'),
(3, 'Limpieza facial', 'El servicio limpia a fondo la piel con vapor ozonizado, exfoliación y extracción de impurezas. Se aplica una mascarilla hidratante y un masaje facial para relajar la zona. El proceso reduce puntos negros, grasa acumulada y brillo en la piel. Mejora el aspecto del rostro y lo deja con una textura más uniforme.', 25000.00, NULL, 'facial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `token` text NOT NULL,
  `refreshToken` text DEFAULT NULL,
  `creadoEn` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('cliente','empleado','admin') NOT NULL DEFAULT 'cliente',
  `fechaRegistro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol`, `fechaRegistro`) VALUES
(1, 'jose Pérez', 'juan.perez@email.com', '$2y$10$CyH9Jbh0BDCdrBh6dDRZ5OG8x/Txc9B7e6zofs0XiXkuxei/OWzdG', 'cliente', '2025-05-07 10:56:40'),
(2, 'Jhonatan Zuñiga', 'pzuñiga@example.com', '$2y$10$BoOqrHCLaiBOeC8Xz1ZLZ.O7jEkRCW2o7iRpWgIa8o1hZhEriBzzq', 'cliente', '2025-05-07 10:57:17'),
(3, 'usuario1', 'usuario1@example.com', '$2y$10$O1WZWnrE7ozGxHURiLiq7.AzyhV0fG7TSzY7Qxmg5nTUyHR3k01He', 'cliente', '2025-05-07 11:00:50'),
(5, 'usuario2', 'usuario2@example.com', '$2y$10$i4jJJ6Ikr3r5uAzyVXiRkOKl0G6ZgbDXQVDlUr6dmTVyeA4fhCTx6', 'cliente', '2025-05-07 11:14:58'),
(7, 'user1', 'user1@ej.com', '$2y$10$p.5l1j8ebi4Ku1/XTCt9n.8xYTGGw57UT/anAqFF9QB8b1C4nN8Sm', 'cliente', '2025-05-07 19:06:10'),
(9, 'user4', 'user4@gmail.com', '$2y$10$DFUgHfs1pkigFwZf9Rb/6.y5.gx0f/4eqEfM75OkIniearcC4MQpS', 'cliente', '2025-05-07 19:41:23'),
(10, 'user3', 'user3@ej.com', '$2y$10$zdRl.PlZ0Tq4LoDX.Lg0fOLaFItI0kEsIe0SD7EkbeM.EZC8p.baS', 'cliente', '2025-05-07 20:02:04'),
(12, 'juan', 'juan@ej.com', '$2y$10$WrqKFZFKRVrqwyMtKCmG5OORTqTValzLjMDqr2IS50H3wSzQGR8fK', 'cliente', '2025-05-08 11:35:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `reserva_servicio`
--
ALTER TABLE `reserva_servicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservaId` (`reservaId`),
  ADD KEY `servicioId` (`servicioId`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva_servicio`
--
ALTER TABLE `reserva_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reserva_servicio`
--
ALTER TABLE `reserva_servicio`
  ADD CONSTRAINT `reserva_servicio_ibfk_1` FOREIGN KEY (`reservaId`) REFERENCES `reservas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reserva_servicio_ibfk_2` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
