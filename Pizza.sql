CREATE TABLE `estados`
(
  `id` int PRIMARY KEY,
  `nombre` varchar(255) NOT NULL
);

CREATE TABLE `usuario_tipo`
(
  `id` int PRIMARY KEY,
  `nombre` varchar(255) NOT NULL,
  `estado_id` int
);

CREATE TABLE `usuarios`
(
  `id` int PRIMARY KEY,
  `usuario` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `tipo_id` int,
  `colaborador_id` int NOT NULL,
  `estado_id` int,
  `fecha_creacion` datetime COMMENT 'When order created'
);

CREATE TABLE `colaboradores`
(
  `id` int PRIMARY KEY,
  `dni` varchar(255) UNIQUE NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apaterno` varchar(255) NOT NULL,
  `amaterno` varchar(255) NOT NULL,
  `telefono` varchar(255),
  `correo` varchar(255),
  `estado_id` int NOT NULL,
  `fecha_creacion` datetime COMMENT 'When order created'
);

ALTER TABLE `usuario_tipo` ADD FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`tipo_id`) REFERENCES `usuario_tipo` (`id`);

ALTER TABLE `usuarios` ADD FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`);
